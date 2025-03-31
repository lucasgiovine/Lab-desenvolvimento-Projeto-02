import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AutomovelService } from './automovel.service';
import { AutomovelDto } from './dto/automovel.dto';

@Controller('automovel')
export class AutomovelController {
    constructor(private automovelService: AutomovelService) { }


    @Get('buscarAutomoveisESeusAlugueis')
    async findAutomoveisComAlugueis() {
        return await this.automovelService.findAutomoveisComAluguel();
    }

    @Get('buscarAutomoveisSemAlugueis')
    async findAutomoveis() {
        return await this.automovelService.findAutomoveis();
    }

    @Get('buscarAutomovelComAluguel/:id')
    async findAutomovelByIdComAluguel(@Param('id') id: number) {
        return await this.automovelService.findAutomovelByIdComAluguel(id);
    }

    @Get('buscarAutomovelSemAluguel/:id')
    async findAutomovelById(@Param('id') id: number) {
        return await this.automovelService.findAutomovelById(id);
    }

    @Post('cadastrarAutomovel')
    async createAutomovel(@Body() dto: AutomovelDto) {
        return await this.automovelService.createAutomovel(dto);
    }

    @Put('editarAutomovel/:id')
    async updateAutomovel(@Param('id') id: number, @Body() dto: AutomovelDto) {
        return await this.automovelService.updateAutomovel(id, dto);
    }

    @Delete('excluirAutomovel/:id')
    async deleteAutomovel(@Param('id') id: number) {
        return await this.automovelService.deleteAutomovel(id);
    }

}
