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
