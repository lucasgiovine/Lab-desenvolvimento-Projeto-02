import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class AutomovelDto {
    @IsNotEmpty()
    @IsString()
    matricula: string
    @IsNotEmpty()
    @IsString()
    marca: string
    @IsNotEmpty()
    @IsString()
    modelo: string
    @IsNumber()
    @IsNotEmpty()
    ano: number
    @IsNotEmpty()
    @IsString()
    placa: string
}