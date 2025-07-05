# 🚀 Camaleonic - Social Media Dashboard

> **Try it now!** Production version available at: [https://camaleonic.vercel.app](https://camaleonic.vercel.app)

## 📑 Table of Contents

1. [📋 Project Description](#-project-description)
2. [✨ Key Features](#-key-features)
   - [🎨 Design & UX](#-design--ux)
   - [🔧 Technical Features](#-technical-features)
   - [📊 Dashboard Features](#-dashboard-features)
   - [📱 Data Management](#-data-management)
   - [🔐 Security Features](#-security-features)
3. [🛠️ Technology Stack](#️-technology-stack)
4. [🚀 Setup and Installation](#-setup-and-installation)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Available Scripts](#available-scripts)
5. [📊 MongoDB and Data](#-mongodb-y-datos)
   - [Data Structure](#estructura-de-datos)
   - [Sample Data](#datos-de-prueba)
   - [Troubleshooting](#troubleshooting-de-mongodb)
6. [🎨 Design System](#-design-system)
7. [🔄 Project Architecture](#-project-architecture)
8. [📊 Performance Metrics](#-performance-metrics)
9. [🔐 Security](#-security)
10. [🚀 Deployment](#-deployment)
11. [🤝 Contributing](#-contributing)
12. [📝 Development Notes](#-development-notes)
13. [📞 Contact](#-contact)

## 📋 Project Description

A modern social media dashboard developed for **Camaleonic Analytics**. The application allows users to view, analyze, and manage multiple social media platforms through a unified and intuitive interface.

## ✨ Key Features

### 🎨 Design & UX
- **Corporate design** with Camaleonic's official colors (#008EBA, #00C3AE, #005ED0, #6BF9D9, #D3D4E4)
- **Animations** and smooth transitions for a modern experience
- **Responsive interface** perfectly adapting to desktop, tablet, and mobile

### 🔧 Technical Features
- **Complete authentication system** with JWT and HTTP-only cookies
- **Secure user registration** with password validation and email verification
- **Interactive dashboard** with real-time data visualization
- **Data management tables** for metrics, content, and accounts
- **Advanced filtering system** for analytics and reports
- **Responsive navigation**

### 📊 Dashboard Features
- **Real-time metrics panel** with key performance indicators
- **Interactive chart grid** with multiple visualization types
- **Custom filter panel** for data analysis
- **Additional information panels** with insights
- **Automatic data updates** and synchronization

### 📱 Data Management
- **Social media metrics** tracking and analysis
- **Content management** across platforms
- **Account management** and integration
- **CRUD operations** for all data types
- **Batch operations** support

### 🔐 Security Features
- **JWT authentication** with secure HTTP-only cookies
- **Password encryption** and validation
- **Protected API routes** with middleware
- **Session management** and automatic logout
- **Form validation** and sanitization

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.3.5** - React framework with SSR/SSG
- **TypeScript** - Static typing
- **Tailwind CSS 4** - CSS framework
- **Chart.js** - Data visualization
- **React Hook Form** - Form management

### Backend
- **Next.js API Routes** - Backend API
- **MongoDB** - Database
- **JWT** - Authentication
- **Joi** - Data validation
- **bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundling

## 🚀 Setup and Installation

### Prerequisites
- **Node.js** 18.17 or higher
- **npm**, **yarn**, **pnpm**, or **bun**
- **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/hectoremanuelpc/camaleonic.git
cd camaleonic
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configure MongoDB**

#### Option A: Local MongoDB
```bash
# macOS (with Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Download and install from https://www.mongodb.com/try/download/community
```

#### Option B: MongoDB Atlas (Recommended for production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Set up user and password
4. Get connection string
5. Add IP to whitelist

4. **Configure environment variables**

Create a `.env` file in the project root:

```env
# MongoDB Database (required)
MONGODB_URI=mongodb://localhost:27017/camaleonic
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/camaleonic

# JWT Secret (required)
JWT_SECRET=your_super_secure_jwt_secret_here

# Environment configuration
NODE_ENV=development

# MockAPI URLs (for metrics and content)
MOCKAPI_BASE_URL=https://6867f54bd5933161d70a66fe.mockapi.io/api/v1
```

### Sample Data
The system automatically creates 6 example accounts the first time a user accesses the accounts section.

5. **Run in development mode**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Run development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Design System

### Camaleonic Color Palette
```css
--primary: #008EBA    /* Main blue */
--secondary: #00C3AE  /* Teal */
--accent: #005ED0     /* Deep blue */
--highlight: #6BF9D9  /* Light green */
--neutral: #D3D4E4    /* Neutral gray */
```

### Design Principles
1. **Mobile-First**: Responsive design prioritizing mobile experience
2. **Accessibility**: Proper contrast and intuitive navigation
3. **Performance**: Optimized animations and fast loading
4. **Consistency**: Coherent design system throughout the application


## 📊 Performance Metrics

The application is optimized for:
- **Lighthouse Score**: 95+ in all categories
- **Core Web Vitals**: Excellent in LCP, FID, and CLS
- **Bundle Size**: Minimized with code splitting
- **Animations**: 60fps with hardware acceleration

## 🔐 Security

- **JWT Authentication**: Secure token-based auth
- **HTTP-only Cookies**: Protected session management
- **Password Encryption**: Secure password storage
- **API Protection**: Route middleware security
- **Input Validation**: Form and data sanitization

## 🚀 Deployment

### Production Version
The application is deployed and available in production:
- **URL**: [https://camaleonic.vercel.app](https://camaleonic.vercel.app)
- **Status**: 🟢 Active
- **Hosting**: Vercel
- **Last update**: July 2025

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Manual Build
```bash
npm run build
npm run start
```

## 🤝 Contributing

This is a technical test project, but improvements are welcome:

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Development Notes

### Technical Decisions
- **Next.js 15**: Leveraging App Router and latest optimizations
- **Tailwind CSS 4**: Utility-first system for rapid development
- **TypeScript**: Static typing for code robustness
- **MongoDB**: Flexible document storage for social media data

### Implemented Optimizations
- **Lazy Loading**: Components and resources loaded on demand
- **Image Optimization**: Next.js Image component for better performance
- **State Management**: Efficient data flow with Zustand
- **API Caching**: Response caching for better performance

## 📞 Contact

**Project**: Camaleonic Dashboard  
**Developer**: [Your Name]  
**Email**: [your-email@example.com]  
**LinkedIn**: [your-linkedin-profile]

---

*Developed with ❤️ for Camaleonic Analytics technical test*
