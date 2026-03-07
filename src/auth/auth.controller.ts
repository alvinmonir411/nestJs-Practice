import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDTO } from './DTO/register.dto';


@Controller('auth')
export class AuthController {

constructor(private authService : AuthService){}
    
@Post("register")
  register(@Body() userData:registerDTO){
     return this.authService.creatuser(userData)
}




}

