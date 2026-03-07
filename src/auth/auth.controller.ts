import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDTO } from './DTO/register.dto';
import { Login } from './DTO/Login.dto';


@Controller('auth')
export class AuthController {

constructor(private authService : AuthService){}
    
@Post("register")
  register(@Body() userData:registerDTO){
     return this.authService.creatuser(userData)
}

@Get("login")
  signIn(@Body() userData:Login){
    return this.authService.loginuser(userData)
  }
}

