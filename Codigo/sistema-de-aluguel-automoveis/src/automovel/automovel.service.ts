import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AutomovelDto } from './dto/automovel.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
//falta testes unitarios
export class AutomovelService {
    constructor(private prisma: PrismaService) { }
/*
Sugestão arquitetural: percebo que este controller contém acesso direto ao banco e regras de negócio. Para melhorar manutenção e testabilidade, recomendo separar em 3 camadas: Controller (receptáculo de HTTP), Service (regras de negócio) e Repository/DAO (acesso a dados).
*/

    async findAutomoveisComAluguel() {
        return await this.prisma.automovel.findMany({
            include: {
                alugueis: true
            },
        });
    }

    async findAutomoveis() {
        return await this.prisma.automovel.findMany({
            include: {
                alugueis: false
            },
        });
    }


    async findAutomovelByIdComAluguel(id: number) {
        return await this.prisma.automovel.findUnique({
            where: { id },
            include: {
                alugueis: true
            },
        });
    }

    async findAutomovelById(id: number) {
        return await this.prisma.automovel.findUnique({
            where: { id },
            include: {
                alugueis: false
            },
        });
    }

    async createAutomovel(dto: AutomovelDto) {
        try {

            return await this.prisma.automovel.create({
                data: {
                    matricula: dto.matricula,
                    marca: dto.marca,
                    modelo: dto.modelo,
                    ano: dto.ano,
                    placa: dto.placa
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Automóvel com essa placa ou matricula já cadastrado');
                }
            }
            throw error;
        }

    }

    async updateAutomovel(id: number, dto: AutomovelDto) {
        try {
            return await this.prisma.automovel.update({
                where: { id },
                data: {
                    marca: dto.marca,
                    modelo: dto.modelo,
                    ano: dto.ano,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Automóvel não encontrado');
                }
            }

            throw error;
        }
    }

    async deleteAutomovel(id: number) {
        try {
            return await this.prisma.automovel.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Automóvel não encontrado');
                }
            }
            throw error;
        }
    }

}
