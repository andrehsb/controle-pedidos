import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto'; 
import { UpdatePedidoDto } from './dto/update-pedido.dto'; 
export interface Pedido {
  id: number;
  nome: string;
  itens: any;
  status: 'PREPARANDO' | 'PRONTO' | 'ENTREGUE';
}

@Injectable()
export class PedidosService {
  private pedidos: Pedido[] = []; 

  create(createPedidoDto: CreatePedidoDto) {
    const novoPedido: Pedido = {
      id: Date.now(),
      nome: createPedidoDto.nome,
      itens: createPedidoDto.itens || {},
      status: 'PREPARANDO',
    };
    this.pedidos.push(novoPedido);
    return novoPedido;
  }

  findAll() {
    return this.pedidos;
  }

  update(id: number, updatePedidoDto: any) {
    const index = this.pedidos.findIndex((p) => p.id == id);
    if (index > -1) {
      this.pedidos[index] = {
        ...this.pedidos[index],
        ...updatePedidoDto,
      };
      return this.pedidos[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.pedidos.findIndex((p) => p.id == id);
    if (index > -1) {
      const removido = this.pedidos[index];
      this.pedidos.splice(index, 1);
      return removido;
    }
  }
}