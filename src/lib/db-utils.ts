import { connectToDatabase } from './mongodb';
import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

/**
 * Clase base para operaciones CRUD en MongoDB
 */
export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * Crear un nuevo documento
   * @param data Datos para crear el documento
   */
  async create(data: Record<string, unknown>): Promise<T> {
    await connectToDatabase();
    return this.model.create(data);
  }

  /**
   * Encontrar un documento por ID
   * @param id ID del documento
   */
  async findById(id: string): Promise<any> {
    await connectToDatabase();
    return this.model.findById(id).lean();
  }

  /**
   * Encontrar documentos por filtro
   * @param filter Filtro para la búsqueda
   * @param options Opciones de la consulta
   */
  async find(
    filter: FilterQuery<T> = {},
    options: QueryOptions = {}
  ): Promise<any[]> {
    await connectToDatabase();
    return this.model.find(filter, null, options).lean();
  }

  /**
   * Encontrar un documento por filtro
   * @param filter Filtro para la búsqueda
   */
  async findOne(filter: FilterQuery<T>): Promise<any> {
    await connectToDatabase();
    return this.model.findOne(filter).lean();
  }

  /**
   * Actualizar un documento por ID
   * @param id ID del documento
   * @param update Datos para actualizar
   */
  async updateById(id: string, update: UpdateQuery<T>): Promise<any> {
    await connectToDatabase();
    return this.model
      .findByIdAndUpdate(id, update, { new: true })
      .lean();
  }

  /**
   * Actualizar documentos por filtro
   * @param filter Filtro para la actualización
   * @param update Datos para actualizar
   */
  async updateMany(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<{ matchedCount: number; modifiedCount: number }> {
    await connectToDatabase();
    const result = await this.model.updateMany(filter, update);
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    };
  }

  /**
   * Eliminar un documento por ID
   * @param id ID del documento
   */
  async deleteById(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Eliminar documentos por filtro
   * @param filter Filtro para la eliminación
   */
  async deleteMany(filter: FilterQuery<T>): Promise<number> {
    await connectToDatabase();
    const result = await this.model.deleteMany(filter);
    return result.deletedCount || 0;
  }

  /**
   * Contar documentos por filtro
   * @param filter Filtro para el conteo
   */
  async count(filter: FilterQuery<T> = {}): Promise<number> {
    await connectToDatabase();
    return this.model.countDocuments(filter);
  }
} 