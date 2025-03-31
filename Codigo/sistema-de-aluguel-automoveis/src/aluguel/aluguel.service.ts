import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AluguelDto } from './dto/aluguel.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AluguelService {
    constructor(private prisma: PrismaService) { }



    async findAlugueis() {
        return await this.prisma.aluguel.findMany({
            include: {
                automovel: true,
                contratante: true,
            },
        });
    }

    async findAluguelById(id: number) {
        try {

            return await this.prisma.aluguel.findUnique({
                where: { id },
                include: {
                    automovel: true,
                    contratante: true,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Aluguel não encontrado');
                }
            }
            throw error;
        }
    }

    async createAluguel(dto: AluguelDto) {

        try {


            return await this.prisma.aluguel.create({
                data: {
                    numeroRegistro: dto.numeroRegistro,
                    dataInicio: new Date(dto.dataInicio),
                    dataFim: new Date(dto.dataFim),
                    automovelId: dto.automovelId,
                    contratanteId: dto.contratanteId,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new NotFoundException('Aluguel com esse registro já existe');
                }
            }
            throw error;
        }

    }


    async updateAluguel(id: number, dto: AluguelDto) {
        try {
            return await this.prisma.aluguel.update({
                where: { id },
                data: {
                    dataInicio: dto.dataInicio,
                    dataFim: dto.dataFim,
                    automovelId: dto.automovelId,
                    contratanteId: dto.contratanteId,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Aluguel não encontrado');
                }
            }
            throw error;
        }
    }

    async deleteAluguel(id: number) {
        try {
            return await this.prisma.aluguel.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Aluguel não encontrado');
                }
            }
            throw error;
        }
    }

}
