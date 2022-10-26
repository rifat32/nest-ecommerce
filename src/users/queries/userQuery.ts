

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
      {
        "id": 1,
        "title": "Billing",
        "type": "billing",
        "default": 0,
        "address": {
          "zip": "99614",
          "city": "Dhaka",
          "state": "Dhaka",
          "country": "Bangladesh",
          "street_address": "Dhanmondi"
        },
        "customer_id": 2,
        "created_at":  "${timeNow}",
        "updated_at":  "${timeNow}"
      },
      {
        "id": 2,
        "title": "Shipping",
        "type": "shipping",
        "default": 0,
        "address": {
            "zip": "99614",
            "city": "Dhaka",
            "state": "Dhaka",
            "country": "Bangladesh",
            "street_address": "Dhanmondi"
          },
        "customer_id": 2,
        "created_at":  "${timeNow}",
        "updated_at":  "${timeNow}"
      }
    ]`}',

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



