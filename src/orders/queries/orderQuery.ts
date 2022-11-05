import { ConnectProductOrderPivot, CreateOrderDto } from "../dto/create-order.dto"

const  randomXToY = (minVal,maxVal) =>
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}
export const insertOrderQuery = (createOrderInput:CreateOrderDto,user,couponData) => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let userId = 1;
    if(user) {
      userId = user.userId
    }

    let coupon_discount = 0.0;

    
    if(couponData){
    const {coupon} = couponData
      console.log("coupon.type",coupon.type)
      if(coupon.type == "fixed") {
        coupon_discount += coupon.amount;
        console.log("coupon.amount",coupon.amount)
        console.log("coupon_discount",coupon_discount)
      }
      else if (coupon.type == "percentage") {
        coupon_discount += (createOrderInput.amount / 100) * coupon.amount
      }

    }
    


    console.log("coupon_discount............",coupon_discount)






    return `
    INSERT INTO orders 
    (user_id,
    shipping_address,
    delivery_status,
    payment_type,
    payment_status,
    shipping,
    area_shipping,
    discount_amount,
    grand_total,
    coupon_discount,
    coupon_id,
    code,
    date,
    viewed,
    delivery_viewed,
    payment_status_viewed,
    commission_calculated,
    created_at,
    updated_at
      ) 
    
    VALUES
     (
      ${userId},
      '${`{"id":0,"user_id":1,"address":"${createOrderInput.shipping_address.street_address}","country":"${createOrderInput.shipping_address.country}","city":"${createOrderInput.shipping_address.city}","longitude":null,"latitude":null,"postal_code":"${createOrderInput.shipping_address.zip}","phone":"${createOrderInput.customer_contact}","alternative_phone_number":"${createOrderInput.customer_contact}","set_default":0,"created_at":"${timeNow}","updated_at":"${timeNow}","name":"","email":"","billing_address":{"street_address": "${createOrderInput.billing_address.street_address}","country":"${createOrderInput.billing_address.country}","city":"${createOrderInput.billing_address.city}","state":"${createOrderInput.billing_address.state}","zip":"${createOrderInput.billing_address.zip}"}}`}',
    'pending'
    ,
    'cash_on_delivery'
    ,
    'unpaid',
    0,
    0,
    0,
    ${createOrderInput.amount},
    ${coupon_discount},
    ${createOrderInput.coupon_id},
    ${randomXToY(111111, 999999)},
    1648981255,
    0,
    0,
    0,
    0,
    '${timeNow}',
    '${timeNow}'
    )
    ;
      `
}
export const insertOrderDetailsQuery = (createOrderInput:CreateOrderDto,orderId:number,product:ConnectProductOrderPivot) => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return `
    INSERT INTO order_details 
    (
    order_id,
    product_id,
    variation_id,
    price,
    tax,
    shipping_cost,
    quantity,
    payment_status,
    delivery_status,
    shipping_type,
    created_at,
    updated_at
      ) 
    
    VALUES
     (
    ${orderId},
    ${product.product_id},
    ${product.product_id},
    ${product.unit_price},
    0,
    0,
    ${product.order_quantity},
    'unpaid',
    'pending',
    'home_delivery',
    '${timeNow}',
    '${timeNow}'
    )
    ;
      `
}


export const getOrderQuery = (orderId:number) => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return `
SELECT 
orders.code,
orders.shipping_address

FROM 
orders 
WHERE (orders.id = ${orderId})
    ;
      `
}
export const getOrderByCodeQuery = (orderCode:string) => {
    
    return `
SELECT 
*

FROM 
orders 
WHERE (orders.code = '${orderCode}')
    ;
      `
}
export const getOrderDetailsQuery = (orderId:string) => {
    
  return `
SELECT 
products.name as product_name,
variations.id as vid,
products.product_description as product_description,
products.image as product_image,
products.created_at as product_created_at,
products.updated_at as product_updated_at,
products.deleted_at as product_deleted_at,
order_details.price as order_price,
order_details.created_at as order_created_at,
order_details.updated_at as order_updated_at,
order_details.quantity as order_quantity,
order_details.order_id
FROM 
order_details 
left join 
variations 
on 
order_details.variation_id = variations.id
left join 
products 
on 
variations.product_id = products.id
left join 
variation_location_details 
on
variations.id = variation_location_details.variation_id
WHERE (order_details.order_id = '${orderId}')
  ;
    `;

}

export const getOrdersByUserIdQuery = (user) => {

  return `
  SELECT 
  *
  FROM 
  orders 
  WHERE (orders.user_id = '${user.userId}')
      ;
        `
}