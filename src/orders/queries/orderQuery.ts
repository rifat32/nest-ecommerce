import { ConnectProductOrderPivot, CreateOrderDto } from "../dto/create-order.dto"

const  randomXToY = (minVal,maxVal) =>
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}
export const insertOrderQuery = (createOrderInput:CreateOrderDto) => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
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
      1,
      '${`{"id":0,"user_id":1,"address":"${createOrderInput.shipping_address.street_address}","country":"${createOrderInput.shipping_address.country}","city":"${createOrderInput.shipping_address.city}","longitude":null,"latitude":null,"postal_code":"${createOrderInput.shipping_address.zip}","phone":"${createOrderInput.customer_contact}","alternative_phone_number":"${createOrderInput.customer_contact}","set_default":0,"created_at":"${timeNow}","updated_at":"${timeNow}","name":"Test Name","email":"test@gmail.com","billing_address":{"street_address": "${createOrderInput.billing_address.street_address}","country":"${createOrderInput.billing_address.country}","city":"${createOrderInput.billing_address.city}","state":"${createOrderInput.billing_address.state}","zip":"${createOrderInput.billing_address.zip}"}}`}',
    'pending'
    ,
    'cash_on_delivery'
    ,
    'unpaid',
    0,
    0,
    0,
    ${createOrderInput.amount},
    0,
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
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return `
SELECT 
*

FROM 
orders 
WHERE (orders.code = '${orderCode}')
    ;
      `
}