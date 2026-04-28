@echo off
chcp 65001 >nul 2>nul
cd /d "%~dp0"
echo ================================== > diag.log
echo Starting at %date% %time% >> diag.log
echo ================================== >> diag.log

echo [1/4] Checking Node.js... >> diag.log
node -e "console.log('Node works: '+process.version)" >> diag.log 2>&1

echo [2/4] Prisma generate... >> diag.log
call npx prisma generate >> diag.log 2>&1

echo [3/4] Prisma migrate deploy... >> diag.log
call npx prisma migrate deploy >> diag.log 2>&1

echo [4/4] Seeding database... >> diag.log
node prisma/seed.js >> diag.log 2>&1

echo ================================== >> diag.log
echo Starting server... >> diag.log
echo ================================== >> diag.log
node server/index.js >> diag.log 2>&1
