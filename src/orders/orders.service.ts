import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {DatabaseService} from "../database/database.service";
import {ProductsService} from "../products/products.service";

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService, private readonly productService: ProductsService) {}

  async create(createOrderDto: CreateOrderDto) {
    if (!createOrderDto) {
      throw new BadRequestException()
    }

    const products = await this.productService.findManyByIds(createOrderDto.productIds)

    if (products.length === 0) {
      throw new BadRequestException()
    }

    const order = await this.db.order.create({
      data: {
        name: createOrderDto.name,
        phone: createOrderDto.phone,
      },
    })

    await this.db.orderProducts.createMany({
      data: products.map(product => ({
        productId: product.id,
        orderId: order.id,
        quantity: 1
      })),
    });

    return order;
  }

  async findAll() {
    const orders = await this.db.order.findMany({
      include: {
        OrderProducts: {
          include: {
            product: true
          }
        }
      }
    });

    return orders.flatMap(({OrderProducts, ...order}) => {
      return {
        ...order,
        products: OrderProducts.map(({product}) =>
          product
        )
      }
    })
  }
}
