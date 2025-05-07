import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

    async findOneById(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOneBy({ id });
        if (!categoria) {
            throw new NotFoundException(`Categoria no encontrada`);
        }
        return categoria;
    }

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find();
    }

    async onModuleInit(): Promise<void> {
        const count = await this.categoriaRepository.count();
        if (count === 0) {
            const categorias = [
                { nombre: 'Neumáticos' },
                { nombre: 'Chasis' },
                { nombre: 'Motor' },
                { nombre: 'Accesorios' },
            ];
            await this.categoriaRepository.insert(categorias);
            console.log('✔️ Categorias pre-cargadas');
        }
    }
}
