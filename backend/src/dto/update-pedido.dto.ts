import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsIn, IsOptional } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
  
  @IsOptional()
  @IsIn(['PREPARANDO', 'PRONTO', 'ENTREGUE'], { 
    message: 'Status inválido. Use: PREPARANDO, PRONTO ou ENTREGUE' 
  })
  status?: 'PREPARANDO' | 'PRONTO' | 'ENTREGUE';
}