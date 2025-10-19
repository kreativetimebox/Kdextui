# 🚀 FinanceAI - PostgreSQL Authentication Setup Guide

## Overview
This application now uses **PostgreSQL** for full user authentication with real database persistence. All demo credentials have been removed and replaced with a complete authentication system.

---

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** v20 or higher
- **PostgreSQL** v14 or higher installed and running
- **npm** or **yarn** package manager

---

## 🔧 Step 1: Install PostgreSQL

### macOS (using Homebrew):
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows:
Download and install from [PostgreSQL Official Website](https://www.postgresql.org/download/windows/)

---

## 🗄️ Step 2: Create Database

1. **Access PostgreSQL**:
```bash
psql postgres
```

2. **Create Database and User**:
```sql
CREATE DATABASE financeai;
CREATE USER financeai_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE financeai TO financeai_user;
\q
```

3. **Initialize Database Schema**:
```bash
psql -U financeai_user -d financeai -f src/lib/schema.sql
```

Or manually connect and run:
```bash
psql -U financeai_user -d financeai
```

Then paste the contents of `src/lib/schema.sql`.

---

## 🔐 Step 3: Configure Environment Variables

1. **Copy the example environment file**:
```bash
cp .env.local.example .env.local
```

2. **Edit `.env.local`** and update with your credentials:
```env
# PostgreSQL Database Connection
DATABASE_URL=postgresql://financeai_user:your_secure_password@localhost:5432/financeai

# JWT Secret (generate a secure random string)
# Generate with: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

### Generate a Secure JWT Secret:
```bash
openssl rand -base64 32
```

---

## 📦 Step 4: Install Dependencies

```bash
npm install
```

This installs:
- `pg` - PostgreSQL client
- `uuid` - Unique ID generation
- `jose` - JWT token handling
- `bcryptjs` - Password hashing
- All existing Next.js dependencies

---

## 🏗️ Step 5: Database Schema Overview

The database includes three main tables:

### **users** table:
- `id` - UUID primary key
- `name` - User's full name
- `email` - Unique email address
- `password_hash` - Bcrypt hashed password
- `api_key` - Unique API key for document processing
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp
- `last_login` - Last login timestamp
- `is_active` - Account status

### **sessions** table:
- `id` - UUID primary key
- `user_id` - Foreign key to users
- `token` - JWT session token
- `expires_at` - Token expiration
- `ip_address` - Client IP (optional)
- `user_agent` - Browser info (optional)

### **api_usage** table:
- `id` - UUID primary key
- `user_id` - Foreign key to users
- `endpoint` - API endpoint called
- `method` - HTTP method
- `status_code` - Response status
- `request_count` - Number of requests
- `created_at` - Timestamp

---

## 🚀 Step 6: Run the Application

### Development Mode:
```bash
npm run dev
```

The app will start on `http://localhost:3000`

### Production Build:
```bash
npm run build
npm start
```

---

## 🔑 API Endpoints

### Authentication Endpoints:

#### 1. **Sign Up** - `POST /api/auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
}
```

#### 2. **Login** - `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "api_key": "sk_live_...",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
}
```

Sets `auth-token` HTTP-only cookie.

#### 3. **Logout** - `POST /api/auth/logout`
No body required. Clears session.

#### 4. **Get Current User** - `GET /api/user`
No body required. Returns current authenticated user.

---

## 🔒 Security Features

✅ **Password Hashing**: Bcrypt with salt rounds  
✅ **JWT Tokens**: Signed with HS256 algorithm  
✅ **HTTP-Only Cookies**: Prevents XSS attacks  
✅ **Session Management**: Database-backed sessions  
✅ **SQL Injection Protection**: Parameterized queries  
✅ **Unique API Keys**: Generated per user  
✅ **Token Expiration**: 7-day session timeout  

---

## 🧪 Testing the Setup

1. **Start the dev server**:
```bash
npm run dev
```

2. **Visit** `http://localhost:3000`

3. **Create an account**:
- Click "Sign Up"
- Fill in your details
- Submit the form

4. **Login**:
- Use your new credentials
- Access the dashboard

5. **View your API key**:
- Dashboard shows your unique API key
- Copy it for API calls

---

## 🐛 Troubleshooting

### Database Connection Issues:

**Error**: `connection refused`
```bash
# Check if PostgreSQL is running:
brew services list  # macOS
sudo systemctl status postgresql  # Linux

# Restart PostgreSQL:
brew services restart postgresql@14  # macOS
sudo systemctl restart postgresql  # Linux
```

**Error**: `authentication failed`
```bash
# Verify connection string in .env.local
# Check database user permissions:
psql postgres -c "\du"
```

### Schema Initialization Issues:

**Error**: `relation "users" does not exist`
```bash
# Re-run schema creation:
psql -U financeai_user -d financeai -f src/lib/schema.sql
```

### Port Already in Use:

```bash
# Find process using port 3000:
lsof -ti:3000 | xargs kill -9

# Or change port:
npm run dev -- -p 3001
```

---

## 📂 Project Structure

```
/Users/rajb/Dext/My Product/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── signup/route.ts    # Sign up endpoint
│   │   │   │   ├── login/route.ts     # Login endpoint
│   │   │   │   └── logout/route.ts    # Logout endpoint
│   │   │   └── user/route.ts          # Get user endpoint
│   │   ├── login/page.tsx             # Login page (no demo)
│   │   ├── signup/page.tsx            # Signup page (real)
│   │   ├── dashboard/page.tsx         # Dashboard (dynamic)
│   │   └── ...
│   └── lib/
│       ├── db.ts                      # PostgreSQL connection
│       ├── auth.ts                    # Auth helper functions
│       └── schema.sql                 # Database schema
├── .env.local                         # Your environment variables
├── .env.local.example                 # Template
└── package.json
```

---

## 🔄 Migration from Demo Credentials

### What Changed:

❌ **Removed**:
- Demo credentials (`demo@financeai.com` / `demo123`)
- localStorage authentication
- Hardcoded user data
- Demo banners and notices

✅ **Added**:
- PostgreSQL database integration
- Real user registration
- JWT-based authentication
- Session management
- Unique API keys per user
- Password hashing (bcrypt)

---

## 🌐 Production Deployment

### Environment Variables for Production:

```env
DATABASE_URL=postgresql://user:password@production-host:5432/financeai
JWT_SECRET=<strong-random-secret>
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Recommended Hosting:

- **Vercel** + **Vercel Postgres** or **Neon**
- **Railway** (includes PostgreSQL)
- **Render** + **Render PostgreSQL**
- **AWS** (EC2 + RDS)
- **DigitalOcean** (App Platform + Managed Databases)

### SSL/TLS:
For production databases, ensure SSL is enabled in the connection string:
```env
DATABASE_URL=postgresql://user:password@host:5432/db?sslmode=require
```

---

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [JWT Best Practices](https://jwt.io/introduction)
- [Bcrypt Security](https://github.com/kelektiv/node.bcrypt.js)

---

## 🆘 Support

If you encounter issues:

1. Check the database connection
2. Verify environment variables
3. Review server logs
4. Ensure PostgreSQL is running
5. Check schema initialization

---

## 🎉 Success!

You now have a fully functional authentication system with:
- ✅ User registration
- ✅ Secure login
- ✅ Session management
- ✅ API key generation
- ✅ Protected dashboard
- ✅ PostgreSQL persistence

**No more demo credentials!** 🚀
