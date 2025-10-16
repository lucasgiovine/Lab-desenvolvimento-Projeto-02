import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService,
        private prisma: PrismaService,) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET')!,
        });
    }
//Atualmente o sistema gera apenas access_token. Avaliar adicionar refresh tokens para melhorar a segurança e permitir renovação sem exigir novo login.
    
//No JwtStrategy.validate(), se o usuário não for encontrado no banco, seria bom lançar um erro (UnauthorizedException) para evitar autenticação com token inválido.
    async validate(payload: {
        sub: number;
        email: string;
    }) {
        const user =
            await this.prisma.usuario.findUnique({
                where: {
                    id: payload.sub,
                },
            });
        return user;
    }
}