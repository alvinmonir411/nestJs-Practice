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
  ) { }

  async createUser(userData: registerDTO) {
    const user = this.userRepo.create(userData);
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
    });
  }


  async allUser() {
    return await this.userRepo.find()
  }


  async DeletUser(email: string) {
    return await this.userRepo.delete({ email })
  }
}