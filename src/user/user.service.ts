import { Injectable, UnauthorizedException } from '@nestjs/common';
import { registerDTO } from 'src/auth/DTO/register.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/auth/DTO/Login.dto';
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async creatUser(userData: registerDTO,token:string) {

    const user = this.userRepo.create(userData);
    const savedUser = await this.userRepo.save(user);

    return {
      message: "User Created Succesfully",
      data: savedUser,
      acces_toekn:token
    }
  }

async loginUser(data:Login){

const result = await this.userRepo.findOne(
  {
    where:{
      email:data.email
    }
  }
)
 if (!result) {
    throw new UnauthorizedException("User not found");
  }
 const match = await bcrypt.compare(data.password, result.password);

    if(match) {
        //login
    }





console.log(result)

return{
  massage:"Login Succesfully",
  data:result
}
  }

  
}