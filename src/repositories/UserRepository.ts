import { BaseRepository } from '@/lib/db-utils';
import User, { IUser } from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';
import { Types } from 'mongoose';

// Definir interfaces para los tipos de retorno
interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any; // Para otros campos que puedan existir
}

/**
 * Repositorio para operaciones CRUD de usuarios
 */
class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  /**
   * Buscar un usuario por email
   * @param email Email del usuario
   */
  async findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email });
  }

  /**
   * Verificar si un email ya está registrado
   * @param email Email a verificar
   */
  async isEmailRegistered(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }

  /**
   * Crear un nuevo usuario
   * @param userData Datos del usuario
   */
  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserResponse> {
    await connectToDatabase();
    const user = await this.create(userData);
    
    // Convertir a objeto para manipularlo
    const userObject = user.toObject ? user.toObject() : user;
    
    // Añadir id como string
    return {
      ...userObject,
      id: userObject._id.toString()
    };
  }

  /**
   * Autenticar un usuario
   * @param email Email del usuario
   * @param password Contraseña del usuario
   */
  async authenticate(email: string, password: string): Promise<UserResponse | null> {
    // Asegurar conexión a la base de datos
    await connectToDatabase();
    
    // Buscar el usuario por email (sin usar lean() para poder acceder a los métodos)
    const user = await User.findOne({ email });
    
    if (!user) return null;
    
    // Verificar la contraseña usando el método del modelo
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return null;

    // Convertir a objeto plano para eliminar la contraseña
    const userObject = user.toObject();
    
    // Extraer la contraseña y devolver el resto del objeto
    const { password: _, ...userWithoutPassword } = userObject;
    
    // Convertir _id a string para que sea más fácil de usar en el frontend
    return {
      ...userWithoutPassword,
      id: (userWithoutPassword._id as Types.ObjectId).toString()
    };
  }
}

// Exportar una instancia del repositorio
export const userRepository = new UserRepository();

// Exportar la clase para poder extenderla si es necesario
export default UserRepository; 