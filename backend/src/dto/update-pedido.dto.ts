import { IsString, IsObject, IsOptional, IsIn } from 'class-validator';

export class UpdatePedidoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsObject()
  itens?: Record<string, number>;

  @IsOptional()
  @IsIn(['PREPARANDO', 'PRONTO', 'ENTREGUE'], {
    message: 'Status deve ser: PREPARANDO, PRONTO ou ENTREGUE',
  })
  status?: 'PREPARANDO' | 'PRONTO' | 'ENTREGUE';
}