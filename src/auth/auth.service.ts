import { Injectable } from '@nestjs/common';
import {
  AuthResponse,
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  CoreResponse,
  RegisterDto,
  ResetPasswordDto,
  VerifyForgetPasswordDto,
  SocialLoginDto,
  OtpLoginDto,
  OtpResponse,
  VerifyOtpDto,
  OtpDto,
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import usersJson from '@db/users.json';

import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'mysql2';
import * as bcrypt from 'bcrypt';
import { getUserByEmailQuery, getUserQuery, insertUserQuery } from './queries/authQuery';
import { JwtService } from '@nestjs/jwt';
const users = plainToClass(User, usersJson);

@Injectable()
export class AuthService {
  private users: User[] = users;


  constructor(
    @InjectConnection() private readonly connection: Connection,
    private jwtService: JwtService
  ) { }


  async register(createUserInput: RegisterDto): Promise<AuthResponse> {
    try {
      const salt = await bcrypt.genSalt();
const hashPassword = await bcrypt.hash(createUserInput.password, salt);
    createUserInput.password = hashPassword;

    let insertUserQueryString = insertUserQuery(createUserInput);
    let insertUserQueryResult: any = await this.connection.query(insertUserQueryString);
    let userId = insertUserQueryResult.insertId

    let getUserQueryString = getUserQuery(userId);
    let getUserQueryResult: any = await this.connection.query(getUserQueryString);
    delete getUserQueryResult[0].password;
 
    const payload = { username: getUserQueryResult[0].name, sub: getUserQueryResult[0].id};
    let token = this.jwtService.sign(payload)
    // console.log(token)
    // await this.connection.query("give me run time error");
    // const user: User = {
    //   id: uuidv4(),
    //   ...users[0],
    //   ...createUserInput,
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // };

    // this.users.push(user);
  
    return {
      token: token,
      permissions: ['super_admin', 'customer'],
    };
    } catch (error) {
      return {
        token: '',
        permissions: [],
      };
    }
   
  }
  async login(loginInput: LoginDto): Promise<AuthResponse> {
    let getUserQueryString = getUserByEmailQuery(loginInput.email);
    let getUserQueryResult: any = await this.connection.query(getUserQueryString);
    const isMatch = await bcrypt.compare(loginInput.password, getUserQueryResult[0].password);
    if(isMatch) {
      delete getUserQueryResult[0].password;
      const payload = { username: getUserQueryResult[0].name, sub: getUserQueryResult[0].id};
      let token = this.jwtService.sign(payload)
      return {
        token: 'jwt token',
        permissions: ['super_admin', 'customer'],
      };
    } 
    else {
      return {
        token: '',
        permissions: [],
      };

    }
   
 
  
   
   
  }
  async changePassword(
    changePasswordInput: ChangePasswordDto,
  ): Promise<CoreResponse> {
    console.log(changePasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async forgetPassword(
    forgetPasswordInput: ForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(forgetPasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(verifyForgetPasswordTokenInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async resetPassword(
    resetPasswordInput: ResetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(resetPasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse> {
    console.log(socialLoginDto);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }
  async otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
    console.log(otpLoginDto);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }
  async verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse> {
    console.log(verifyOtpInput);
    return {
      message: 'success',
      success: true,
    };
  }
  async sendOtpCode(otpInput: OtpDto): Promise<OtpResponse> {
    console.log(otpInput);
    return {
      message: 'success',
      success: true,
      id: '1',
      provider: 'google',
      phone_number: '+919494949494',
      is_contact_exist: true,
    };
  }

  // async getUsers({ text, first, page }: GetUsersArgs): Promise<UserPaginator> {
  //   const startIndex = (page - 1) * first;
  //   const endIndex = page * first;
  //   let data: User[] = this.users;
  //   if (text?.replace(/%/g, '')) {
  //     data = fuse.search(text)?.map(({ item }) => item);
  //   }
  //   const results = data.slice(startIndex, endIndex);
  //   return {
  //     data: results,
  //     paginatorInfo: paginate(data.length, page, first, results.length),
  //   };
  // }
  // public getUser(getUserArgs: GetUserArgs): User {
  //   return this.users.find((user) => user.id === getUserArgs.id);
  // }
  me(): User {
    return this.users[0];
  }

  // updateUser(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
