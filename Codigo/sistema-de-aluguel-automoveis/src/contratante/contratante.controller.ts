import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ContratanteService } from './contratante.service';
import { get } from 'http';
import { ContratanteDto } from './dto/contratante.dto';


/*
Observação de tratamento de erros: recomendo criar um middleware centralizado de erros (src/middlewares/errorHandler.ts) e garantir que todas as rotas usem next(err) ou lancem exceções tratáveis. Isso evita duplicação de try/catch nos controllers e uniformiza respostas de erro.
*/

@Controller('contratante')
export class ContratanteController {
    constructor(private contratanteService: ContratanteService) { }

    @Get('buscarContratantesESeusAlugueis')
    async findContratantesComAlugueis() {
        return await this.contratanteService.findContratantesComAlugueis();
    }

    @Get('buscarContratantesSemAlugueis')
    async findContratantes() {
        return await this.contratanteService.findContratantes();
    }

    @Get('buscarContratanteESeusAlugueis/:id')
    async findContratanteByIdComAluguel(@Param('id') id: number) {
        return await this.contratanteService.findContratanteByIdComAluguel(id);
    }


    @Get('buscarContratanteSemAluguel/:id')
    async findContratanteByIdSemAluguel(@Param('id') id: number) {
        return await this.contratanteService.findContratanteByIdSemAluguel(id);
    }

    @Post('cadastrarContratante')
    async createContratante(@Body() dto: ContratanteDto) {
        return await this.contratanteService.createContratante(dto);
    }

    @Put('editarContratante/:id')
    async updateContratante(@Param('id') id: number, @Body() dto: ContratanteDto) {
        return await this.contratanteService.updateContratante(id, dto);
    }

    @Delete('excluirContratante/:id')
    async deleteContratante(@Param('id') id: number) {
        return await this.contratanteService.deleteContratante(id);
    }



}
