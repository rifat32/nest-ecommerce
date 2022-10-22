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



