import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto'; // Verifique se o caminho está certo
import { UpdatePedidoDto } from './dto/update-pedido.dto'; // Verifique se o caminho está certo

// Definindo o tipo aqui para não depender do Prisma por enquanto
export interface Pedido {
  id: number;
  nome: string;
  itens: any;
  status: 'PREPARANDO' | 'PRONTO' | 'ENTREGUE';
}

@Injectable()
export class PedidosService {
  // ESSA É A MEMÓRIA DO SERVIDOR
  private pedidos: Pedido[] = []; 

  create(createPedidoDto: CreatePedidoDto) {
    const novoPedido: Pedido = {
      id: Date.now(),
      nome: createPedidoDto.nome,
      itens: createPedidoDto.itens || {}, // Garante que itens venha do DTO
      status: 'PREPARANDO',
    };
    this.pedidos.push(novoPedido);
    return novoPedido;
  }

  findAll() {
    return this.pedidos;
  }

  updateStatus(id: number, status: 'PREPARANDO' | 'PRONTO' | 'ENTREGUE') {
    const pedidoIndex = this.pedidos.findIndex((p) => p.id == id); 
    if (pedidoIndex > -1) {
      this.pedidos[pedidoIndex].status = status;
      return this.pedidos[pedidoIndex];
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