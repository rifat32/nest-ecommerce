import { RegisterDto } from "../dto/create-auth.dto";

const  randomXToY = (minVal,maxVal) =>
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}

export const insertUserQuery = (createUserInput: RegisterDto) => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return `
    INSERT INTO users2 
    (
    user_type,
    name,
    email,
    password,
    balance,
    banned,
    remaining_uploads,
    address,
    phone,
    created_at,
    updated_at
      ) 
    
    VALUES
     (
     'customer',
     '${createUserInput.name}',
     '${createUserInput.email}',
     '${createUserInput.password}',
     0.0,
     0,
     0,
     '${`[]`}',
     '${createUserInput.phone}',
    '${timeNow}',
    '${timeNow}'
    )
    ;
      `
}
export const getUserByIdQuery = (userId) => {
  return `
  SELECT 
  *
  
  FROM 
  users2 
  WHERE (users2.id = '${userId}')
      ;
        `
}
export const getUserByEmailQuery = (userEmail) => {
  return `
  SELECT 
  *
  
  FROM 
  users2 
  WHERE (users2.email = '${userEmail}')
      ;
        `
}
export const getUserByPhoneQuery = (userPhone) => {
  return `
  SELECT 
  *
  
  FROM 
  users2 
  WHERE (users2.phone = '${userPhone}')
      ;
        `
}
export const getUserByPhoneAndTokenQuery = (userPhone,token) => {
  return `
  SELECT 
  *
  
  FROM 
  users2 
  WHERE (users2.phone = '${userPhone}' AND users2.password_reset_token = '${token}')
      ;
        `
}

export const updateUserByIdQuery = (userId,updateUserInfo) => {
  let setInfo = ``;
  updateUserInfo.map(el => {
    setInfo += `${el.name} = '${el.value}'`
  })

  return `
  UPDATE 
  users2
  SET ${setInfo}
  WHERE (users2.id = '${userId}')
      ;
        `
}

