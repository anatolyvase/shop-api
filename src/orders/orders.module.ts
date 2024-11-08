import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {DatabaseModule} from "../database/database.module";
import {ProductsModule} from "../products/products.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [DatabaseModule, ProductsModule]
})
export class OrdersModule {}
