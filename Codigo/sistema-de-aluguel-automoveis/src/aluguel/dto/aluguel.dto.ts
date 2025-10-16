import { IsNotEmpty } from "class-validator";

export class AluguelDto {

/*
@IsDateString() seria mais adequado que @isnotempty() para as datas, garantindo formato válido ISO:

@IsDateString() dataInicio: string;

e converter no service depois
*/
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
