import { backend } from "src/backend";

export const getSingleCoupon = (coupon) => {
    return {
        is_valid: coupon.is_valid,
        coupon: {
          id: coupon.id,
          code: coupon.code,
          description: coupon.description,
          image: {
            id: 925,
            original:`${backend}/storage/img/${coupon.image}`,
            thumbnail:`${backend}/storage/img/${coupon.image}`,
          },
          type: coupon.type,
          amount: coupon.amount,
          active_from: coupon.active_from,
          expire_at: coupon.expire_at,
          created_at: coupon.created_at,
          updated_at: coupon.updated_at,
          deleted_at: coupon.deleted_at,
          is_valid: coupon.is_valid,
        },
      };
}
export const getSingleCouponFromJson = (coupon) => {
  return {
    id: coupon.id,
    code: coupon.code,
    language: "en",
    description: coupon.description,
    image: {
      id: 933,
      original: `${backend}/storage/img/${coupon.image}`,
      thumbnail: `${backend}/storage/img/${coupon.image}`
    },
    type: coupon.type,
    amount: coupon.amount,
    active_from: coupon.active_from,
    expire_at: coupon.expire_at,
    created_at: coupon.created_at,
    updated_at: coupon.updated_at,
    deleted_at: coupon.deleted_at,
    is_valid: coupon.is_valid,
    translated_languages: [
      "en"
    ]
  };
}