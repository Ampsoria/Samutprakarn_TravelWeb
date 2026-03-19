// Self-diagnostic server starter with file-based error logging
const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, 'startup.log');

function log(msg) {
  fs.appendFileSync(logPath, new Date().toISOString() + ' | ' + msg + '\n');
}

// Clear previous log
fs.writeFileSync(logPath, '=== SERVER STARTUP LOG ===\n');

process.on('uncaughtException', (err) => {
  log('UNCAUGHT: ' + err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log('UNHANDLED REJECTION: ' + (reason.stack || reason));
});

try {
  log('Step 1: Loading dotenv...');
  require('dotenv').config();
  log('Step 2: dotenv loaded. PORT=' + process.env.PORT + ', NODE_ENV=' + process.env.NODE_ENV);
  
  log('Step 3: Loading express...');
  const express = require('express');
  log('Step 4: Express loaded');

  log('Step 5: Loading Prisma...');
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  log('Step 6: Prisma loaded');

  log('Step 7: Testing DB connection...');
  prisma.$connect().then(() => {
    log('Step 8: DB connected!');
    return prisma.place.count();
  }).then(count => {
    log('Step 9: Place count = ' + count);
    
    log('Step 10: Starting actual server...');
    require('./server/index.js');
    log('Step 11: Server module loaded successfully!');
  }).catch(e => {
    log('DB ERROR: ' + e.stack);
  });

} catch(e) {
  log('STARTUP ERROR: ' + e.stack);
}
