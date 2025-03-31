import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContratanteDto } from './dto/contratante.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ContratanteService {


    constructor(private prisma: PrismaService) { }

    async findContratantesComAlugueis() {
        return await this.prisma.contratante.findMany({
            include: {
                alugueis: true
            },
        });
    }

    async findContratantes() {
        return await this.prisma.contratante.findMany({
            include: {
                alugueis: false
            },
        });
    }

    async findContratanteByIdComAluguel(id: number) {
        try {

            return await this.prisma.contratante.findUnique({
                where: { id },
                include: {
                    alugueis: true
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Contratante não encontrado');
                }
            }
            throw error;
        }
    }


    async findContratanteByIdSemAluguel(id: number) {
        try {

            return await this.prisma.contratante.findUnique({
                where: { id },
                include: {
                    alugueis: false
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Contratante não encontrado');
                }
            }
            throw error;
        }
    }


    async createContratante(dto: ContratanteDto) {
        try {

            return await this.prisma.contratante.create({
                data: {
                    name: dto.nome,
                    rg: dto.rg,
                    cpf: dto.cpf,
                    profissao: dto.profissao,
                    entidadeEmpregadora: dto.entidadeEmpregadora,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Contratante já cadastrado');
                }
            }
            throw error;
        }
    }

    async updateContratante(id: number, dto: ContratanteDto) {
        try {

            return await this.prisma.contratante.update({
                where: { id },
                data: {
                    name: dto.nome,
                    rg: dto.rg,
                    cpf: dto.cpf,
                    profissao: dto.profissao,
                    entidadeEmpregadora: dto.entidadeEmpregadora,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Contratante não encontrado');
                }
            }
            throw error;
        }
    }

    async deleteContratante(id: number) {
        try {
            return await this.prisma.contratante.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Contratante não encontrado');
                }
            }
            throw error;
        }
    }

}
