import { Injectable } from '@nestjs/common';
import { List } from '@prisma/client';
import { PrismaService } from 'src/core/prisma.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create(createListDto: CreateListDto): Promise<List> {
    const list = await this.prisma.list.create({
      data: createListDto,
    });
    return list;
  }

  async findAll(): Promise<List[]> {
    return await this.prisma.list.findMany();
  }

  async findOne(id: number): Promise<List | null> {
    return await this.prisma.list.findUnique({ where: { id } });
  }

  async update(id: number, updateListDto: UpdateListDto): Promise<List> {
    const list = await this.prisma.list.update({
      where: {
        id,
      },
      data: updateListDto,
    });

    return list;
  }

  async remove(id: number): Promise<List> {
    const list = await this.prisma.list.delete({
      where: {
        id,
      },
    });

    return list;
  }
}
