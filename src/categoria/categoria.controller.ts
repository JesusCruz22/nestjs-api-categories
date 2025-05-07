import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';

@Controller('categoria')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findOneById(id);
    }

    @Get()
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }
}
