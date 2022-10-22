
export const getSingleUser = (user) => {
return {
    "id": user.id,
    "name": user.name,
    "email": user.email,
    "email_verified_at": user.email_verified_at,
    "created_at": user.created_at,
    "updated_at": user.updated_at,
    "is_active": 1,
    "shop_id": null,
    "profile": {
      "id": user.id,
      "avatar": null,
      "bio": "",
      "socials": null,
      "contact": user.phone,
      "customer_id": 2,
      "created_at": user.created_at,
      "updated_at": user.updated_at
    },
    "address": [
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
        "created_at": "2021-08-18T13:18:03.000000Z",
        "updated_at": "2021-08-18T13:18:03.000000Z"
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
        "created_at": "2021-08-18T13:18:12.000000Z",
        "updated_at": "2021-08-18T13:18:12.000000Z"
      }
    ],
    "permissions": [
      {
        "id": 1,
        "name": "super_admin",
        "guard_name": "api",
        "created_at": "2021-06-27T04:13:00.000000Z",
        "updated_at": "2021-06-27T04:13:00.000000Z",
        "pivot": {
          "model_id": 2,
          "permission_id": 1,
          "model_type": "Marvel\\Database\\Models\\User"
        }
      },
      {
        "id": 2,
        "name": "customer",
        "guard_name": "api",
        "created_at": "2021-06-27T04:13:00.000000Z",
        "updated_at": "2021-06-27T04:13:00.000000Z",
        "pivot": {
          "model_id": 2,
          "permission_id": 2,
          "model_type": "Marvel\\Database\\Models\\User"
        }
      }
    ]
  }
}