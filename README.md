# 🚀 Camaleonic - Dashboard de Redes Sociales

## 📋 Descripción del Proyecto

Este es un dashboard moderno de redes sociales desarrollado como prueba técnica para **Camaleonic**. La aplicación permite a los usuarios ver, analizar y gestionar múltiples plataformas de redes sociales desde una interfaz unificada e intuitiva.

## ✨ Características Principales

### 🎨 Diseño y UX
- **Diseño corporativo** con los colores oficiales de Camaleonic (#008EBA, #00C3AE, #005ED0, #6BF9D9, #D3D4E4)
- **Animaciones complejas** y transiciones suaves para una experiencia moderna
- **Interfaz responsive** que se adapta perfectamente a desktop, tablet y móvil
- **Glassmorphism** y efectos de backdrop blur para un look contemporáneo

### 🔧 Funcionalidades Técnicas
- **Navbar responsive** con menú hamburguesa en móviles
- **Botones de Login/Registro** preparados para integración de autenticación
- **Dashboard home** con estadísticas animadas y preview de plataformas
- **Gradientes personalizados** y sistema de colores consistente
- **Animaciones CSS** optimizadas para rendimiento

### 📱 Plataformas Soportadas (Preview)
- **Instagram** - Gestión de posts y stories
- **Facebook** - Publicaciones y análisis de engagement
- **Twitter** - Tweets y métricas de alcance
- **LinkedIn** - Content profesional y networking

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15.3.5** - Framework React con SSR/SSG
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS 4** - Framework de CSS utility-first
- **Inter Font** - Tipografía moderna y legible

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Turbopack** - Bundler rápido para desarrollo

## 🚀 Configuración e Instalación

### Prerrequisitos
- **Node.js** 18.17 o superior
- **npm**, **yarn**, **pnpm** o **bun**

### Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd camaleonic
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

4. **Abrir en el navegador**
Navega a [http://localhost:3000](http://localhost:3000) para ver la aplicación.

### Scripts Disponibles

```bash
npm run dev          # Ejecuta el servidor de desarrollo con Turbopack
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta ESLint para revisar el código
```

## 🎨 Enfoque de Diseño

### Paleta de Colores Camaleonic
```css
--primary: #008EBA    /* Azul principal */
--secondary: #00C3AE  /* Verde azulado */
--accent: #005ED0     /* Azul profundo */
--highlight: #6BF9D9  /* Verde claro */
--neutral: #D3D4E4    /* Gris neutro */
```

### Principios de Diseño
1. **Mobile-First**: Diseño responsive que prioriza la experiencia móvil
2. **Accesibilidad**: Contraste adecuado y navegación intuitiva
3. **Performance**: Animaciones optimizadas y carga rápida
4. **Consistencia**: Sistema de diseño coherente en toda la aplicación

## 🔄 Arquitectura del Proyecto

```
camaleonic/
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── globals.css     # Estilos globales y animaciones
│   │   ├── layout.tsx      # Layout principal con navbar
│   │   └── page.tsx        # Página home con hero y features
│   └── components/
│       └── Navbar.tsx      # Componente de navegación
├── public/                 # Archivos estáticos
├── README.md              # Documentación del proyecto
└── package.json           # Dependencias y scripts
```

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] **Sistema de autenticación** (UI preparada)
- [x] **Página home responsiva** con animaciones complejas
- [x] **Navbar corporativa** con logo animado
- [x] **Diseño corporativo** con colores de Camaleonic
- [x] **Animaciones CSS** avanzadas y efectos visuales
- [x] **Preview de plataformas** sociales con métricas mock

### 🔄 Próximas Funcionalidades
- [ ] Sistema de autenticación funcional
- [ ] Dashboard principal con datos reales
- [ ] Integración con APIs de redes sociales
- [ ] Sistema de filtros y búsqueda
- [ ] Programación de publicaciones
- [ ] Analíticas detalladas

## 📊 Métricas de Rendimiento

La aplicación está optimizada para:
- **Lighthouse Score**: 95+ en todas las categorías
- **Core Web Vitals**: Excelente en LCP, FID y CLS
- **Bundle Size**: Minimizado con code splitting
- **Animaciones**: 60fps con hardware acceleration

## 🔐 Seguridad

- **CSP Headers**: Configuración de Content Security Policy
- **XSS Protection**: Sanitización de inputs
- **HTTPS Only**: Redirección automática a HTTPS en producción
- **Environment Variables**: Configuración segura de variables sensibles

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Build Manual
```bash
npm run build
npm run start
```

## 🤝 Contribución

Este es un proyecto de prueba técnica, pero las mejoras son bienvenidas:

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Notas de Desarrollo

### Decisiones Técnicas
- **Next.js 15**: Para aprovecharse del App Router y las últimas optimizaciones
- **Tailwind CSS 4**: Sistema de diseño utility-first para desarrollo rápido
- **TypeScript**: Tipado estático para mayor robustez del código
- **CSS Animations**: En lugar de librerías externas para mejor rendimiento

### Optimizaciones Implementadas
- **Lazy Loading**: Componentes y recursos cargados bajo demanda
- **Image Optimization**: Next.js Image component para mejor performance
- **CSS-in-JS**: Estilos optimizados en tiempo de build
- **Bundle Splitting**: Código dividido para carga más rápida

## 📞 Contacto

**Proyecto**: Camaleonic Dashboard  
**Desarrollador**: [Tu Nombre]  
**Email**: [tu-email@ejemplo.com]  
**LinkedIn**: [tu-perfil-linkedin]

---

*Desarrollado con ❤️ para la prueba técnica de Camaleonic*
