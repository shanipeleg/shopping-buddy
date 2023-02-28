import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/core/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = await this.prisma.item.create({
      data: createItemDto,
    });
    return item;
  }

  async findAll(): Promise<Item[]> {
    return await this.prisma.item.findMany({ include: { list: true } });
  }

  async findOne(id: number): Promise<Item | null> {
    return await this.prisma.item.findUnique({ where: { id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.prisma.item.update({
      where: {
        id,
      },
      data: updateItemDto,
    });

    return item;
  }

  async remove(id: number): Promise<Item> {
    const item = await this.prisma.item.delete({
      where: {
        id,
      },
    });

    return item;
  }
}
