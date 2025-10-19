# 🔴 ERROR FOUND: Database Connection Refused

## Error Details
```
code: 'ECONNREFUSED'
```

**What this means**: The app cannot connect to PostgreSQL database.

---

## ✅ Solution: Setup PostgreSQL

You have **two options**:

### Option 1: Quick Setup with PostgreSQL (Recommended)

#### Step 1: Install PostgreSQL (if not installed)
```bash
# macOS (using Homebrew)
brew install postgresql@14
brew services start postgresql@14

# Check if running
brew services list | grep postgresql
```

#### Step 2: Create Database
```bash
# Create the database
createdb financeai

# Verify it was created
psql -l | grep financeai
```

#### Step 3: Initialize Schema
```bash
# Run the schema file to create tables
psql -d financeai -f src/lib/schema.sql
```

#### Step 4: Create .env.local File
```bash
# Copy the example file
cp .env.local.example .env.local
```

#### Step 5: Edit .env.local
Open `.env.local` and set:
```env
DATABASE_URL=postgresql://YOUR_USERNAME@localhost:5432/financeai
JWT_SECRET=your-secret-key-change-this
NEXT_PUBLIC_APP_URL=http://localhost:3007
NODE_ENV=development
```

**Find your PostgreSQL username:**
```bash
whoami  # This is usually your username
```

Example:
```env
DATABASE_URL=postgresql://rajb@localhost:5432/financeai
JWT_SECRET=my-super-secret-jwt-key-12345
NEXT_PUBLIC_APP_URL=http://localhost:3007
NODE_ENV=development
```

#### Step 6: Restart Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

#### Step 7: Test Signup
Visit http://localhost:3007/signup and create an account!

---

### Option 2: Use SQLite Instead (Simpler Alternative)

If you don't want to install PostgreSQL, I can convert the app to use SQLite which is simpler and requires no setup.

Let me know if you want me to do this!

---

## 🧪 Verify PostgreSQL is Running

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Should show "started" status
# If not, start it:
brew services start postgresql@14

# Test connection
psql -d postgres -c "SELECT version();"
```

---

## 📝 Quick Reference

### Common PostgreSQL Commands:
```bash
# Start PostgreSQL
brew services start postgresql@14

# Stop PostgreSQL
brew services stop postgresql@14

# Restart PostgreSQL
brew services restart postgresql@14

# Access PostgreSQL console
psql postgres

# List databases
psql -l

# Connect to financeai database
psql -d financeai

# Inside psql, list tables:
\dt
```

---

## 🐛 Troubleshooting

### Error: "command not found: createdb"
**Fix**: PostgreSQL is not installed
```bash
brew install postgresql@14
```

### Error: "role does not exist"
**Fix**: Create your user
```bash
createuser -s YOUR_USERNAME
```

### Error: "database financeai does not exist"
**Fix**: Create the database
```bash
createdb financeai
```

### Error: Still getting ECONNREFUSED
**Fix**: Check if PostgreSQL is actually running
```bash
# Check status
brew services list

# Check port 5432 is open
lsof -i :5432
```

---

## 🎯 Expected Result

After setup, you should see:
```
✓ Connected to PostgreSQL database
POST /api/auth/signup 201 in 150ms
```

And signup will work! ✅

---

**Which option do you prefer?**
1. Setup PostgreSQL (production-ready, recommended)
2. Convert to SQLite (simpler, no installation needed)

Let me know and I'll help you complete the setup!
