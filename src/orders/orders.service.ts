import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import ordersJson from '@db/orders.json';
import orderStatusJson from '@db/order-statuses.json';
import exportOrderJson from '@db/order-export.json';
import orderInvoiceJson from '@db/order-invoice.json';
import orderFilesJson from '@db/order-files.json';
import { plainToClass } from 'class-transformer';
import { Order, OrderFiles } from './entities/order.entity';
import { OrderStatus } from './entities/order-status.entity';
import { paginate } from 'src/common/pagination/paginate';
import {
  GetOrderStatusesDto,
  OrderStatusPaginator,
} from './dto/get-order-statuses.dto';
import {
  CheckoutVerificationDto,
  VerifiedCheckoutData,
} from './dto/verify-checkout.dto';
import {
  CreateOrderStatusDto,
  UpdateOrderStatusDto,
} from './dto/create-order-status.dto';
import { GetOrderFilesDto } from './dto/get-downloads.dto';
import Fuse from 'fuse.js';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'mysql2';
import { getOrderByCodeQuery, getOrderDetailsQuery, getOrderQuery, getOrdersByUserIdQuery, insertOrderDetailsQuery, insertOrderQuery } from './queries/orderQuery';
import { getSingleOrder, getSingleOrderDetails, getSingleOrderDetailsInDashboard } from './data_mapper';
import { getCouponByCodeQuery, getCouponByIdQuery } from 'src/coupons/queries/couponQuery';
import { getSingleCoupon } from 'src/coupons/data-mapper';

const orders = plainToClass(Order, ordersJson);
const orderStatus = plainToClass(OrderStatus, orderStatusJson);

const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(orderStatus, options);

const orderFiles = plainToClass(OrderFiles, orderFilesJson);

@Injectable()
export class OrdersService {
  private orders: Order[] = orders;
  private orderStatus: OrderStatus[] = orderStatus;
  private orderFiles: OrderFiles[] = orderFiles;

  constructor(
    @InjectConnection() private readonly connection: Connection,

  ) { }




  async create(createOrderInput: CreateOrderDto,req) {
    let user = req.user?req.user:null;

    // get coupon
    let getCouponByIdQueryString = getCouponByIdQuery(createOrderInput.coupon_id,req.user)
    let getCouponByIdQueryQueryResult: any = await this.connection.query(getCouponByIdQueryString);
    let coupon = null;




   




if(getCouponByIdQueryQueryResult.length){
  coupon = getSingleCoupon(getCouponByIdQueryQueryResult[0]);
} 
 console.log("createOrderInput.coupon_id",createOrderInput.coupon_id)
    console.log("getCouponByIdQueryQueryResult[0]",coupon)
 // end get coupon

//  insert order
    let insertOrderQueryString = insertOrderQuery(createOrderInput,user,coupon)
     console.log("query........",insertOrderQueryString)
    let insertOrderQueryResult: any = await this.connection.query(insertOrderQueryString);
    let orderId = insertOrderQueryResult.insertId

    for (let i = 0; i < createOrderInput.products.length; i++) {
      let insertOrderDetailsQueryString = insertOrderDetailsQuery(createOrderInput, orderId, createOrderInput.products[i])
      let insertOrderDetailsQueryResult: any = await this.connection.query(insertOrderDetailsQueryString);
    }
//  end insert order 
//   get order 
    let getOrderQueryString = getOrderQuery(orderId);

    let orderPos: any = await this.connection.query(getOrderQueryString);
  //  end get order 
    // console.log("orderPos",orderPos)
    let order = getSingleOrder(orderPos[0])


    return order;
  }
  async createGuest(createOrderInput: CreateOrderDto,req) {
    let user = req.user?req.user:null;

    // get coupon
    let getCouponByIdQueryString = getCouponByIdQuery(createOrderInput.coupon_id,req.user)
    let getCouponByIdQueryQueryResult: any = await this.connection.query(getCouponByIdQueryString);
    let coupon = null;




   




if(getCouponByIdQueryQueryResult.length){
  coupon = getSingleCoupon(getCouponByIdQueryQueryResult[0]);
} 
 console.log("createOrderInput.coupon_id",createOrderInput.coupon_id)
    console.log("getCouponByIdQueryQueryResult[0]",coupon)
 // end get coupon

//  insert order
    let insertOrderQueryString = insertOrderQuery(createOrderInput,user,coupon)
     console.log("query........",insertOrderQueryString)
    let insertOrderQueryResult: any = await this.connection.query(insertOrderQueryString);
    let orderId = insertOrderQueryResult.insertId

    for (let i = 0; i < createOrderInput.products.length; i++) {
      let insertOrderDetailsQueryString = insertOrderDetailsQuery(createOrderInput, orderId, createOrderInput.products[i])
      let insertOrderDetailsQueryResult: any = await this.connection.query(insertOrderDetailsQueryString);
    }
//  end insert order 
//   get order 
    let getOrderQueryString = getOrderQuery(orderId);

    let orderPos: any = await this.connection.query(getOrderQueryString);
  //  end get order 
    // console.log("orderPos",orderPos)
    let order = getSingleOrder(orderPos[0])


    return order;
  }


 async getOrders({
    limit,
    page,
    customer_id,
    tracking_number,
    search,
    shop_id,
    
  }: GetOrdersDto,req){





    if (!page) page = 1;
    if (!limit) limit = 15;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // let data: Order[] = this.orders;

    // if (shop_id && shop_id !== 'undefined') {
    //   data = this.orders?.filter((p) => p?.shop?.id === Number(shop_id));
    // }

    const data = [];
    // get orders
    let getOrdersByUserIdQueryString = getOrdersByUserIdQuery(req.user)
    let orderPosList: any = await this.connection.query(getOrdersByUserIdQueryString);
    // get order details for all
 for(let i =0; i<orderPosList.length; i++) {
  let getOrderDetailsQueryString = getOrderDetailsQuery(orderPosList[i].id);
  let orderPosDetails: any = await this.connection.query(getOrderDetailsQueryString);
  let order = getSingleOrderDetailsInDashboard(orderPosList[i], orderPosDetails,this.orderStatus);
  data.push(order)
 }


    console.log("orders query",getOrdersByUserIdQueryString)
    // console.log("orders",getOrdersByUserIdQueryResult)

    const results = data.slice(startIndex, endIndex);
    const url = `/orders?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getOrderById(id: string) {
    let getOrderQueryString = getOrderByCodeQuery(id);

    let orderPos: any = await this.connection.query(getOrderQueryString);
    let getOrderDetailsQueryString = getOrderDetailsQuery(orderPos[0].id);
    let orderPosDetails: any = await this.connection.query(getOrderDetailsQueryString);



    let order = getSingleOrderDetails(orderPos[0], orderPosDetails,this.orderStatus)
    return order;
    return this.orders.find(
      (p) => p.id === Number(id) || p.tracking_number === id,
    );
  }

  getOrderByTrackingNumber(tracking_number: string): Order {
    console.log('t', tracking_number);
    const parentOrder = this.orders.find(
      (p) => p.tracking_number === tracking_number,
    );
    console.log("ffffffff");
    if (!parentOrder) {
      return this.orders[0];
    }
    return parentOrder;
  }

  getOrderStatuses({
    limit,
    page,
    search,
    orderBy,
  }: GetOrderStatusesDto): OrderStatusPaginator {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: OrderStatus[] = this.orderStatus;

    // if (shop_id) {
    //   data = this.orders?.filter((p) => p?.shop?.id === shop_id);
    // }

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

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/order-status?search=${search}&limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getOrderStatus(param: string, language: string) {
    return this.orderStatus.find((p) => p.slug === param);
  }

  update(id: number, updateOrderInput: UpdateOrderDto) {
    console.log("ffffffff");
    return this.orders[0];
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  verifyCheckout(input: CheckoutVerificationDto): VerifiedCheckoutData {
    return {
      total_tax: 0,
      shipping_charge: 0,
      unavailable_products: [],
      wallet_currency: 0,
      wallet_amount: 0,
    };
  }

  createOrderStatus(createOrderStatusInput: CreateOrderStatusDto) {
    return this.orderStatus[0];
  }

  updateOrderStatus(updateOrderStatusInput: UpdateOrderStatusDto) {
    return this.orderStatus[0];
  }

  async getOrderFileItems({ page, limit }: GetOrderFilesDto) {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = orderFiles.slice(startIndex, endIndex);

    const url = `/downloads?&limit=${limit}`;
    return {
      data: results,
      ...paginate(orderFiles.length, page, limit, results.length, url),
    };
  }

  async getDigitalFileDownloadUrl(digitalFileId: number) {
    const item: OrderFiles = this.orderFiles.find(
      (singleItem) => singleItem.digital_file_id === digitalFileId,
    );

    return item.file.url;
  }

  async exportOrder(shop_id: string) {
    return exportOrderJson.url;
  }

  async downloadInvoiceUrl(shop_id: string) {
    return orderInvoiceJson[0].url;
  }
}
