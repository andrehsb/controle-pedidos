import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreatePedidoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  // Valida se é um objeto (Ex: { "CA": 2, "FB": 1 })
  @IsObject()
  itens: Record<string, number>;
}