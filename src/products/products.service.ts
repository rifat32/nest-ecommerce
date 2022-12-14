import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { paginate } from 'src/common/pagination/paginate';
import productsJson from '@db/products.json';
import Fuse from 'fuse.js';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'mysql2';
import { DataSource, Repository } from 'typeorm';
import { PRODUCT } from './entities/bd-product.entity';
import {  getSingleProductDetails } from './single-product';

const products = plainToClass(Product, productsJson);

const options = {
  keys: [
    'name',
    'type.slug',
    'categories.slug',
    'status',
    'shop_id',
    'author.slug',
    'tags',
    'manufacturer.slug',
  ],
  threshold: 0.3,
};
const fuse = new Fuse(products, options);

@Injectable()
export class ProductsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  
    ) {}




  private products: any = products;

  create(createProductDto: CreateProductDto) {
    return this.products[0];
  }

  async getProducts({ limit, page, search }: GetProductsDto): Promise<ProductPaginator> {

    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Product[] = this.products;
    let queryResult:any;
    
    if (search) {
    

      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }
// console.log(searchText[1]?.name,'ddd')
      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
// console.log(searchText)
        let nameSearch = "";
        let categorySearch = "";
        let brandSearch = "";
        searchText.map(el => {
          if(el.name){
            nameSearch  = `AND (products.name LIKE ${`'%${el.name}%'`})`
          }
          // console.log("search......",el["categories.slug"])
          if(el["brands"]){
            brandSearch  = ` 
            AND (
              products.brand_id = ${el["brands"]}
              
            )
            `
          }
          if(el["categories.slug"]){
            categorySearch  = ` 
            AND (
              products.category_id = ${el["categories.slug"]}
              OR
              products.sub_category_id = ${el["categories.slug"]}
            )
            `
          }
          console.log(el)
          
        })
      
        
     let rawQuery = `
     SELECT 
     products.id as product_id,
     products.name as product_name,
     products.image,
     products.product_description,
     variations.id as variation_id,
     VLD.qty_available,
     variations.sell_price_inc_tax,
     c.name as category_name,
     c.id as category_id
     FROM
     products 
     inner join 
     variations on products.id = variations.product_id
     left join 
     variation_location_details as VLD 
     on 
     variations.id = VLD.variation_id
     left join 
     categories as c 
     on 
     products.category_id = c.id
     left join 
     brands as b
     on 
     products.brand_id = b.id
     
     where (
      products.business_id = 9 
      AND 
      products.category_id != 30
      AND
      products.type != 'modifier'
      AND
      VLD.qty_available != 0
      AND
      products.deleted_at IS NULL
      )
     ${nameSearch}
     ${categorySearch}
     ${brandSearch}
     ORDER BY products.id DESC
     ;`
    //  console.log(rawQuery)
     queryResult = await  this.connection.query(rawQuery);

// console.log(rawQuery)
// console.log(searchText)

    } else {

      queryResult = await  this.connection.query(`
      SELECT 
      products.id as product_id,
      products.name as product_name,
      products.image,
      products.product_description,
      variations.id as variation_id,
      VLD.qty_available,
      variations.sell_price_inc_tax,
      c.name as category_name,
      c.id as category_id
      FROM
      products 
      inner join 
      variations on products.id = variations.product_id
      left join 
      variation_location_details as VLD 
      on 
      variations.id = VLD.variation_id
      left join 
      categories as c 
      on 
      products.category_id = c.id
      where (
        products.business_id = 9 
        AND 
        products.category_id != 30
        AND
        products.type != 'modifier'
        AND
        VLD.qty_available != 0
        AND
        products.deleted_at IS NULL
        )
        ORDER BY products.id DESC
      ;`);



    }

    // const results = data.slice(startIndex, endIndex);
    // const url = `/products?search=${search}&limit=${limit}`;
    const pet_products = [];
    queryResult.map((el:any) => {
    pet_products.push(
      getSingleProductDetails(
      el.variation_id,
      el.product_name,
      el.image,
      el.sell_price_inc_tax,
      el.product_description,
      el.qty_available,
      [],
      queryResult[0].category_name,
      queryResult[0].category_id
    )
    )
    })
    const results = pet_products.slice(startIndex, endIndex);
    const url = `/products?search=${search}&limit=${limit}`;
    // "select `products`.`id` as `product_id`, `products`.`name`, `products`.`type`, `products`.`enable_stock`, `variations`.`id` as `variation_id`, `variations`.`name` as `variation`, `VLD`.`qty_available`, `variations`.`sell_price_inc_tax` as `selling_price`, `variations`.`sub_sku` from `products` inner join `variations` on `products`.`id` = `variations`.`product_id` left join `variation_location_details` as `VLD` on `variations`.`id` = `VLD`.`variation_id` where `products`.`business_id` = ? and `products`.`type` != ? and `products`.`deleted_at` is null order by `VLD`.`qty_available` desc"
  // console.log(test);
 
    return {
      data: results,
      // ...paginate(data.length, page, limit, results.length, url),
      ...paginate(pet_products.length, page, limit, results.length, url),
    };
  }

  async getProductBySlug(slug: string): Promise<any>{
    
   let queryResult = await  this.connection.query(`
    SELECT 
    products.id as product_id,
    products.name as product_name,
    products.image,
    products.product_description,
    variations.id as variation_id,
    variations.sell_price_inc_tax,
    VLD.qty_available,
    c.name as category_name,
    c.id as category_id

    FROM
    products 

    inner join 
    variations on
    products.id = variations.product_id

    left join 
    variation_location_details as VLD 
    on 
    variations.id = VLD.variation_id

    left join 
    categories as c 
    on 
    products.category_id = c.id



     
    where (
      products.business_id = 9 
      AND 
      products.category_id != 30
      AND
      products.type != 'modifier'
      AND
      products.deleted_at IS NULL

      )
      AND  
      variations.id = ${slug}
    ;`);
    let imageQueryResult = await  this.connection.query(`
    SELECT 
    id,
    file	
    FROM
    product_images
    where (
      product_images.product_id = ${queryResult[0].product_id}
      )
    ;`);
    let queryRelatedProductResult:any = await  this.connection.query(`
    SELECT 
    products.id as product_id,
    products.name as product_name,
    products.image,
    products.product_description,
    variations.id as variation_id,
    variations.sell_price_inc_tax,
    VLD.qty_available,
    c.name as category_name,
    c.id as category_id

    FROM
    products 

    inner join 
    variations on
    products.id = variations.product_id

    left join 
    variation_location_details as VLD 
    on 
    variations.id = VLD.variation_id

    left join 
    categories as c 
    on 
    products.category_id = c.id



     
    where (
      products.business_id = 9 
      AND
      products.type != 'modifier'
      AND
      products.deleted_at IS NULL
      )
      AND (
        products.category_id = ${queryResult[0].category_id}
      )
      ORDER BY products.id DESC
      LIMIT 20
      
    ;`);

   const product2 =  getSingleProductDetails(
    queryResult[0].variation_id,
    queryResult[0].product_name,
    queryResult[0].image,
    queryResult[0].sell_price_inc_tax,
    queryResult[0].product_description,
    queryResult[0].qty_available,
    imageQueryResult,
    queryResult[0].category_name,
    queryResult[0].category_id
    )
    const product = this.products.find((p) => p.slug === "baby-spinach");

    const pet_releted_products = [];
    queryRelatedProductResult.map((el:any) => {
      pet_releted_products.push(
      getSingleProductDetails(
      el.variation_id,
      el.product_name,
      el.image,
      el.sell_price_inc_tax,
      el.product_description,
      el.qty_available,
      [],
      queryResult[0].category_name,
      queryResult[0].category_id
    )
    )
    })

    // const related_products = pet_releted_products
    //   .slice(0, 20);
    return {
      ...product2,
      related_products:pet_releted_products,
    };
  }

  getPopularProducts({ limit, type_slug }: GetPopularProductsDto): Product[] {
    let data: any = this.products;
    if (type_slug) {
      data = fuse.search(type_slug)?.map(({ item }) => item);
    }
    return data?.slice(0, limit);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.products[0];
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
