# PowerShell script to setup PostgreSQL database
# Make sure PostgreSQL is running before executing this script

$env:PGPASSWORD = "vansh@1303tomarPL"

Write-Host "Setting up database tables..." -ForegroundColor Green

# Run the schema SQL file
psql -U postgres -d postgres -f src/lib/schema.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database setup completed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Database setup failed. Please check the error messages above." -ForegroundColor Red
}

# Clear password from environment
Remove-Item Env:\PGPASSWORD
