import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from './prisma.service';
export interface Pedido {
  id: number;
  nome: string;
  itens: any;
  status: 'PREPARANDO' | 'PRONTO' | 'ENTREGUE';
}

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) { }

  async create(createPedidoDto: CreatePedidoDto) {
    const valores = Object.values(createPedidoDto.itens);
    const totalItens = valores.reduce((acc, curr) => acc + Number(curr), 0);
    if (totalItens <= 0) {
      throw new BadRequestException('O pedido não pode estar vazio.');
    }
    return this.prisma.pedido.create({
      data: {
        nome: createPedidoDto.nome,
        itens: createPedidoDto.itens as any,
        status: 'PREPARANDO',
      },
    });
  }

  async findAll() {
    return this.prisma.pedido.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async update(id: number, updatePedidoDto: any) {
    return this.prisma.pedido.update({
      where: { id },
      data: {
        ...updatePedidoDto,
        itens: updatePedidoDto.itens ? (updatePedidoDto.itens as any) : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}