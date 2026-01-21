import { Module } from '@nestjs/common';
import { PedidosController } from './app.controller';
import { PedidosService } from './app.service';

@Module({
  imports: [],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class AppModule {}
