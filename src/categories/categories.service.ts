import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import Fuse from 'fuse.js';
import categoriesJson from '@db/categories.json';
import { paginate } from 'src/common/pagination/paginate';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'mysql2';
import { getSingleCategory } from './single-category';

const categories = plainToClass(Category, categoriesJson);
const options = {
  keys: ['name', 'type.slug'],
  threshold: 0.3,
};
const fuse = new Fuse(categories, options);

@Injectable()
export class CategoriesService {

  constructor(
    @InjectConnection() private readonly connection: Connection,
  
    ) {}

  private categories: Category[] = categories;

  create(createCategoryDto: CreateCategoryDto) {
    return this.categories[0];
  }

  async getCategories({ limit, page, search, parent }: GetCategoriesDto) {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Category[] = this.categories;
    let queryResult:any;
    let nameNullParent = "";
   
    
    
    if (parent === 'null') {
      nameNullParent =  `AND (categories.parent_id = 0)`
      // data = data.filter((item) => item.parent === null);
    }
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // data = data.filter((item) => item[key] === value);
        data = fuse.search(value)?.map(({ item }) => item);
      }
      queryResult = await  this.connection.query(`
      SELECT 
      categories.id as category_id,
      categories.name as category_name
     
      FROM
      categories 
      where (
        categories.business_id = 9 
        AND 
        categories.id != 30
       
        AND
        categories.deleted_at IS NULL
  
        )
        ${nameNullParent}
      ;`);
  
    }
    else {
      queryResult = await  this.connection.query(`
      SELECT 
      categories.id as category_id,
      categories.name as category_name
     
      FROM
      categories 
      where (
        categories.business_id = 9 
        AND 
        categories.id != 30
       
        AND
        categories.deleted_at IS NULL
  
        )
        ${nameNullParent}  
      ;`);
      }
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }
  

  
    const pet_categories = [];
    
    for(let i =0; i< queryResult.length; i++) {
      const child =  await this.getChildren(queryResult[i].category_id)
      pet_categories.push(
        getSingleCategory(
          queryResult[i].category_id,
          queryResult[i].category_name,
          child
      )
      )
    }

   
    const results = pet_categories.slice(startIndex, endIndex);
    // const results = data.slice(startIndex, endIndex);
    const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

 async getChildren(id) {
     let  childrenQueryResult =  await this.connection.query(`
    SELECT 
    categories.id as category_id,
    categories.name as category_name
   
    FROM
    categories 
    where (
      categories.business_id = 9 
      AND 
      categories.id != 30
     
      AND
      categories.deleted_at IS NULL
 
      )
   AND (categories.parent_id = ${id})
    ;`);
    return childrenQueryResult
  }

  getCategory(param: string, language: string): Category {
    return this.categories.find(
      (p) => p.id === Number(param) || p.slug === param,
    );
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categories[0];
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
