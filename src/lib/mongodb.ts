import mongoose from 'mongoose';

// Caché de conexión
let cachedConnection: typeof mongoose | null = null;

/**
 * Función para conectar a MongoDB
 * Reutiliza la conexión existente si ya está establecida
 */
export async function connectToDatabase() {
  // Si ya tenemos una conexión, la devolvemos
  if (cachedConnection) {
    return cachedConnection;
  }

  // Verificamos que la URI de MongoDB esté definida
  if (!process.env.MONGODB_URI) {
    throw new Error('Por favor define la variable de entorno MONGODB_URI');
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    
    console.log('Conexión a MongoDB establecida');
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    throw error;
  }
}

/**
 * Función para desconectar de MongoDB
 * Útil para pruebas y entornos de desarrollo
 */
export async function disconnectFromDatabase() {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('Desconexión de MongoDB completada');
  }
}

// Exportamos mongoose para usar en modelos
export { mongoose }; 