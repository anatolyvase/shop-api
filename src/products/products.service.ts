import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {DatabaseService} from "../database/database.service";

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {
  }

  async create(createProductDto: CreateProductDto) {
    if (!createProductDto) {
      throw new BadRequestException();
    }
    try {
      return this.db.product.create({
        data: createProductDto,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return this.db.product.findMany();
  }

  async findManyByIds(ids: number[]) {
    return this.db.product.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    })
  }

  async findOne(id: number) {
    const product = this.db.product.findUnique({
      where: {
        id
      }
    });
  }
}
