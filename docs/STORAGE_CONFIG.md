# Configuración de Almacenamiento - MongoDB

Este proyecto utiliza MongoDB como sistema de almacenamiento para las cuentas de redes sociales.

## Configuración de MongoDB

### Variables de Entorno Requeridas

Añade las siguientes variables a tu archivo `.env`:

```env
# Base de datos MongoDB (requerido)
MONGODB_URI=mongodb://localhost:27017/camaleonic

# O para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/camaleonic

# JWT Secret (requerido)
JWT_SECRET=tu_jwt_secret_super_seguro_aqui

# Configuración del entorno
NODE_ENV=development

# URLs de MockAPI (para métricas y contenido)
MOCKAPI_BASE_URL=https://6867f54bd5933161d70a66fe.mockapi.io/api/v1
```

### Opciones de MongoDB

#### 1. MongoDB Local
```env
MONGODB_URI=mongodb://localhost:27017/camaleonic
```

**Requisitos:**
- MongoDB instalado localmente
- Servicio MongoDB ejecutándose

**Instalación MongoDB:**
```bash
# macOS (con Homebrew)
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Windows
# Descargar desde https://www.mongodb.com/try/download/community
```

#### 2. MongoDB Atlas (Recomendado para producción)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/camaleonic
```

**Ventajas:**
- ✅ Servicio en la nube administrado
- ✅ Escalabilidad automática
- ✅ Backups automáticos
- ✅ Monitoreo integrado
- ✅ Sin configuración de servidor

**Configuración:**
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un cluster gratuito
3. Configurar usuario y contraseña
4. Obtener string de conexión
5. Agregar IP a whitelist

## Estructura de Datos

### Esquema de Account
```javascript
{
  _id: ObjectId,
  platform: String, // 'Instagram' | 'Facebook' | 'X' | 'TikTok' | 'LinkedIn' | 'YouTube'
  username: String,
  displayName: String,
  followers: Number,
  following: Number,
  posts: Number,
  verified: Boolean,
  category: String,
  connectedDate: Date,
  isActive: Boolean,
  userId: ObjectId, // Referencia al usuario autenticado
  createdAt: Date,
  updatedAt: Date
}
```

### Índices Optimizados
- `userId`: Para consultas por usuario
- `platform + userId`: Para filtrar por plataforma
- `username + platform`: Único, previene duplicados

## Funcionalidades

### Operaciones CRUD
- ✅ **Crear** cuentas con validación completa
- ✅ **Leer** cuentas por usuario y plataforma
- ✅ **Actualizar** cuentas con validación de duplicados
- ✅ **Eliminar** cuentas de forma segura

### Características Avanzadas
- ✅ **Validación de esquema** con Mongoose
- ✅ **Prevención de duplicados** (username + plataforma)
- ✅ **Relaciones con usuarios** autenticados
- ✅ **Índices optimizados** para consultas rápidas
- ✅ **Datos de prueba automáticos**
- ✅ **Timestamps automáticos** (createdAt, updatedAt)

## Datos de Prueba

El sistema crea automáticamente 6 cuentas de ejemplo la primera vez que un usuario accede a la sección de cuentas:

| Plataforma | Username | Nombre | Seguidores | Verificado |
|------------|----------|---------|------------|------------|
| Instagram | @mi_cuenta_ig | Mi Marca Personal | 13,100 | ✅ |
| Facebook | MiPaginaFB | Mi Página Facebook | 8,480 | ❌ |
| X (Twitter) | @micuenta | Mi Cuenta X | 5,890 | ❌ |
| TikTok | @mitiktok | Mi TikTok | 19,800 | ✅ |
| LinkedIn | mi-perfil-linkedin | Mi Perfil LinkedIn | 3,650 | ✅ |
| YouTube | MiCanalYT | Mi Canal YouTube | 8,350 | ❌ |

## Arquitectura de Archivos

```
src/
├── models/Account.ts                   # Modelo de Mongoose
├── repositories/AccountRepository.ts   # Operaciones CRUD
├── app/api/accounts/                   # Endpoints de la API
│   ├── route.ts                       # GET, POST /api/accounts
│   └── [id]/route.ts                  # GET, PUT, DELETE /api/accounts/:id
└── lib/mongodb.ts                     # Configuración de conexión
```

## API Endpoints

### GET /api/accounts
Obtiene todas las cuentas del usuario autenticado.

**Query Parameters:**
- `platform` (opcional): Filtrar por plataforma específica

**Respuesta:**
```json
{
  "success": true,
  "accounts": [...],
  "total": 6
}
```

### POST /api/accounts
Crea una nueva cuenta.

**Body:**
```json
{
  "platform": "Instagram",
  "username": "@nueva_cuenta",
  "displayName": "Nueva Cuenta",
  "followers": 1000,
  "following": 500,
  "posts": 50,
  "verified": false,
  "category": "Personal",
  "connectedDate": "2024-01-15",
  "isActive": true
}
```

### PUT /api/accounts/:id
Actualiza una cuenta existente.

### DELETE /api/accounts/:id
Elimina una cuenta.

## Troubleshooting

### Error de conexión a MongoDB
```
MongoNetworkError: failed to connect to server
```
**Soluciones:**
1. Verificar que MongoDB esté ejecutándose localmente
2. Comprobar la URI de conexión en `.env`
3. Para Atlas: verificar whitelist de IPs
4. Verificar usuario y contraseña

### Error de autenticación
```
MongoServerError: Authentication failed
```
**Soluciones:**
1. Verificar credenciales en la URI
2. Para Atlas: verificar usuario de base de datos
3. Comprobar permisos del usuario

### Error de validación
```
ValidationError: Path `platform` is required
```
**Solución:** Verificar que todos los campos requeridos estén presentes en la petición.

### Base de datos no encontrada
**Solución:** MongoDB creará automáticamente la base de datos al insertar el primer documento.

## Migración y Backup

### Exportar datos
```bash
mongoexport --uri="mongodb://localhost:27017/camaleonic" --collection=accounts --out=accounts_backup.json
```

### Importar datos
```bash
mongoimport --uri="mongodb://localhost:27017/camaleonic" --collection=accounts --file=accounts_backup.json
```

### Backup automático (Atlas)
MongoDB Atlas incluye backups automáticos configurables desde el panel de control. 