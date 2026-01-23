import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, HttpCode } from '@nestjs/common';
import { PedidosService } from './app.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) { }

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    console.log('Criando pedido:', createPedidoDto);
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }

  @Post('login')
  @HttpCode(200) // Retorna status 200 (OK) em vez de 201 (Created)
  login(@Body() body: { pin: string }) {
    // Pega a senha do arquivo .env
    const senhaCorreta = process.env.ADMIN_PIN;

    // Compara a senha enviada com a do sistema
    if (body.pin === senhaCorreta) {
      return {
        sucesso: true,
        mensagem: 'Acesso permitido',
        token: 'token-falso-de-seguranca-basica'
      };
    } else {
      // Se errar, joga um erro 401 (Não Autorizado)
      throw new UnauthorizedException('PIN Incorreto');
    }
  }
}