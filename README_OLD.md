# FinanceAI - AI-Powered Financial Document Processing API

A modern, professional website for the FinanceAI API service that helps accountants and finance professionals automatically extract data from bank statements, receipts, and invoices using advanced AI technology.

## 🚀 Features

### Homepage & Marketing
- **Beautiful Landing Page**: Purple and white themed design with modern gradients and animations
- **Feature Showcase**: Dedicated sections for bank statements, receipts, and invoice processing
- **Benefits Overview**: Highlighting speed, security, and accuracy
- **Professional Footer**: Complete navigation and company information

### User Authentication
- **Sign Up Page**: User registration with form validation and password visibility toggle
- **Login Page**: Secure sign-in with remember me option and forgot password link
- **Responsive Design**: Mobile-friendly authentication forms

### API Documentation
- **Complete API Reference**: Detailed documentation for all endpoints
- **Code Examples**: JavaScript/Node.js and Python integration examples
- **Interactive Navigation**: Smooth scrolling between sections
- **Rate Limits & Pricing**: Clear tier information and usage guidelines
- **Error Handling**: Comprehensive error code reference

### User Dashboard
- **API Key Management**: Generate, view, and manage API keys with copy functionality
- **Usage Statistics**: Real-time monitoring of document processing and API calls
- **Activity Feed**: Recent processing history with status indicators
- **Quick Actions**: Easy access to documentation and settings

## 🛠 Technology Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom purple theme
- **Icons**: Lucide React icons
- **Development**: Turbopack for fast builds
- **Authentication**: Next-Auth ready (setup required)

## 🎨 Design System

### Color Palette
- **Primary Purple**: `#7916ff` with full shade range (50-950)
- **Background**: Gradient from purple-50 to white
- **Accents**: White overlays with backdrop blur effects
- **Text**: Gray scale for optimal readability

### Key Components
- Responsive navigation with mobile support
- Card-based layouts with subtle shadows
- Gradient backgrounds and hover effects
- Professional form styling with validation states

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone and navigate to the project**:
```bash
cd "My Product"  # Or your project directory
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to [http://localhost:3001](http://localhost:3001) (or the port shown in terminal)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Homepage with hero, features, and CTA
│   ├── signup/page.tsx          # User registration page
│   ├── login/page.tsx           # User authentication page
│   ├── docs/page.tsx            # Complete API documentation
│   ├── dashboard/page.tsx       # User dashboard with API keys
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
└── components/                  # Reusable components (if needed)
```

## 🔧 Configuration

### Tailwind Configuration
The project includes a custom Tailwind config with:
- Purple color palette (primary & purple)
- Extended color system
- Responsive breakpoints
- Custom gradients

### Next.js Configuration
- Turbopack enabled for development
- TypeScript strict mode
- ESLint configuration
- Optimized builds

## 🌐 Pages Overview

### 1. Homepage (`/`)
- Hero section with clear value proposition
- Three-column feature grid (bank statements, receipts, invoices)
- Benefits section with purple gradient background
- Call-to-action sections
- Professional footer

### 2. Authentication Pages
- **Sign Up (`/signup`)**: Registration with name, email, password fields
- **Login (`/login`)**: Authentication with email/password and quick stats

### 3. Documentation (`/docs`)
- Getting started guide
- Authentication instructions
- Complete API endpoint reference
- Code examples in multiple languages
- Rate limiting and pricing information
- Error handling guide

### 4. Dashboard (`/dashboard`)
- Usage statistics and analytics
- API key management with security features
- Recent activity feed
- Quick action cards

## 🔐 Security Features

- **API Key Management**: Secure generation and display
- **Input Validation**: Client-side form validation
- **Password Security**: Hidden by default with toggle option
- **Rate Limiting**: Clear documentation of API limits
- **Error Handling**: Proper error states and messaging

## 📱 Responsive Design

All pages are fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly navigation
- Optimized typography scaling

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting platform**

### Environment Variables (when needed)
```bash
NEXTAUTH_URL=your-domain.com
NEXTAUTH_SECRET=your-secret-key
# Add your API keys and database URLs here
```

## 📈 Future Enhancements

- **Authentication Backend**: Implement actual user registration/login
- **API Integration**: Connect to real document processing API
- **Payment Processing**: Integrate billing for different tiers
- **Analytics**: Add user behavior tracking
- **File Upload**: Interactive document upload interface
- **Real-time Updates**: WebSocket connections for live processing status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Check the documentation at `/docs`
- Review the dashboard features at `/dashboard`
- Contact the development team

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
