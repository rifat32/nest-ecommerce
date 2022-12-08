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
  RegisterResponse,
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import usersJson from '@db/users.json';

import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'mysql2';
import * as bcrypt from 'bcrypt';
import { getUserByEmailQuery, getUserByIdQuery, getUserByPhoneAndTokenQuery, getUserByPhoneQuery, insertUserQuery, updateUserByIdQuery } from './queries/authQuery';
import { JwtService } from '@nestjs/jwt';
import { getSingleUser } from './data-mapper';
import axios from 'axios';

const users = plainToClass(User, usersJson);

@Injectable()
export class AuthService {
  private users: User[] = users;


  constructor(
    @InjectConnection() private readonly connection: Connection,
    private jwtService: JwtService,
  
  ) { }


  async register(createUserInput: RegisterDto): Promise<RegisterResponse> {
    try {

      let getUserExistQueryString = getUserByEmailQuery(createUserInput.email);    
      let getUserExistQueryResult: any = await this.connection.query(getUserExistQueryString);
 
      if(getUserExistQueryResult[0]?.email) {
        return {
          token: "",
          message:"email already taken",
          permissions: ['super_admin', 'customer'],
        };
      }
      let getUserExistQueryByPhoneString = getUserByPhoneQuery(createUserInput.phone);    
      let getUserExistQueryByPhoneResult: any = await this.connection.query(getUserExistQueryByPhoneString);
 
      if(getUserExistQueryByPhoneResult[0]?.email) {
        return {
          token: "",
          message:"phone number already taken",
          permissions: ['super_admin', 'customer'],
        };
      }




      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(createUserInput.password, salt);
     createUserInput.password = hashPassword;

    let insertUserQueryString = insertUserQuery(createUserInput);
    let insertUserQueryResult: any = await this.connection.query(insertUserQueryString);
    let userId = insertUserQueryResult.insertId

    let getUserQueryString = getUserByIdQuery(userId);
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
      message:"Registration Successfull."
    };
    } catch (error) {
      console.log('error.......',error)
      return {
        token: '',
        permissions: [],
        message:"Something went wrong!"
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
        token: token,
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
    function randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
   
 
    let getUserExistQueryString = getUserByPhoneQuery(forgetPasswordInput.email);    
    let getUserExistQueryResult: any = await this.connection.query(getUserExistQueryString);

    if(!getUserExistQueryResult[0]?.email) {
      return {
        success: false,
        message: 'No User Found with this phone number',
      }; 
    }
 

let token = randomIntFromInterval(11111, 99999);
const updateUserInfo = [
  {
  name:"password_reset_token",
  value:token
  }
      ]
let updateUserQueryString = updateUserByIdQuery(getUserExistQueryResult[0].id,updateUserInfo);
let updateUserQueryResult: any = await this.connection.query(updateUserQueryString);


axios.post('https://bulksmsbd.net/api/smsapi',{
  "api_key" : "eRsuWT0e7ZTqBXsdCElB",
  "senderid" : "8809617642621",
  "number" : getUserExistQueryResult[0].phone,
  "message" : `Use this code to change your password..${token}. this is your email ${getUserExistQueryResult[0].email}`
})
.then(response => {

})
return {
  success: true,
  message: 'Message has sent',
}; 

    // const url = `example.com/auth/confirm?token=${token}`;

    // await this.mailerService.sendMail({
    //   to: forgetPasswordInput.email,
    //   // from: '"Support Team" <support@example.com>', // override default from
    //   subject: 'Welcome to Nice App! Confirm your Email',
    //   template: './confirmation', // `.hbs` extension is appended automatically
    //   context: { // ✏️ filling curly brackets with content
    //     name: "",
    //     url,
    //   },
    // });
  






    
  }
  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(verifyForgetPasswordTokenInput);
    let getUserExistQueryString = getUserByPhoneAndTokenQuery(verifyForgetPasswordTokenInput.email,verifyForgetPasswordTokenInput.token);    
    let getUserExistQueryResult: any = await this.connection.query(getUserExistQueryString);

    if(!getUserExistQueryResult[0]?.email) {
      return {
        success: false,
        message: 'Invalid Token',
      }; 
    }
 
    return {
      success: true,
      message: 'Change your password',
    };
  }
  async resetPassword(
    resetPasswordInput: ResetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(resetPasswordInput);
    let getUserExistQueryString = getUserByPhoneAndTokenQuery(resetPasswordInput.email,resetPasswordInput.token);    
    let getUserExistQueryResult: any = await this.connection.query(getUserExistQueryString);

    if(!getUserExistQueryResult[0]?.email) {
      return {
        success: false,
        message: 'Invalid Token Go Back',
      }; 
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(resetPasswordInput.password, salt);
    resetPasswordInput.password = hashPassword;
    const updateUserInfo = [
      {
      name:"password",
      value:hashPassword
      }
          ]
    let updateUserQueryString = updateUserByIdQuery(getUserExistQueryResult[0].id,updateUserInfo);
    let updateUserQueryResult: any = await this.connection.query(updateUserQueryString);

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
 async me(req) {
    let getUserQueryString = getUserByIdQuery(req.user.userId);
    let getUserQueryResult: any = await this.connection.query(getUserQueryString);
    delete getUserQueryResult[0].password;
console.log("get user...", getUserQueryResult[0])
    return getSingleUser(getUserQueryResult[0]);
  }

  // updateUser(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
