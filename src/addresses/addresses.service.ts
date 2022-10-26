import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'mysql2';
import { getUserByIdQuery, updateUserByIdQuery } from 'src/users/queries/userQuery';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {

  constructor(
    @InjectConnection() private readonly connection: Connection
  ) { }



  create(createAddressDto: CreateAddressDto) {
    return 'This action adds a new address';
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

 async remove(id: number,req) {
    let getUserQueryString = getUserByIdQuery(req.user.userId);
    let getUserQueryResult: any = await this.connection.query(getUserQueryString);
    const updateUserInfo = [

    ]
    // update address
  const address = JSON.parse(getUserQueryResult[0].address)
  const finalAddress = [];
  
      address.map((dbEl,dbIndex) => {
        if(id != dbEl.id){
          finalAddress.push(dbEl)
        }
      
      })
  
    
    updateUserInfo.push({
      name:'address',
      value:JSON.stringify(finalAddress)
    })
    // console.log(address)

  

// end of update address
let updateUserQueryString = updateUserByIdQuery(req.user.userId,updateUserInfo);
let updateUserQueryResult: any = await this.connection.query(updateUserQueryString);


    return [];
  }
}
