import e from "express";
import { backend } from "src/backend";

const getChildren = (children) => {
  const tempChildren = children.map(el => {
    const childrenObj = {
      "id": el.category_id,
      "name": el.category_name,
      "slug": el.category_id.toString(),
      "icon": null,
      "image": [],
      "details": null,
      "language": "en",
      "translated_languages": [
        "en"
      ],
      "parent": {
        "id": 1,
        "name": "Fruits & Vegetables",
        "slug": "fruits-vegetables",
        "icon": "FruitsVegetable",
        "image": [],
        "details": null,
        "language": "en",
        "translated_languages": [
          "en"
        ],
        "parent": null,
        "type_id": 1,
        "created_at": "2021-03-08T07:21:31.000000Z",
        "updated_at": "2021-03-08T07:21:31.000000Z",
        "deleted_at": null,
        "parent_id": null,
        "type": null,
        "children": null
      },
      "type_id": 1,
      "created_at": "2021-03-08T07:22:04.000000Z",
      "updated_at": "2021-03-08T07:22:04.000000Z",
      "deleted_at": null,
      "products_count": 9,
      "parent_id": 1,
      "children": []
    }
    return childrenObj
  })
  
  
    return tempChildren;
  }
  

export const getSingleCategory = (
  category_id,
  category_name,
   children
  
) => {
 

return {
  
    "id": category_id,
    "name": category_name,
    "slug": category_id.toString(),
    "icon": "FruitsVegetable",
    "image": [],
    "details": null,
    "language": "en",
    "translated_languages": [
      "en"
    ],
    "parent": null,
    "type_id": 1,
    "created_at": "2021-03-08T07:21:31.000000Z",
    "updated_at": "2021-03-08T07:21:31.000000Z",
    "deleted_at": null,
    "parent_id": null,
    "type": {
      "id": 1,
      "name": "Grocery",
      "language": "en",
      "translated_languages": [
        "en"
      ],
      "settings": {
        "isHome": true,
        "layoutType": "classic",
        "productCard": "neon"
      },
      "slug": "grocery",
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
      "updated_at": "2021-09-26T15:23:32.000000Z"
    },
    "children": [
    ...getChildren(children)
    ]
  }



   
}