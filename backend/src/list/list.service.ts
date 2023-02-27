import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

@Injectable()
export class ListService {
  async create(createListDto: CreateListDto) {
    const list = await prisma.list.create({
      data: createListDto
    });
    return list;
  }

  async findAll() {
    return await prisma.list.findMany();
  }

  async findOne(id: number) {
    return await prisma.list.findUnique({ where: { id } });
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await prisma.list.update({
      where: {
        id
      },
      data: updateListDto
    });

    return list;
  }

  async remove(id: number) {
    const list = await prisma.list.delete({
      where: {
        id
      }
    });

    return list;
  }
}
