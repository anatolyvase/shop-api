import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [DatabaseModule],
  exports: [ProductsService]
})
export class ProductsModule {}
