# 🚀 FinanceAI - AI Financial Document Processing API# FinanceAI - AI-Powered Financial Document Processing API



A modern Next.js web application for AI-powered financial document processing with **full PostgreSQL authentication** and user management.A modern, professional website for the FinanceAI API service that helps accountants and finance professionals automatically extract data from bank statements, receipts, and invoices using advanced AI technology.



![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?logo=next.js)## 🚀 Features

![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)### Homepage & Marketing

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?logo=postgresql)- **Beautiful Landing Page**: Purple and white themed design with modern gradients and animations

![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)- **Feature Showcase**: Dedicated sections for bank statements, receipts, and invoice processing

- **Benefits Overview**: Highlighting speed, security, and accuracy

---- **Professional Footer**: Complete navigation and company information



## ✨ Features### User Authentication

- **Sign Up Page**: User registration with form validation and password visibility toggle

### 🔐 **Complete Authentication System**- **Login Page**: Secure sign-in with remember me option and forgot password link

- ✅ User registration with email/password- **Responsive Design**: Mobile-friendly authentication forms

- ✅ Secure login with JWT tokens

- ✅ Session management with HTTP-only cookies### API Documentation

- ✅ Password hashing with bcrypt- **Complete API Reference**: Detailed documentation for all endpoints

- ✅ PostgreSQL database persistence- **Code Examples**: JavaScript/Node.js and Python integration examples

- ✅ Protected routes middleware- **Interactive Navigation**: Smooth scrolling between sections

- ✅ Unique API key generation per user- **Rate Limits & Pricing**: Clear tier information and usage guidelines

- **Error Handling**: Comprehensive error code reference

### 💼 **User Dashboard**

- ✅ View API keys### User Dashboard

- ✅ Monitor usage statistics- **API Key Management**: Generate, view, and manage API keys with copy functionality

- ✅ Track document processing- **Usage Statistics**: Real-time monitoring of document processing and API calls

- ✅ Account management- **Activity Feed**: Recent processing history with status indicators

- ✅ Real-time data from database- **Quick Actions**: Easy access to documentation and settings



### 🎨 **Modern UI/UX**## 🛠 Technology Stack

- ✅ Purple and white theme

- ✅ Responsive design (mobile, tablet, desktop)- **Framework**: Next.js 15.5.6 with App Router

- ✅ Smooth animations and transitions- **Language**: TypeScript for type safety

- ✅ Custom gradients and effects- **Styling**: Tailwind CSS with custom purple theme

- ✅ Accessibility features- **Icons**: Lucide React icons

- **Development**: Turbopack for fast builds

### 📄 **Complete Website**- **Authentication**: Next-Auth ready (setup required)

- ✅ Landing page with features

- ✅ API documentation## 🎨 Design System

- ✅ Pricing page (4 tiers)

- ✅ Contact page### Color Palette

- ✅ About page- **Primary Purple**: `#7916ff` with full shade range (50-950)

- ✅ Privacy & Cookie policies- **Background**: Gradient from purple-50 to white

- **Accents**: White overlays with backdrop blur effects

---- **Text**: Gray scale for optimal readability



## 🛠️ Tech Stack### Key Components

- Responsive navigation with mobile support

| Category | Technology | Version |- Card-based layouts with subtle shadows

|----------|-----------|---------|- Gradient backgrounds and hover effects

| **Framework** | Next.js | 15.5.6 |- Professional form styling with validation states

| **UI Library** | React | 19.1.0 |

| **Language** | TypeScript | 5 |## 🚦 Getting Started

| **Database** | PostgreSQL | 14+ |

| **Styling** | Tailwind CSS | 4 |### Prerequisites

| **Icons** | Lucide React | 0.546.0 |- Node.js 18+ 

| **Auth** | JWT (jose) | Latest |- npm, yarn, pnpm, or bun

| **Password** | bcryptjs | 3.0.2 |

| **DB Client** | pg | Latest |### Installation

| **Bundler** | Turbopack | Included |

1. **Clone and navigate to the project**:

---```bash

cd "My Product"  # Or your project directory

## 🚀 Quick Start```



### Prerequisites2. **Install dependencies**:

- Node.js v20+```bash

- PostgreSQL v14+npm install

- npm or yarn```



### 1. Clone & Install3. **Start the development server**:

```bash```bash

git clone <repository-url>npm run dev

cd "My Product"```

npm install

```4. **Open your browser**:

Navigate to [http://localhost:3001](http://localhost:3001) (or the port shown in terminal)

### 2. Setup PostgreSQL Database

```bash### Build for Production

# Create database

createdb financeai```bash

npm run build

# Initialize schemanpm start

psql -d financeai -f src/lib/schema.sql```

```

## 📁 Project Structure

### 3. Configure Environment

```bash```

# Copy environment templatesrc/

cp .env.local.example .env.local├── app/

│   ├── page.tsx                 # Homepage with hero, features, and CTA

# Edit .env.local with your credentials│   ├── signup/page.tsx          # User registration page

```│   ├── login/page.tsx           # User authentication page

│   ├── docs/page.tsx            # Complete API documentation

Required variables:│   ├── dashboard/page.tsx       # User dashboard with API keys

```env│   ├── layout.tsx               # Root layout

DATABASE_URL=postgresql://username:password@localhost:5432/financeai│   └── globals.css              # Global styles

JWT_SECRET=your-super-secret-jwt-key└── components/                  # Reusable components (if needed)

NEXT_PUBLIC_APP_URL=http://localhost:3000```

NODE_ENV=development

```## 🔧 Configuration



### 4. Run Development Server### Tailwind Configuration

```bashThe project includes a custom Tailwind config with:

npm run dev- Purple color palette (primary & purple)

```- Extended color system

- Responsive breakpoints

Visit `http://localhost:3000`- Custom gradients



---### Next.js Configuration

- Turbopack enabled for development

## 📖 Detailed Setup Guide- TypeScript strict mode

- ESLint configuration

For complete setup instructions, see **[DATABASE_SETUP.md](./DATABASE_SETUP.md)**- Optimized builds



This includes:## 🌐 Pages Overview

- PostgreSQL installation (macOS, Linux, Windows)

- Database creation and configuration### 1. Homepage (`/`)

- Schema initialization- Hero section with clear value proposition

- Environment variable setup- Three-column feature grid (bank statements, receipts, invoices)

- Troubleshooting guide- Benefits section with purple gradient background

- Production deployment tips- Call-to-action sections

- Professional footer

---

### 2. Authentication Pages

## 🔑 API Documentation- **Sign Up (`/signup`)**: Registration with name, email, password fields

- **Login (`/login`)**: Authentication with email/password and quick stats

### Authentication Endpoints

### 3. Documentation (`/docs`)

#### **POST** `/api/auth/signup`- Getting started guide

Create a new user account.- Authentication instructions

- Complete API endpoint reference

**Request:**- Code examples in multiple languages

```json- Rate limiting and pricing information

{- Error handling guide

  "name": "John Doe",

  "email": "john@example.com",### 4. Dashboard (`/dashboard`)

  "password": "securePassword123"- Usage statistics and analytics

}- API key management with security features

```- Recent activity feed

- Quick action cards

**Response:**

```json## 🔐 Security Features

{

  "success": true,- **API Key Management**: Secure generation and display

  "message": "Account created successfully",- **Input Validation**: Client-side form validation

  "user": {- **Password Security**: Hidden by default with toggle option

    "id": "uuid",- **Rate Limiting**: Clear documentation of API limits

    "name": "John Doe",- **Error Handling**: Proper error states and messaging

    "email": "john@example.com",

    "created_at": "2025-01-01T00:00:00.000Z"## 📱 Responsive Design

  }

}All pages are fully responsive with:

```- Mobile-first design approach

- Flexible grid layouts

#### **POST** `/api/auth/login`- Touch-friendly navigation

Authenticate user and create session.- Optimized typography scaling



**Request:**## 🚀 Deployment

```json

{The application is ready for deployment on:

  "email": "john@example.com",- **Vercel** (recommended for Next.js)

  "password": "securePassword123"- **Netlify**

}- **AWS Amplify**

```- **Any Node.js hosting platform**



**Response:**### Environment Variables (when needed)

```json```bash

{NEXTAUTH_URL=your-domain.com

  "success": true,NEXTAUTH_SECRET=your-secret-key

  "message": "Login successful",# Add your API keys and database URLs here

  "user": {```

    "id": "uuid",

    "name": "John Doe",## 📈 Future Enhancements

    "email": "john@example.com",

    "api_key": "sk_live_xxxxx",- **Authentication Backend**: Implement actual user registration/login

    "created_at": "2025-01-01T00:00:00.000Z"- **API Integration**: Connect to real document processing API

  }- **Payment Processing**: Integrate billing for different tiers

}- **Analytics**: Add user behavior tracking

```- **File Upload**: Interactive document upload interface

- **Real-time Updates**: WebSocket connections for live processing status

Sets `auth-token` HTTP-only cookie.

## 🤝 Contributing

#### **POST** `/api/auth/logout`

Terminate user session.1. Fork the repository

2. Create a feature branch

#### **GET** `/api/user`3. Make your changes

Get current authenticated user.4. Test thoroughly

5. Submit a pull request

---

## 📄 License

## 🗄️ Database Schema

This project is licensed under the MIT License.

### Tables

## 📞 Support

#### **users**

- `id` - UUID (Primary Key)For support and questions:

- `name` - VARCHAR(255)- Check the documentation at `/docs`

- `email` - VARCHAR(255) (Unique)- Review the dashboard features at `/dashboard`

- `password_hash` - VARCHAR(255)- Contact the development team

- `api_key` - VARCHAR(64) (Unique)

- `created_at`, `updated_at`, `last_login` - TIMESTAMP---

- `is_active` - BOOLEAN

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

#### **sessions**
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key → users)
- `token` - VARCHAR(500) (Unique)
- `expires_at` - TIMESTAMP
- `created_at` - TIMESTAMP

#### **api_usage**
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key → users)
- `endpoint`, `method` - VARCHAR
- `status_code`, `request_count` - INTEGER
- `created_at` - TIMESTAMP

---

## 🔒 Security Features

- ✅ **Password Hashing**: bcrypt with salt rounds
- ✅ **JWT Tokens**: HS256 signed tokens
- ✅ **HTTP-Only Cookies**: XSS protection
- ✅ **Session Expiration**: 7-day timeout
- ✅ **SQL Injection Protection**: Parameterized queries
- ✅ **Route Protection**: Middleware-based

---

## 🚢 Production Deployment

### Recommended Platforms
- **Vercel** + Vercel Postgres/Neon
- **Railway** (includes PostgreSQL)
- **Render** + Render PostgreSQL

### Environment Variables (Production)
```env
DATABASE_URL=postgresql://user:password@host:5432/financeai?sslmode=require
JWT_SECRET=<generate-with-openssl-rand-base64-32>
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

---

## 📊 Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
```

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL is running
brew services list  # macOS
sudo systemctl status postgresql  # Linux

# Verify DATABASE_URL in .env.local
```

### "relation users does not exist"
```bash
# Re-run schema
psql -d financeai -f src/lib/schema.sql
```

### Port 3000 in use
```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## 📝 Changelog

### v2.0.0 - PostgreSQL Authentication (Current)
- ✅ Removed all demo credentials
- ✅ Implemented PostgreSQL database
- ✅ Added user registration and login
- ✅ Created session management
- ✅ Added route protection middleware
- ✅ Generated unique API keys per user

### v1.0.0 - Initial Release
- ✅ Demo credentials system
- ✅ UI/UX design
- ✅ All pages created

---

## ✅ Features Completed

- [x] User Registration
- [x] User Login
- [x] Session Management
- [x] Password Hashing
- [x] JWT Authentication
- [x] API Key Generation
- [x] Protected Routes
- [x] User Dashboard
- [x] Database Persistence
- [x] All Demo Credentials Removed
- [x] PostgreSQL Integration
- [x] Complete Documentation

---

## 🎯 Next Steps (Optional Enhancements)

- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication
- [ ] OAuth providers (Google, GitHub)
- [ ] API rate limiting
- [ ] Usage analytics dashboard
- [ ] Webhook support
- [ ] Team collaboration

---

**Built with ❤️ using Next.js, React, TypeScript, PostgreSQL, and Tailwind CSS**

🚀 **No more demo credentials - fully production-ready authentication system!**
