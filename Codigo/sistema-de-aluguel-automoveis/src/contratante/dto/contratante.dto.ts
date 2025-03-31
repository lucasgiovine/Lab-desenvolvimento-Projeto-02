import {
    IsNotEmpty,
    IsString
} from "class-validator";


export class ContratanteDto {

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsString()
    @IsNotEmpty()
    rg: string;

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    @IsString()
    profissao: string;

    @IsString()
    @IsNotEmpty()
    entidadeEmpregadora: string;


}