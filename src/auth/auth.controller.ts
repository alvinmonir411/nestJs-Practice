import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDTO } from './DTO/register.dto';
import { Login } from './DTO/Login.dto';
import { AuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './decorators/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { userRole } from 'src/user/user.entity';



@Controller('auth')
export class AuthController {

constructor(private authService : AuthService){}
    
@Post("register")
  register(@Body() userData:registerDTO){
     return this.authService.createUser(userData)
}

@Get("login")
  signIn(@Body() userData:Login){
    return this.authService.loginUser(userData)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile() {
    return "This is protected route";
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(userRole.admin)
  @Get('profiles')
  profiles() {
    return "This is protected route for only admin";
  }


@UseGuards(AuthGuard,RolesGuard)
@Roles(userRole.admin)
@Delete("deletuser")
deletuser(@Body('email') body: string){
  console.log(body)
return this.authService.deletuser(body)
}

@UseGuards(AuthGuard)
@Get('alluser')
  alluser(){
return this.authService.getalluser()
  }
}

