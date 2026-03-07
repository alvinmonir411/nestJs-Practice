import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDTO } from './DTO/register.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Login } from './DTO/Login.dto';

@Injectable()
export class AuthService {

constructor(
    private readonly userservice: UserService,
    private readonly jwtService: JwtService
){}

async creatuser(userData: registerDTO){

    // hash password
    const hashedPassword = await bcrypt.hash(userData.password,10)

    // jwt payload
    const payload = {
        email: userData.email
    }

    // generate token
    const token = await this.jwtService.signAsync(payload)

    const user = {
        ...userData,
        password: hashedPassword
    }

    return await this.userservice.creatUser(user,token)

}

async loginuser(userdata:Login){
 // jwt payload
    const payload = {
        email: userdata.email
    }
   // generate token
    const token = await this.jwtService.signAsync(payload)

    const user = {
        ...userdata,
        token
    }
    return this.userservice.loginUser(user)
}
 

}