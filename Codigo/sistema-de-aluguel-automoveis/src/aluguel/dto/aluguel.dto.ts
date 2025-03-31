import { IsNotEmpty } from "class-validator";

export class AluguelDto {


    @IsNotEmpty()
    dataInicio: Date;

    @IsNotEmpty()
    dataFim: Date;

    @IsNotEmpty()
    numeroRegistro: string;

    @IsNotEmpty()
    automovelId: number;

    @IsNotEmpty()
    contratanteId: number;




}
