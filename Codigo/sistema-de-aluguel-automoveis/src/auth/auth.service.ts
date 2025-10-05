import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    /*O método register() retorna diretamente o objeto do Prisma. Idealmente, o retorno deveria ser um DTO ou omitir campos sensíveis (senha) antes de retornar.
    Exemplo:
    const { senha, ...rest } = usuario; return rest;
    */
    async register(dto: AuthDto) {
        const hash = await argon.hash(dto.senha);
        try {

            return await this.prisma.usuario.create({
                data: {
                    email: dto.email,
                    senha: hash,
                    categoria: dto.categoria
                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    /*
                    As mensagens de erro invalid credentials e credentials taken poderiam ser mais claras e padronizadas. Ex: "E-mail ou senha inválidos" e "Usuário já cadastrado". Isso melhora a experiência da API.
                    */
                    throw new ForbiddenException('credentials taken');
                }
            }
            throw error;
        }

    }



    async login(dto: AuthDto) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!usuario) {
            throw new ForbiddenException('invalid credentials');
        }
        //O método argon.verify() retorna uma Promise. Está faltando o await antes da chamada em login().Sem ele, match será uma Promise e a verificação sempre passará como verdadeira.
        const match = argon.verify(usuario.senha, dto.senha);
        if (!match) {
            throw new ForbiddenException('invalid credentials');
        }
        return this.signToken(usuario.id, usuario.email);
    }


    async signToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        };

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        });

        return {
            access_token: token,
        };
    }



}
