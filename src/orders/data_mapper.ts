import { plainToClass } from "class-transformer";
import { backend } from "src/backend";

class Shipping   {
    phone: string;
   
  }

  const getProducts = (products) => {


    
  const tempProducts = [];
  products.map(el => {
    tempProducts.push(
      {
        "id": el.vid,
        "name": el.product_name,
        "slug": `${el.vid}`,
        "description": el.product_description,
        "type_id": 8,
        "price": 180,
        "shop_id": 7,
        "sale_price": 150,
        "min_price": 180,
        "max_price": 180,
        "sku": "4g6g4d54fd6g54gd+++",
        "quantity": 500,
        "in_stock": 1,
        "is_taxable": 0,
        "shipping_class_id": null,
        "status": "publish",
        "product_type": "simple",
        "unit": "1 pc",
        "height": null,
        "width": null,
        "length": null,
        "image": {
          "id": 1636,
          "original": `${backend}/storage/img/${el.product_image}`,
          "thumbnail": `${backend}/storage/img/${el.product_image}`
        },
        "video": null,
        "gallery": [],
        "deleted_at": el.product_deleted_at,
        "created_at": el.product_created_at,
        "updated_at": el.product_updated_at,
        "language": "en",
        "translated_languages": [
          "en"
        ],
        "author_id": 11,
        "manufacturer_id": 4,
        "is_digital": 1,
        "is_external": 0,
        "external_product_url": null,
        "external_product_button_text": null,
        "pivot": {
          "order_id": el.order_id,
          "product_id": el.vid,
          "order_quantity": el.order_quantity * 1,
          "unit_price": el.order_price * 1,
          "subtotal": (el.order_price * 1) * (el.order_quantity * 1),
          "variation_option_id": null,
          "created_at": el.order_created_at,
          "updated_at": el.order_updated_at
        },
        "variation_options": []
      }
    )
  })
  return tempProducts;



  }

  export const getSingleOrderDetails = (orderPos,orderPosDetails,orderStatus) => {
    let shipping_address = JSON.parse(orderPos.shipping_address)
    console.log(orderPos.code)
    return  {
        "id": orderPos.id,
        "tracking_number": `${orderPos.code}`,
        "customer_id": orderPos.user_id,
        "customer_contact": `${shipping_address.phone}`,
        "language": "en",
        status:   mapStatus(orderPos.delivery_status,orderStatus),
          amount: orderPos.grand_total,
          sales_tax: 0,
          paid_total: orderPos.grand_total,
          total: orderPos.grand_total,
        "coupon_id": null,
        "parent_id": null,
        "shop_id": null,
        "discount": 0,
        "payment_id": null,
        "payment_gateway": "CASH_ON_DELIVERY",
        shipping_address: {
            zip: shipping_address.postal_code,
            city: shipping_address.city,
            state: shipping_address.city,
            country: shipping_address.country,
            street_address: shipping_address.address
          },
          billing_address: {
            zip: shipping_address.billing_address.zip,
            city: shipping_address.billing_address?.city,
            state: shipping_address.billing_address?.state,
            country: shipping_address.billing_address?.country,
            street_address: shipping_address.billing_address?.street_address
          },
        "logistics_provider": null,
        "delivery_fee": 0,
        "delivery_time": "Express Delivery",
        "deleted_at": null,
        "created_at": orderPos.created_at,
        "updated_at": orderPos.updated_at,
        "customer": {
          "id": 2,
          "name": "Customer",
          "email": "customer@demo.com",
          "email_verified_at": null,
          "created_at": "2021-08-18T10:30:29.000000Z",
          "updated_at": "2021-08-18T13:17:53.000000Z",
          "is_active": 1,
          "shop_id": null
        },
        "products": [
          ...getProducts(orderPosDetails)
        ],
        "children": [
          {
            "id": 67,
            "tracking_number": "nCK5k7Dt5wjv",
            "customer_id": 2,
            "customer_contact": "19365141641631",
            "language": "en",
            "status": {
              "id": 1,
              "name": "Order Received",
              "serial": 1,
              "color": "#23b848",
              "created_at": "2021-03-08T21:33:52.000000Z",
              "updated_at": "2021-03-08T21:34:04.000000Z",
              "language": "en",
              "translated_languages": [
                "en"
              ]
            },
            "amount": 150,
            "sales_tax": 0,
            "paid_total": 150,
            "total": 150,
            "coupon_id": null,
            "parent_id": 66,
            "shop_id": 7,
            "discount": 0,
            "payment_id": null,
            "payment_gateway": "CASH_ON_DELIVERY",
            shipping_address: {
                zip: shipping_address.postal_code,
                city: shipping_address.city,
                state: shipping_address.city,
                country: shipping_address.country,
                street_address: shipping_address.address
              },
              billing_address: {
                zip: shipping_address.billing_address.zip,
                city: shipping_address.billing_address?.city,
                state: shipping_address.billing_address?.state,
                country: shipping_address.billing_address?.country,
                street_address: shipping_address.billing_address?.street_address
              },
            "logistics_provider": null,
            "delivery_fee": 0,
            "delivery_time": "Express Delivery",
            "deleted_at": null,
            "created_at": orderPos.created_at,
            "updated_at": orderPos.updated_at,
            "customer": {
              "id": 2,
              "name": "Customer",
              "email": "customer@demo.com",
              "email_verified_at": null,
              "created_at": "2021-08-18T10:30:29.000000Z",
              "updated_at": "2021-08-18T13:17:53.000000Z",
              "is_active": 1,
              "shop_id": null
            },
            "products": [
              {
                "id": 924,
                "name": "Greddy Love",
                "slug": "greddy-love",
                "description": "The runes of Lyrical Ditties designedlyre-imagined the way poetry should sound\"By fitting to rhythmic arrangement a selection of the real language of men,\"Wordsworth and his English coevals, similar as Coleridge, John Keats, Percy Shelley, and William Blake, wrote poetry that was meant to boil up from serious, reflective reflection over the commerce of humans with their terrain. Although numerous stress the notion of naturalness in Romantic poetry, the movement was still greatly concerned with the difficulty of composition and of rephrasing these feelings into lyrical form. Indeed, Coleridge, in his essay On Poesy or Art, sees art as “ the mediatress between, and jurist of nature and man”. Such an station reflects what might be called the dominant theme of English Romantic poetry the filtering of natural emotion through the mortal mind in order to produce meaning.",
                "type_id": 8,
                "price": 180,
                "shop_id": 7,
                "sale_price": 150,
                "min_price": 180,
                "max_price": 180,
                "sku": "4g6g4d54fd6g54gd+++",
                "quantity": 500,
                "in_stock": 1,
                "is_taxable": 0,
                "shipping_class_id": null,
                "status": "publish",
                "product_type": "simple",
                "unit": "1 pc",
                "height": null,
                "width": null,
                "length": null,
                "image": {
                  "id": 1636,
                  "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/Romantic-Books-7.jpg",
                  "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/conversions/Romantic-Books-7-thumbnail.jpg"
                },
                "video": null,
                "gallery": [],
                "deleted_at": null,
                "created_at": "2021-12-12T17:10:16.000000Z",
                "updated_at": "2022-01-02T08:51:51.000000Z",
                "author_id": 11,
                "manufacturer_id": 4,
                "is_digital": 1,
                "is_external": 0,
                "external_product_url": null,
                "external_product_button_text": null,
                "language": "en",
                "translated_languages": [
                  "en"
                ],
                "pivot": {
                  "order_id": 67,
                  "product_id": 924,
                  "order_quantity": "1",
                  "unit_price": 150,
                  "subtotal": 150,
                  "variation_option_id": null,
                  "created_at": orderPos.created_at,
                  "updated_at": orderPos.updated_at
                },
                "variation_options": []
              }
            ]
          }
        ],
        "refund": null
      };
    return  {
        id: orderPos.id,
        tracking_number: `${orderPos.code}`,
        customer_id: orderPos.user_id,
        customer_contact: `${shipping_address.phone}`,
        language: "en",
        status: {
          id: 1,
          name: "Order Received",
          serial: 1,
          color: "#23b848",
          created_at: `${orderPos.created_at}`,
          updated_at: `${orderPos.updated_at}`,
          language: "en",
          translated_languages: [
            "en"
          ]
        },
        amount: orderPos.grand_total,
        sales_tax: 0,
        paid_total: 0,
        total: orderPos.grand_total,
        coupon_id: null,
        parent_id: null,
        shop_id: null,
        discount: 0,
        payment_id: null,
        payment_gateway: "CASH_ON_DELIVERY",
        shipping_address: {
          zip: shipping_address.postal_code,
          city: shipping_address.city,
          state: shipping_address.city,
          country: shipping_address.country,
          street_address: shipping_address.address
        },
        billing_address: {
          zip: shipping_address.billing_address?.zip,
          city: shipping_address.billing_address?.city,
          state: shipping_address.billing_address?.state,
          country: shipping_address.billing_address?.country,
          street_address: shipping_address.billing_address?.street_address
        },
        "logistics_provider": null,
        "delivery_fee": 0,
        "delivery_time": "Express Delivery",
        "deleted_at": null,
        "created_at": "2022-01-12T07:29:20.000000Z",
        "updated_at": "2022-01-12T07:29:20.000000Z",
        "customer": {
          "id": 2,
          "name": "Customer",
          "email": "customer@demo.com",
          "email_verified_at": null,
          "created_at": `${orderPos.created_at}`,
          "updated_at": `${orderPos.created_at}`,
          "is_active": 1,
          "shop_id": null
        },
        "products": [
          {
            "id": 924,
            "name": "Greddy Love",
            "slug": "greddy-love",
            "description": "The runes of Lyrical Ditties designedlyre-imagined the way poetry should sound\"By fitting to rhythmic arrangement a selection of the real language of men,\"Wordsworth and his English coevals, similar as Coleridge, John Keats, Percy Shelley, and William Blake, wrote poetry that was meant to boil up from serious, reflective reflection over the commerce of humans with their terrain. Although numerous stress the notion of naturalness in Romantic poetry, the movement was still greatly concerned with the difficulty of composition and of rephrasing these feelings into lyrical form. Indeed, Coleridge, in his essay On Poesy or Art, sees art as “ the mediatress between, and jurist of nature and man”. Such an station reflects what might be called the dominant theme of English Romantic poetry the filtering of natural emotion through the mortal mind in order to produce meaning.",
            "type_id": 8,
            "price": 180,
            "shop_id": 7,
            "sale_price": 150,
            "min_price": 180,
            "max_price": 180,
            "sku": "4g6g4d54fd6g54gd+++",
            "quantity": 500,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1 pc",
            "height": null,
            "width": null,
            "length": null,
            "image": {
              "id": 1636,
              "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/Romantic-Books-7.jpg",
              "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/conversions/Romantic-Books-7-thumbnail.jpg"
            },
            "video": null,
            "gallery": [],
            "deleted_at": null,
            "created_at": "2021-12-12T17:10:16.000000Z",
            "updated_at": "2022-01-02T08:51:51.000000Z",
            "language": "en",
            "translated_languages": [
              "en"
            ],
            "author_id": 11,
            "manufacturer_id": 4,
            "is_digital": 1,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "pivot": {
              "order_id": 66,
              "product_id": 924,
              "order_quantity": "1",
              "unit_price": 150,
              "subtotal": 150,
              "variation_option_id": null,
              "created_at": "2022-01-12T07:29:20.000000Z",
              "updated_at": "2022-01-12T07:29:20.000000Z"
            },
            "variation_options": []
          }
        ],
        "children": [
        //   {
        //     "id": 67,
        //     "tracking_number": "nCK5k7Dt5wjv",
        //     "customer_id": 2,
        //     "customer_contact": "19365141641631",
        //     "language": "en",
        //     "status": {
        //       "id": 1,
        //       "name": "Order Received",
        //       "serial": 1,
        //       "color": "#23b848",
        //       "created_at": "2021-03-08T21:33:52.000000Z",
        //       "updated_at": "2021-03-08T21:34:04.000000Z",
        //       "language": "en",
        //       "translated_languages": [
        //         "en"
        //       ]
        //     },
        //     "amount": 150,
        //     "sales_tax": 0,
        //     "paid_total": 150,
        //     "total": 150,
        //     "coupon_id": null,
        //     "parent_id": 66,
        //     "shop_id": 7,
        //     "discount": 0,
        //     "payment_id": null,
        //     "payment_gateway": "CASH_ON_DELIVERY",
        //     "shipping_address": {
        //       "zip": "40391",
        //       "city": "Winchester",
        //       "state": "KY",
        //       "country": "United States",
        //       "street_address": "2148  Straford Park"
        //     },
        //     "billing_address": {
        //       "zip": "122",
        //       "city": "aaa",
        //       "state": "aaaa",
        //       "country": "aaa",
        //       "street_address": "ss"
        //     },
        //     "logistics_provider": null,
        //     "delivery_fee": 0,
        //     "delivery_time": "Express Delivery",
        //     "deleted_at": null,
        //     "created_at": "2022-01-12T07:29:20.000000Z",
        //     "updated_at": "2022-01-12T07:29:20.000000Z",
        //     "customer": {
        //       "id": 2,
        //       "name": "Customer",
        //       "email": "customer@demo.com",
        //       "email_verified_at": null,
        //       "created_at": "2021-08-18T10:30:29.000000Z",
        //       "updated_at": "2021-08-18T13:17:53.000000Z",
        //       "is_active": 1,
        //       "shop_id": null
        //     },
        //     "products": [
        //       {
        //         "id": 924,
        //         "name": "Greddy Love",
        //         "slug": "greddy-love",
        //         "description": "The runes of Lyrical Ditties designedlyre-imagined the way poetry should sound\"By fitting to rhythmic arrangement a selection of the real language of men,\"Wordsworth and his English coevals, similar as Coleridge, John Keats, Percy Shelley, and William Blake, wrote poetry that was meant to boil up from serious, reflective reflection over the commerce of humans with their terrain. Although numerous stress the notion of naturalness in Romantic poetry, the movement was still greatly concerned with the difficulty of composition and of rephrasing these feelings into lyrical form. Indeed, Coleridge, in his essay On Poesy or Art, sees art as “ the mediatress between, and jurist of nature and man”. Such an station reflects what might be called the dominant theme of English Romantic poetry the filtering of natural emotion through the mortal mind in order to produce meaning.",
        //         "type_id": 8,
        //         "price": 180,
        //         "shop_id": 7,
        //         "sale_price": 150,
        //         "min_price": 180,
        //         "max_price": 180,
        //         "sku": "4g6g4d54fd6g54gd+++",
        //         "quantity": 500,
        //         "in_stock": 1,
        //         "is_taxable": 0,
        //         "shipping_class_id": null,
        //         "status": "publish",
        //         "product_type": "simple",
        //         "unit": "1 pc",
        //         height: null,
        //         width: null,
        //         length: null,
        //         image: {
        //           id: 1636,
        //           original: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/Romantic-Books-7.jpg",
        //           thumbnail: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/conversions/Romantic-Books-7-thumbnail.jpg"
        //         },
        //         video: null,
        //         gallery: [],
        //         deleted_at: null,
        //         created_at: "2021-12-12T17:10:16.000000Z",
        //         updated_at: "2022-01-02T08:51:51.000000Z",
        //         author_id: 11,
        //         manufacturer_id: 4,
        //         is_digital: 1,
        //         is_external: 0,
        //         external_product_url: null,
        //         external_product_button_text: null,
        //         language: "en",
        //         translated_languages: [
        //           "en"
        //         ],
        //         "pivot": {
        //           order_id: 67,
        //           product_id: 924,
        //           order_quantity: "1",
        //           unit_price: 150,
        //           subtotal: 150,
        //           variation_option_id: null,
        //           created_at: "2022-01-12T07:29:20.000000Z",
        //           updated_at: "2022-01-12T07:29:20.000000Z"
        //         },
        //         variation_options: []
        //       }
        //     ]
        //   }
        ],
        refund: null
      };
}


export const getSingleOrder = (orderPos) => {
    let shipping_address = JSON.parse(orderPos.shipping_address)
    console.log(orderPos.code)
    return  {
        "id": orderPos.id,
        "tracking_number": `${orderPos.code}`,
        "customer_id": orderPos.user_id,
        "customer_contact": `${shipping_address.phone}`,
        "language": "en",
        status: {
            id: 1,
            name: "Order Received",
            serial: 1,
            color: "#23b848",
            created_at: `${orderPos.created_at}`,
            updated_at: `${orderPos.updated_at}`,
            language: "en",
            translated_languages: [
              "en"
            ]
          },
          amount: orderPos.grand_total,
          sales_tax: 0,
          paid_total: orderPos.grand_total,
          total: orderPos.grand_total,
        "coupon_id": null,
        "parent_id": null,
        "shop_id": null,
        "discount": 0,
        "payment_id": null,
        "payment_gateway": "CASH_ON_DELIVERY",
        shipping_address: {
            zip: shipping_address.postal_code,
            city: shipping_address.city,
            state: shipping_address.city,
            country: shipping_address.country,
            street_address: shipping_address.address
          },
          billing_address: {
            zip: shipping_address.billing_address.zip,
            city: shipping_address.billing_address?.city,
            state: shipping_address.billing_address?.state,
            country: shipping_address.billing_address?.country,
            street_address: shipping_address.billing_address?.street_address
          },
        "logistics_provider": null,
        "delivery_fee": 0,
        "delivery_time": "Express Delivery",
        "deleted_at": null,
        "created_at": orderPos.created_at,
        "updated_at": orderPos.updated_at,
        "customer": {
          "id": 2,
          "name": "Customer",
          "email": "customer@demo.com",
          "email_verified_at": null,
          "created_at": "2021-08-18T10:30:29.000000Z",
          "updated_at": "2021-08-18T13:17:53.000000Z",
          "is_active": 1,
          "shop_id": null
        },
        "products": [
          {
            "id": 924,
            "name": "Greddy Love",
            "slug": "greddy-love",
            "description": "The runes of Lyrical Ditties designedlyre-imagined the way poetry should sound\"By fitting to rhythmic arrangement a selection of the real language of men,\"Wordsworth and his English coevals, similar as Coleridge, John Keats, Percy Shelley, and William Blake, wrote poetry that was meant to boil up from serious, reflective reflection over the commerce of humans with their terrain. Although numerous stress the notion of naturalness in Romantic poetry, the movement was still greatly concerned with the difficulty of composition and of rephrasing these feelings into lyrical form. Indeed, Coleridge, in his essay On Poesy or Art, sees art as “ the mediatress between, and jurist of nature and man”. Such an station reflects what might be called the dominant theme of English Romantic poetry the filtering of natural emotion through the mortal mind in order to produce meaning.",
            "type_id": 8,
            "price": 180,
            "shop_id": 7,
            "sale_price": 150,
            "min_price": 180,
            "max_price": 180,
            "sku": "4g6g4d54fd6g54gd+++",
            "quantity": 500,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1 pc",
            "height": null,
            "width": null,
            "length": null,
            "image": {
              "id": 1636,
              "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/Romantic-Books-7.jpg",
              "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/conversions/Romantic-Books-7-thumbnail.jpg"
            },
            "video": null,
            "gallery": [],
            "deleted_at": null,
            "created_at": "2021-12-12T17:10:16.000000Z",
            "updated_at": "2022-01-02T08:51:51.000000Z",
            "language": "en",
            "translated_languages": [
              "en"
            ],
            "author_id": 11,
            "manufacturer_id": 4,
            "is_digital": 1,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "pivot": {
              "order_id": 66,
              "product_id": 924,
              "order_quantity": "1",
              "unit_price": 150,
              "subtotal": 150,
              "variation_option_id": null,
              "created_at": "2022-01-12T07:29:20.000000Z",
              "updated_at": "2022-01-12T07:29:20.000000Z"
            },
            "variation_options": []
          }
        ],
        "children": [
          {
            "id": 67,
            "tracking_number": "nCK5k7Dt5wjv",
            "customer_id": 2,
            "customer_contact": "19365141641631",
            "language": "en",
            "status": {
              "id": 1,
              "name": "Order Received",
              "serial": 1,
              "color": "#23b848",
              "created_at": "2021-03-08T21:33:52.000000Z",
              "updated_at": "2021-03-08T21:34:04.000000Z",
              "language": "en",
              "translated_languages": [
                "en"
              ]
            },
            "amount": 150,
            "sales_tax": 0,
            "paid_total": 150,
            "total": 150,
            "coupon_id": null,
            "parent_id": 66,
            "shop_id": 7,
            "discount": 0,
            "payment_id": null,
            "payment_gateway": "CASH_ON_DELIVERY",
            shipping_address: {
                zip: shipping_address.postal_code,
                city: shipping_address.city,
                state: shipping_address.city,
                country: shipping_address.country,
                street_address: shipping_address.address
              },
              billing_address: {
                zip: shipping_address.billing_address.zip,
                city: shipping_address.billing_address?.city,
                state: shipping_address.billing_address?.state,
                country: shipping_address.billing_address?.country,
                street_address: shipping_address.billing_address?.street_address
              },
            "logistics_provider": null,
            "delivery_fee": 0,
            "delivery_time": "Express Delivery",
            "deleted_at": null,
            "created_at": orderPos.created_at,
            "updated_at": orderPos.updated_at,
            "customer": {
              "id": 2,
              "name": "Customer",
              "email": "customer@demo.com",
              "email_verified_at": null,
              "created_at": "2021-08-18T10:30:29.000000Z",
              "updated_at": "2021-08-18T13:17:53.000000Z",
              "is_active": 1,
              "shop_id": null
            },
            "products": [
              {
                "id": 924,
                "name": "Greddy Love",
                "slug": "greddy-love",
                "description": "The runes of Lyrical Ditties designedlyre-imagined the way poetry should sound\"By fitting to rhythmic arrangement a selection of the real language of men,\"Wordsworth and his English coevals, similar as Coleridge, John Keats, Percy Shelley, and William Blake, wrote poetry that was meant to boil up from serious, reflective reflection over the commerce of humans with their terrain. Although numerous stress the notion of naturalness in Romantic poetry, the movement was still greatly concerned with the difficulty of composition and of rephrasing these feelings into lyrical form. Indeed, Coleridge, in his essay On Poesy or Art, sees art as “ the mediatress between, and jurist of nature and man”. Such an station reflects what might be called the dominant theme of English Romantic poetry the filtering of natural emotion through the mortal mind in order to produce meaning.",
                "type_id": 8,
                "price": 180,
                "shop_id": 7,
                "sale_price": 150,
                "min_price": 180,
                "max_price": 180,
                "sku": "4g6g4d54fd6g54gd+++",
                "quantity": 500,
                "in_stock": 1,
                "is_taxable": 0,
                "shipping_class_id": null,
                "status": "publish",
                "product_type": "simple",
                "unit": "1 pc",
                "height": null,
                "width": null,
                "length": null,
                "image": {
                  "id": 1636,
                  "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/Romantic-Books-7.jpg",
                  "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/conversions/Romantic-Books-7-thumbnail.jpg"
                },
                "video": null,
                "gallery": [],
                "deleted_at": null,
                "created_at": "2021-12-12T17:10:16.000000Z",
                "updated_at": "2022-01-02T08:51:51.000000Z",
                "author_id": 11,
                "manufacturer_id": 4,
                "is_digital": 1,
                "is_external": 0,
                "external_product_url": null,
                "external_product_button_text": null,
                "language": "en",
                "translated_languages": [
                  "en"
                ],
                "pivot": {
                  "order_id": 67,
                  "product_id": 924,
                  "order_quantity": "1",
                  "unit_price": 150,
                  "subtotal": 150,
                  "variation_option_id": null,
                  "created_at": orderPos.created_at,
                  "updated_at": orderPos.updated_at
                },
                "variation_options": []
              }
            ]
          }
        ],
        "refund": null
      };
    return  {
        id: orderPos.id,
        tracking_number: `${orderPos.code}`,
        customer_id: orderPos.user_id,
        customer_contact: `${shipping_address.phone}`,
        language: "en",
        status: {
          id: 1,
          name: "Order Received",
          serial: 1,
          color: "#23b848",
          created_at: `${orderPos.created_at}`,
          updated_at: `${orderPos.updated_at}`,
          language: "en",
          translated_languages: [
            "en"
          ]
        },
        amount: orderPos.grand_total,
        sales_tax: 0,
        paid_total: 0,
        total: orderPos.grand_total,
        coupon_id: null,
        parent_id: null,
        shop_id: null,
        discount: 0,
        payment_id: null,
        payment_gateway: "CASH_ON_DELIVERY",
        shipping_address: {
          zip: shipping_address.postal_code,
          city: shipping_address.city,
          state: shipping_address.city,
          country: shipping_address.country,
          street_address: shipping_address.address
        },
        billing_address: {
          zip: shipping_address.billing_address?.zip,
          city: shipping_address.billing_address?.city,
          state: shipping_address.billing_address?.state,
          country: shipping_address.billing_address?.country,
          street_address: shipping_address.billing_address?.street_address
        },
        "logistics_provider": null,
        "delivery_fee": 0,
        "delivery_time": "Express Delivery",
        "deleted_at": null,
        "created_at": "2022-01-12T07:29:20.000000Z",
        "updated_at": "2022-01-12T07:29:20.000000Z",
        "customer": {
          "id": 2,
          "name": "Customer",
          "email": "customer@demo.com",
          "email_verified_at": null,
          "created_at": `${orderPos.created_at}`,
          "updated_at": `${orderPos.created_at}`,
          "is_active": 1,
          "shop_id": null
        },
        "products": [
          {
            "id": 924,
            "name": "Greddy Love",
            "slug": "greddy-love",
            "description": "The runes of Lyrical Ditties designedlyre-imagined the way poetry should sound\"By fitting to rhythmic arrangement a selection of the real language of men,\"Wordsworth and his English coevals, similar as Coleridge, John Keats, Percy Shelley, and William Blake, wrote poetry that was meant to boil up from serious, reflective reflection over the commerce of humans with their terrain. Although numerous stress the notion of naturalness in Romantic poetry, the movement was still greatly concerned with the difficulty of composition and of rephrasing these feelings into lyrical form. Indeed, Coleridge, in his essay On Poesy or Art, sees art as “ the mediatress between, and jurist of nature and man”. Such an station reflects what might be called the dominant theme of English Romantic poetry the filtering of natural emotion through the mortal mind in order to produce meaning.",
            "type_id": 8,
            "price": 180,
            "shop_id": 7,
            "sale_price": 150,
            "min_price": 180,
            "max_price": 180,
            "sku": "4g6g4d54fd6g54gd+++",
            "quantity": 500,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1 pc",
            "height": null,
            "width": null,
            "length": null,
            "image": {
              "id": 1636,
              "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/Romantic-Books-7.jpg",
              "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/conversions/Romantic-Books-7-thumbnail.jpg"
            },
            "video": null,
            "gallery": [],
            "deleted_at": null,
            "created_at": "2021-12-12T17:10:16.000000Z",
            "updated_at": "2022-01-02T08:51:51.000000Z",
            "language": "en",
            "translated_languages": [
              "en"
            ],
            "author_id": 11,
            "manufacturer_id": 4,
            "is_digital": 1,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "pivot": {
              "order_id": 66,
              "product_id": 924,
              "order_quantity": "1",
              "unit_price": 150,
              "subtotal": 150,
              "variation_option_id": null,
              "created_at": "2022-01-12T07:29:20.000000Z",
              "updated_at": "2022-01-12T07:29:20.000000Z"
            },
            "variation_options": []
          }
        ],
        "children": [
        //   {
        //     "id": 67,
        //     "tracking_number": "nCK5k7Dt5wjv",
        //     "customer_id": 2,
        //     "customer_contact": "19365141641631",
        //     "language": "en",
        //     "status": {
        //       "id": 1,
        //       "name": "Order Received",
        //       "serial": 1,
        //       "color": "#23b848",
        //       "created_at": "2021-03-08T21:33:52.000000Z",
        //       "updated_at": "2021-03-08T21:34:04.000000Z",
        //       "language": "en",
        //       "translated_languages": [
        //         "en"
        //       ]
        //     },
        //     "amount": 150,
        //     "sales_tax": 0,
        //     "paid_total": 150,
        //     "total": 150,
        //     "coupon_id": null,
        //     "parent_id": 66,
        //     "shop_id": 7,
        //     "discount": 0,
        //     "payment_id": null,
        //     "payment_gateway": "CASH_ON_DELIVERY",
        //     "shipping_address": {
        //       "zip": "40391",
        //       "city": "Winchester",
        //       "state": "KY",
        //       "country": "United States",
        //       "street_address": "2148  Straford Park"
        //     },
        //     "billing_address": {
        //       "zip": "122",
        //       "city": "aaa",
        //       "state": "aaaa",
        //       "country": "aaa",
        //       "street_address": "ss"
        //     },
        //     "logistics_provider": null,
        //     "delivery_fee": 0,
        //     "delivery_time": "Express Delivery",
        //     "deleted_at": null,
        //     "created_at": "2022-01-12T07:29:20.000000Z",
        //     "updated_at": "2022-01-12T07:29:20.000000Z",
        //     "customer": {
        //       "id": 2,
        //       "name": "Customer",
        //       "email": "customer@demo.com",
        //       "email_verified_at": null,
        //       "created_at": "2021-08-18T10:30:29.000000Z",
        //       "updated_at": "2021-08-18T13:17:53.000000Z",
        //       "is_active": 1,
        //       "shop_id": null
        //     },
        //     "products": [
        //       {
        //         "id": 924,
        //         "name": "Greddy Love",
        //         "slug": "greddy-love",
        //         "description": "The runes of Lyrical Ditties designedlyre-imagined the way poetry should sound\"By fitting to rhythmic arrangement a selection of the real language of men,\"Wordsworth and his English coevals, similar as Coleridge, John Keats, Percy Shelley, and William Blake, wrote poetry that was meant to boil up from serious, reflective reflection over the commerce of humans with their terrain. Although numerous stress the notion of naturalness in Romantic poetry, the movement was still greatly concerned with the difficulty of composition and of rephrasing these feelings into lyrical form. Indeed, Coleridge, in his essay On Poesy or Art, sees art as “ the mediatress between, and jurist of nature and man”. Such an station reflects what might be called the dominant theme of English Romantic poetry the filtering of natural emotion through the mortal mind in order to produce meaning.",
        //         "type_id": 8,
        //         "price": 180,
        //         "shop_id": 7,
        //         "sale_price": 150,
        //         "min_price": 180,
        //         "max_price": 180,
        //         "sku": "4g6g4d54fd6g54gd+++",
        //         "quantity": 500,
        //         "in_stock": 1,
        //         "is_taxable": 0,
        //         "shipping_class_id": null,
        //         "status": "publish",
        //         "product_type": "simple",
        //         "unit": "1 pc",
        //         height: null,
        //         width: null,
        //         length: null,
        //         image: {
        //           id: 1636,
        //           original: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/Romantic-Books-7.jpg",
        //           thumbnail: "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/conversions/Romantic-Books-7-thumbnail.jpg"
        //         },
        //         video: null,
        //         gallery: [],
        //         deleted_at: null,
        //         created_at: "2021-12-12T17:10:16.000000Z",
        //         updated_at: "2022-01-02T08:51:51.000000Z",
        //         author_id: 11,
        //         manufacturer_id: 4,
        //         is_digital: 1,
        //         is_external: 0,
        //         external_product_url: null,
        //         external_product_button_text: null,
        //         language: "en",
        //         translated_languages: [
        //           "en"
        //         ],
        //         "pivot": {
        //           order_id: 67,
        //           product_id: 924,
        //           order_quantity: "1",
        //           unit_price: 150,
        //           subtotal: 150,
        //           variation_option_id: null,
        //           created_at: "2022-01-12T07:29:20.000000Z",
        //           updated_at: "2022-01-12T07:29:20.000000Z"
        //         },
        //         variation_options: []
        //       }
        //     ]
        //   }
        ],
        refund: null
      };
}

const mapStatus = (delivery_status,orderStatus) => {
  let detailsStatus;
for(let i =0; i < orderStatus.length; i++){
  if(delivery_status == orderStatus[i].slug){
    detailsStatus = orderStatus[i]
       break;
  }
}
if(!detailsStatus) {
  detailsStatus =   {
    "id": 5,
    "name": delivery_status,
    "slug": delivery_status,
    "serial": 1,
    "color": "#d87b64",
    "created_at": "2021-03-13T15:04:26.000000Z",
    "updated_at": "2021-03-13T15:09:03.000000Z",
    "language": "en",
    "translated_languages": [
      "en"
    ]
  }
}
console.log("order status",detailsStatus)
return detailsStatus;
}
export const getSingleOrderDetailsInDashboard = (orderPos,orderPosDetails,orderStatus) => {


  
  let shipping_address = JSON.parse(orderPos.shipping_address)


  console.log(orderPos.code)
  return  {
      "id": orderPos.id,
      "tracking_number": `${orderPos.code}`,
      "customer_id": orderPos.user_id,
      "customer_contact": `${shipping_address.phone}`,
      "language": "en",
      status:  mapStatus(orderPos.delivery_status,orderStatus),
        amount: orderPos.grand_total,
        sales_tax: 0,
        paid_total: orderPos.grand_total,
        total: orderPos.grand_total,
      "coupon_id": null,
      "parent_id": null,
      "shop_id": null,
      "discount": 0,
      "payment_id": null,
      "payment_gateway": "CASH_ON_DELIVERY",
      shipping_address: {
          zip: shipping_address.postal_code,
          city: shipping_address.city,
          state: shipping_address.city,
          country: shipping_address.country,
          street_address: shipping_address.address
        },
        billing_address: {
          zip: shipping_address.billing_address.zip,
          city: shipping_address.billing_address?.city,
          state: shipping_address.billing_address?.state,
          country: shipping_address.billing_address?.country,
          street_address: shipping_address.billing_address?.street_address
        },
      "logistics_provider": null,
      "delivery_fee": 0,
      "delivery_time": "Express Delivery",
      "deleted_at": null,
      "created_at": orderPos.created_at,
      "updated_at": orderPos.updated_at,
      "customer": {
        "id": 2,
        "name": "Customer",
        "email": "customer@demo.com",
        "email_verified_at": null,
        "created_at": "2021-08-18T10:30:29.000000Z",
        "updated_at": "2021-08-18T13:17:53.000000Z",
        "is_active": 1,
        "shop_id": null
      },
      "products": [
        ...getProducts(orderPosDetails)
      ],
      "children": [
        {
          "id": 67,
          "tracking_number": "nCK5k7Dt5wjv",
          "customer_id": 2,
          "customer_contact": "19365141641631",
          "language": "en",
          "status": {
            "id": 1,
            "name": "Order Received",
            "serial": 1,
            "color": "#23b848",
            "created_at": "2021-03-08T21:33:52.000000Z",
            "updated_at": "2021-03-08T21:34:04.000000Z",
            "language": "en",
            "translated_languages": [
              "en"
            ]
          },
          "amount": 150,
          "sales_tax": 0,
          "paid_total": 150,
          "total": 150,
          "coupon_id": null,
          "parent_id": 66,
          "shop_id": 7,
          "discount": 0,
          "payment_id": null,
          "payment_gateway": "CASH_ON_DELIVERY",
          shipping_address: {
              zip: shipping_address.postal_code,
              city: shipping_address.city,
              state: shipping_address.city,
              country: shipping_address.country,
              street_address: shipping_address.address
            },
            billing_address: {
              zip: shipping_address.billing_address.zip,
              city: shipping_address.billing_address?.city,
              state: shipping_address.billing_address?.state,
              country: shipping_address.billing_address?.country,
              street_address: shipping_address.billing_address?.street_address
            },
          "logistics_provider": null,
          "delivery_fee": 0,
          "delivery_time": "Express Delivery",
          "deleted_at": null,
          "created_at": orderPos.created_at,
          "updated_at": orderPos.updated_at,
          "customer": {
            "id": 2,
            "name": "Customer",
            "email": "customer@demo.com",
            "email_verified_at": null,
            "created_at": "2021-08-18T10:30:29.000000Z",
            "updated_at": "2021-08-18T13:17:53.000000Z",
            "is_active": 1,
            "shop_id": null
          },
          "products": [
            {
              "id": 924,
              "name": "Greddy Love",
              "slug": "greddy-love",
              "description": "The runes of Lyrical Ditties designedlyre-imagined the way poetry should sound\"By fitting to rhythmic arrangement a selection of the real language of men,\"Wordsworth and his English coevals, similar as Coleridge, John Keats, Percy Shelley, and William Blake, wrote poetry that was meant to boil up from serious, reflective reflection over the commerce of humans with their terrain. Although numerous stress the notion of naturalness in Romantic poetry, the movement was still greatly concerned with the difficulty of composition and of rephrasing these feelings into lyrical form. Indeed, Coleridge, in his essay On Poesy or Art, sees art as “ the mediatress between, and jurist of nature and man”. Such an station reflects what might be called the dominant theme of English Romantic poetry the filtering of natural emotion through the mortal mind in order to produce meaning.",
              "type_id": 8,
              "price": 180,
              "shop_id": 7,
              "sale_price": 150,
              "min_price": 180,
              "max_price": 180,
              "sku": "4g6g4d54fd6g54gd+++",
              "quantity": 500,
              "in_stock": 1,
              "is_taxable": 0,
              "shipping_class_id": null,
              "status": "publish",
              "product_type": "simple",
              "unit": "1 pc",
              "height": null,
              "width": null,
              "length": null,
              "image": {
                "id": 1636,
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/Romantic-Books-7.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1636/conversions/Romantic-Books-7-thumbnail.jpg"
              },
              "video": null,
              "gallery": [],
              "deleted_at": null,
              "created_at": "2021-12-12T17:10:16.000000Z",
              "updated_at": "2022-01-02T08:51:51.000000Z",
              "author_id": 11,
              "manufacturer_id": 4,
              "is_digital": 1,
              "is_external": 0,
              "external_product_url": null,
              "external_product_button_text": null,
              "language": "en",
              "translated_languages": [
                "en"
              ],
              "pivot": {
                "order_id": 67,
                "product_id": 924,
                "order_quantity": "1",
                "unit_price": 150,
                "subtotal": 150,
                "variation_option_id": null,
                "created_at": orderPos.created_at,
                "updated_at": orderPos.updated_at
              },
              "variation_options": []
            }
          ]
        }
      ],
      "refund": null
    };
 
}