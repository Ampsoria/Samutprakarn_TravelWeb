@echo off
chcp 65001 >nul 2>nul
cd /d c:\cscode\Samutprakan_Travelweb
echo Starting at %date% %time% > diag.log
node -e "require('fs').writeFileSync('diag.log','Node works: '+process.version+'\n')" 2>> diag.log
if exist diag.log (
    echo Node executed >> diag.log
) else (
    echo Node failed to write > diag.log  
)
call npx prisma generate >> diag.log 2>&1
echo Prisma generate done >> diag.log
node prisma/seed.js >> diag.log 2>&1
echo Seed done >> diag.log
node server/index.js >> diag.log 2>&1
