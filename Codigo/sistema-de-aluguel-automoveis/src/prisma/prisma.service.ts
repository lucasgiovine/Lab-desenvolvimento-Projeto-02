import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {


//O PrismaService está correto, mas poderia implementar onModuleInit e onModuleDestroy para gerenciar o ciclo de vida da conexão com o banco (boas práticas no NestJS).

    constructor(config: ConfigService) {
        super({

            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        })
    }
}
