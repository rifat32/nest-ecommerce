import { backend } from "src/backend";

const getGallery = (gallery) => {
const tempGallery = gallery.map(el => {
  const galleryObj = {
      "id": el.id,
      "original": `${backend}/storage/img/${el.file}`,
      "thumbnail": `${backend}/storage/img/${el.file}`
    
  }
  return galleryObj
})


  return tempGallery;
}
// const getReletedProduct = (releted_products) => {
//   const tempReletedProduct = releted_products.map(el => {
//     const reletedProductObj = {
//         "id": el.id,
//         "original": `${backend}/storage/img/${el.file}`,
//         "thumbnail": `${backend}/storage/img/${el.file}`
      
//     }
//     return reletedProductObj
//   })
  
  
//     return tempReletedProduct;
//   }



export const getSingleProductDetails = (
  variation_id,
  product_name,
  image,
  sell_price_inc_tax,
  description,
  qty_available,
  gallery:any = [],
  category_name,
  category_id
) => {





  return {
      "id": variation_id,
      "name": product_name,
      "slug": variation_id.toString(),
      "description": description,
      "type_id": 1,
      "price": parseFloat(sell_price_inc_tax),
      "shop_id": 6,
      "sale_price": null,
      "language": "en",
      "min_price": parseFloat(sell_price_inc_tax) -1,
      "max_price": parseFloat(sell_price_inc_tax) + 1,
      "sku": "2",
      "quantity": qty_available,
      "in_stock": qty_available,
      "is_taxable": 0,
      "shipping_class_id": null,
      "status": "publish",
      "product_type": "simple",
      "unit": "2Pfund",
      "height": null,
      "width": null,
      "length": null,
      "image": {
        "id": "2",
        "original": `${backend}/storage/img/${image}`,
        "thumbnail": `${backend}/storage/img/${image}`
      },
      "video": null,
      "gallery": [
        ...getGallery(gallery)
        // {
        //   "id": "576",
        //   "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/575/baby-spinach-1.png",
        //   "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/575/conversions/baby-spinach-1-thumbnail.jpg"
        // },
        // {
        //   "id": "577",
        //   "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/576/baby-spinach-2.png",
        //   "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/576/conversions/baby-spinach-2-thumbnail.jpg"
        // },
        // {
        //   "id": "578",
        //   "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/577/baby-spinach.png",
        //   "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/577/conversions/baby-spinach-thumbnail.jpg"
        // },
        // {
        //   "id": "738",
        //   "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/737/BabySpinach_xronqz.jpg",
        //   "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/737/conversions/BabySpinach_xronqz-thumbnail.jpg"
        // }
      ],
      "deleted_at": null,
      "created_at": "2021-03-08T10:26:13.000000Z",
      "updated_at": "2022-07-02T06:44:09.000000Z",
      "author_id": null,
      "manufacturer_id": null,
      "is_digital": 0,
      "is_external": 0,
      "external_product_url": null,
      "external_product_button_text": null,
      "ratings": 3.33,
      "total_reviews": 3,
      "rating_count": [
        {
          "rating": 4,
          "total": 1,
          "positive_feedbacks_count": 0,
          "negative_feedbacks_count": 0,
          "my_feedback": null,
          "abusive_reports_count": 0
        },
        {
          "rating": 3,
          "total": 2,
          "positive_feedbacks_count": 0,
          "negative_feedbacks_count": 0,
          "my_feedback": null,
          "abusive_reports_count": 0
        }
      ],
      "my_review": null,
      "in_wishlist": false,
      "blocked_dates": [],
      "translated_languages": [
        "en"
      ],
      "categories": [
        {
          "id": category_id,
          "name": category_name,
          "slug": category_id.toString(),
          "language": "en",
          "icon": "FruitsVegetable",
          "image": [],
          "details": null,
          "parent": null,
          "type_id": 1,
          "created_at": "2021-03-08T07:21:31.000000Z",
          "updated_at": "2021-03-08T07:21:31.000000Z",
          "deleted_at": null,
          "parent_id": null,
          "translated_languages": [
            "en"
          ],
          "pivot": {
            "product_id": variation_id,
            "category_id": category_id
          }
        },
       
      ],
      "shop": {
        "id": 6,
        "owner_id": 1,
        "name": "Grocery Shop",
        "slug": "grocery-shop",
        "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
        "cover_image": {
          "id": "894",
          "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
          "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
        },
        "logo": {
          "id": "893",
          "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
          "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
        },
        "is_active": 1,
        "address": {
          "zip": "61032",
          "city": "Freeport",
          "state": "Illinois",
          "country": "USA",
          "street_address": "1986  Spinnaker Lane"
        },
        "settings": {
          "contact": "018927525111",
          "socials": [
            {
              "url": "https://www.facebook.com/",
              "icon": "FacebookIcon"
            },
            {
              "url": "https://www.instagram.com/",
              "icon": "InstagramIcon"
            },
            {
              "url": "https://www.twitter.com/",
              "icon": "TwitterIcon"
            }
          ],
          "website": "https://redq.io/",
          "location": {
            "lat": 38.9032325,
            "lng": -77.0211068,
            "city": "Washington",
            "state": "DC",
            "country": "United States",
            "formattedAddress": "New York Ave NW, Washington, DC, USA"
          }
        },
        "created_at": "2021-06-27T03:48:23.000000Z",
        "updated_at": "2021-07-08T09:22:38.000000Z"
      },
      "type": {
        "id": 1,
        "name": "Grocery",
        "settings": {
          "isHome": true,
          "layoutType": "classic",
          "productCard": "neon"
        },
        "slug": "grocery",
        "language": "en",
        "icon": "FruitsVegetable",
        "promotional_sliders": [
          {
            "id": "902",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
          },
          {
            "id": "903",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
          },
          {
            "id": "904",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
          },
          {
            "id": "905",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
          },
          {
            "id": "906",
            "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
            "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
          }
        ],
        "created_at": "2021-03-08T07:18:25.000000Z",
        "updated_at": "2021-09-26T15:23:32.000000Z",
        "translated_languages": [
          "en"
        ]
      },
      "variations": [],
      "metas": [],
      "manufacturer": null,
      "variation_options": [],
      "tags": [],
      "author": null
    }
}