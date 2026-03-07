import { Injectable } from '@nestjs/common';
import { registerDTO } from 'src/auth/DTO/register.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
      message: "success",
      data: savedUser,
      acces_toekn:token
    }
  }
}