

const  randomXToY = (minVal,maxVal) =>
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}

export const insertUserQuery = (createUserInput) => {
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
     '${`[
     
    ]`}',

    '${timeNow}',
    '${timeNow}'
    )
    ;
      `
}

export const getCouponsQuery = () => {
  return `
  SELECT 
  *
  FROM 
  coupons 
  
      ;
        `
}



export const getCouponByCodeQuery = (code,user) => {
  return `
  SELECT 
  *
  FROM 
  coupons 
  WHERE (coupons.code = '${code}')
      ;
        `
}
export const getCouponByIdQuery = (coupon_id,user) => {
  return `
  SELECT 
  *
  FROM 
  coupons 
  WHERE (coupons.id = '${coupon_id}')
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



