import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDTO } from './DTO/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Login } from './DTO/Login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userData: registerDTO) {
    const existingUser = await this.userService.findByEmail(userData.email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      role:newUser.role
    };

    const token = await this.jwtService.signAsync(payload);

    const { password, ...userWithoutPassword } = newUser;

    return {
      message: 'User created successfully',
      data: userWithoutPassword,
      access_token: token,
    };
  }

  async loginUser(userData: Login) {
    const user = await this.userService.findByEmail(userData.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password does not match');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role:user.role
    };

    const token = await this.jwtService.signAsync(payload);

    const { password, ...userWithoutPassword } = user;

    return {
      message: 'Login successfully',
      data: userWithoutPassword,
      access_token: token,
    };
  }


  async getalluser(){
    const user = await this.userService.allUser()
    return  {
      message: 'All user list ',
      data: user,
    };
  }



  async deletuser(email:string){
    const deletuser= await this.userService.DeletUser(email)
      return  {
      message: 'user deleted succesfully ',
     affected: deletuser.affected
    };
  }

}