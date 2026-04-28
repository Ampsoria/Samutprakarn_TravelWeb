// Diagnostic test - write output to a file since terminal is broken
const fs = require('fs');
const logFile = 'c:/cscode/Samutprakan_Travelweb/diag.log';
function log(msg) {
    fs.appendFileSync(logFile, msg + '\n');
}

fs.writeFileSync(logFile, 'DIAGNOSTIC START: ' + new Date().toISOString() + '\n');

try {
    log('1. Node.js OK: ' + process.version);
} catch(e) { log('1. Node.js ERROR: ' + e.message); }

try {
    require('dotenv').config();
    log('2. dotenv OK');
} catch(e) { log('2. dotenv ERROR: ' + e.message); }

try {
    const express = require('express');
    log('3. express OK: v' + require('express/package.json').version);
} catch(e) { log('3. express ERROR: ' + e.message); }

try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    log('4. PrismaClient OK');
    prisma.$connect().then(() => {
        log('5. DB Connection OK');
        return prisma.place.count();
    }).then((count) => {
        log('6. Place count: ' + count);
        return prisma.$disconnect();
    }).then(() => {
        log('7. Starting express server...');
        const app = require('express')();
        app.get('/test', (req, res) => res.json({ ok: true }));
        const server = app.listen(3000, () => {
            log('8. Server listening on port 3000!');
            server.close();
            log('9. Server test complete - will now start actual server');
            // Now start the real server
            require('./server/index.js');
            log('10. Real server started');
        });
        server.on('error', (e) => {
            log('8. Server LISTEN ERROR: ' + e.message);
            if (e.code === 'EADDRINUSE') {
                log('   Port 3000 is already in use!');
            }
        });
    }).catch(e => {
        log('5-6 DB ERROR: ' + e.message);
    });
} catch(e) { log('4. PrismaClient ERROR: ' + e.message); }
