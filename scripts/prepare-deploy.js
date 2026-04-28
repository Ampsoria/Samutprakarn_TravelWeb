/**
 * Pre-deploy script: สลับ Prisma provider จาก sqlite → postgresql อัตโนมัติ
 * ใช้ตอน build บน Railway/Render เท่านั้น (ไม่กระทบ local dev)
 * 
 * ทำงานเมื่อ DATABASE_URL ขึ้นต้นด้วย "postgresql://" หรือ "postgres://"
 */
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const lockPath = path.join(__dirname, '..', 'prisma', 'migrations', 'migration_lock.toml');
const dbUrl = process.env.DATABASE_URL || '';

if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
  console.log('🔄 Detected PostgreSQL DATABASE_URL — switching Prisma provider...');
  
  // 1. Switch schema.prisma provider
  let schema = fs.readFileSync(schemaPath, 'utf-8');
  schema = schema.replace(
    /provider\s*=\s*"sqlite"/,
    'provider = "postgresql"'
  );
  fs.writeFileSync(schemaPath, schema, 'utf-8');
  console.log('  ✅ schema.prisma updated to postgresql');

  // 2. Switch migration_lock.toml provider (prevents migrate deploy error)
  if (fs.existsSync(lockPath)) {
    let lock = fs.readFileSync(lockPath, 'utf-8');
    lock = lock.replace(
      /provider\s*=\s*"sqlite"/,
      'provider = "postgresql"'
    );
    fs.writeFileSync(lockPath, lock, 'utf-8');
    console.log('  ✅ migration_lock.toml updated to postgresql');
  }
} else {
  console.log('ℹ️  Using SQLite (local dev) — no provider change needed');
}
