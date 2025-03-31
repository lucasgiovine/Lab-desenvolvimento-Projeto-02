import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
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
