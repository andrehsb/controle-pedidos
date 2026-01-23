import { Module } from '@nestjs/common';
import { PedidosController } from './app.controller';
import { PedidosService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [PedidosController],
  providers: [PedidosService, PrismaService],
})
export class AppModule {}
