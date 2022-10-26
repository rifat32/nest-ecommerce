import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Fuse from 'fuse.js';

import { User } from './entities/user.entity';
import usersJson from '@db/users.json';
import { paginate } from 'src/common/pagination/paginate';
import { getUserByIdQuery, updateUserByIdQuery } from './queries/userQuery';
import { getSingleUser } from './data-mapper';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'mysql2';


const users = plainToClass(User, usersJson);

const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status'],
  threshold: 0.3,
};
const fuse = new Fuse(users, options);

@Injectable()
export class UsersService {
  private users: User[] = users;


  constructor(
    @InjectConnection() private readonly connection: Connection
  ) { }


  create(createUserDto: CreateUserDto) {
    return this.users[0];
  }

  async getUsers({
    text,
    limit,
    page,
    search,
  }: GetUsersDto): Promise<UserPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: User[] = this.users;
    if (text?.replace(/%/g, '')) {
      data = fuse.search(text)?.map(({ item }) => item);
    }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/users?limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

 async update(id: number, updateUserDto: UpdateUserDto,req) {
  let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("updateUserDto",updateUserDto)
    let getUserQueryString = getUserByIdQuery(req.user.userId);
    let getUserQueryResult: any = await this.connection.query(getUserQueryString);
    // delete getUserQueryResult[0].password;
    const updateUserInfo = [

    ]
    // update address
  const address = JSON.parse(getUserQueryResult[0].address)
  if(updateUserDto.address.length) {
    updateUserDto.address.map((el:any)=> {
      address.map((dbEl,dbIndex) => {
        if(!el.id){
          el.id = address[address.length - 1].id + 1
          address.push(el)
        }
        if(el.id == dbEl.id) {
          address[dbIndex] = {...address[dbIndex],title:el.title,address:el.address,updated_at:timeNow}
        
        }
      })
  
    })
    updateUserInfo.push({
      name:'address',
      value:JSON.stringify(address)
    })
    // console.log(address)

  }

// end of update address
let updateUserQueryString = updateUserByIdQuery(req.user.userId,updateUserInfo);
let updateUserQueryResult: any = await this.connection.query(updateUserQueryString);

    // return getSingleUser(getUserQueryResult[0]);
    return this.users[0];
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  makeAdmin(user_id: string) {
    return this.users.find((u) => u.id === Number(user_id));
  }

  banUser(id: number) {
    const user = this.users.find((u) => u.id === Number(id));

    user.is_active = !user.is_active;

    return user;
  }

  activeUser(id: number) {
    const user = this.users.find((u) => u.id === Number(id));

    user.is_active = !user.is_active;

    return user;
  }
}
