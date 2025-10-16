import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')

/*
Os métodos registerProfessor e loginProfessor poderiam ser renomeados para register e login, já que o endpoint é genérico (/auth). Isso evita confusão e melhora a semântica.
*/
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('register')
    registerProfessor(@Body() dto: AuthDto) {
        return this.authService.register(dto);
    }


    @Post('login')
    loginProfessor(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }

}
