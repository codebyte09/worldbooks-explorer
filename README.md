# World of Books Explorer

A full-stack product exploration platform that lets users navigate from high-level headings → categories → products → product detail pages powered by live, on-demand scraping from World of Books.

## 🎯 Project Goal

Build a production-minded product exploration platform that demonstrates:
- Real-time web scraping with ethical practices
- Full-stack TypeScript development
- Responsive UI with modern UX patterns
- Database design and API architecture
- Deployment and CI/CD practices

## 🚀 Features

- **Real-time Scraping**: On-demand scraping from World of Books with rate limiting and caching
- **Navigation System**: Browse from navigation headings → categories → products
- **Product Details**: Comprehensive product pages with reviews, ratings, and recommendations
- **Search & Filter**: Advanced search functionality with pagination
- **Responsive Design**: Mobile-first design with accessibility features
- **API Documentation**: Swagger/OpenAPI documentation
- **Error Handling**: Comprehensive error handling and fallback data

## 🛠 Technologies Used

### Frontend
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Query** for data fetching
- **Responsive Design** with accessibility features

### Backend
- **NestJS** with TypeScript
- **PostgreSQL** database with TypeORM
- **Crawlee + Playwright** for web scraping
- **Swagger/OpenAPI** for API documentation
- **Rate limiting** and caching

### DevOps
- **Docker** containerization
- **Vercel** for frontend deployment
- **Render** for backend deployment
- **GitHub Actions** for CI/CD

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone https://github.com/codebyte09/worldbooks-explorer.git
cd worldbooks-explorer
```

### 2. Database Setup
```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Or use your own PostgreSQL instance
```

### 3. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials

npm install
npm run seed  # Seed initial data
npm run start:dev
```

### 4. Frontend Setup
```bash
cd frontend
cp .env.example .env
# Edit .env with your API URL

npm install
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

## 🗄 Database Schema

The application uses the following entities:
- `navigation` - Top-level navigation headings
- `category` - Product categories and subcategories
- `product` - Individual products with metadata
- `product_detail` - Extended product information
- `review` - User reviews and ratings
- `scrape_job` - Scraping job tracking
- `view_history` - User browsing history

## 🔧 API Endpoints

### Products
- `GET /api/products` - List products with filtering and pagination
- `GET /api/products/:id` - Get product details
- `POST /api/products/refresh` - Trigger product refresh for a category

### Navigation & Categories
- `GET /api/navigation` - Get all navigation headings
- `GET /api/categories` - Get categories (optionally filtered by navigation)
- `POST /api/scrape/navigation` - Trigger navigation scraping

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy automatically

### Environment Variables

#### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=worldbooks
DB_SYNC=true
PORT=3000
FRONTEND_URL=http://localhost:3001
SCRAPE_DELAY=2000
```

#### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
cd frontend
npm run test
```

## 📚 API Documentation

Once the backend is running, visit http://localhost:3000/api for interactive API documentation powered by Swagger.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of a full-stack assignment and is for educational purposes.

## 🔗 Live Demo

- **Frontend**: [Deploy to Vercel](https://vercel.com)
- **Backend**: [Deploy to Render](https://render.com)
- **Repository**: https://github.com/codebyte09/worldbooks-explorer

## ⚠️ Ethical Scraping

This application implements ethical web scraping practices:
- Respects robots.txt and terms of service
- Uses proper rate limiting and delays
- Implements retries and exponential backoff
- Caches results to avoid repeated requests
- Includes fallback data for development/testing