import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AluguelService } from './aluguel.service';
import { AluguelDto } from './dto/aluguel.dto';

@Controller('aluguel')
export class AluguelController {
    constructor(private aluguelService: AluguelService) { }

/*
Os nomes das rotas (buscarAlugueis, cadastrarAluguel etc.) poderiam ser simplificados para seguir convenções RESTful. Isso melhora a legibilidade e integração com frontends e documentação automática (Swagger).
*/
    @Get('buscarAlugueis')
    async findAlugueis() {
        return await this.aluguelService.findAlugueis();
    }

    @Get('buscarAluguel/:id')
    async findAluguelById(@Param('id') id: number) {
        return await this.aluguelService.findAluguelById(id);
    }

    @Post('cadastrarAluguel')
    async createAluguel(@Body() dto: AluguelDto) {
        return await this.aluguelService.createAluguel(dto);
    }

    @Put('editarAluguel/:id')
    async updateAluguel(@Param('id') id: number, @Body() dto: AluguelDto) {
        return await this.aluguelService.updateAluguel(id, dto);
    }

    @Delete('excluirAluguel/:id')
    async deleteAluguel(@Param('id') id: number) {
        return await this.aluguelService.deleteAluguel(id);
    }

}
