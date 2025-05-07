import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Categorías')
@Controller('categoria')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una categoría por ID' })
    @ApiParam({ name: 'id', description: 'ID de la categoría', required: true, type: Number })
    @ApiResponse({ status: 200, description: 'Categoría obtenida exitosamente', type: Categoria })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    findOneById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findOneById(id);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las categorías' })
    @ApiResponse({ status: 200, description: 'Categorías obtenidas exitosamente', type: [Categoria] })
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }
}
