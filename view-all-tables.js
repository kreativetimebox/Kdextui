const pg = require('pg');

const client = new pg.Client({
  user: 'financeai_user',
  password: 'financeai123',
  host: 'localhost',
  port: 5432,
  database: 'financeai'
});

(async () => {
  try {
    await client.connect();

    console.log('\n╔════════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                        FINANCEAI DATABASE - ALL TABLES                        ║');
    console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

    // ============================================
    // TABLE 1: UserMaster
    // ============================================
    console.log('┌─ TABLE: UserMaster ─────────────────────────────────────────────────────────────┐\n');
    const users = await client.query(`
      SELECT UserID, email, first_name, last_name, 
             SUBSTRING(password_hash, 1, 20) || '...' as password_hash,
             SUBSTRING(api_key, 1, 15) || '...' as api_key,
             last_login, created_at
      FROM UserMaster
      ORDER BY created_at
    `);
    
    console.table(users.rows);
    console.log(`\nTotal Users: ${users.rows.length}\n`);

    // ============================================
    // TABLE 2: ApiEndpointMaster
    // ============================================
    console.log('┌─ TABLE: ApiEndpointMaster ──────────────────────────────────────────────────────┐\n');
    const endpoints = await client.query(`
      SELECT ApiEndpointID, ApiVersion, ApiEndpoint, EndpointType, 
             created_at, updated_at
      FROM ApiEndpointMaster
      ORDER BY created_at
      LIMIT 20
    `);
    
    console.table(endpoints.rows);
    
    const endpointCount = await client.query('SELECT COUNT(*) as total FROM ApiEndpointMaster');
    console.log(`\nTotal Endpoints: ${endpointCount.rows[0].total}\n`);

    // Statistics
    console.log('Endpoint Type Distribution:');
    const typeStats = await client.query(`
      SELECT EndpointType, COUNT(*) as count
      FROM ApiEndpointMaster
      GROUP BY EndpointType
      ORDER BY count DESC
    `);
    console.table(typeStats.rows);

    // ============================================
    // TABLE 3: UserApiLog
    // ============================================
    console.log('\n┌─ TABLE: UserApiLog ─────────────────────────────────────────────────────────────┐\n');
    const logs = await client.query(`
      SELECT UserApiLogID, UserID, ApiEndpointId, EndpointAccessDateTime, 
             IsRequestSucceeded, created_at
      FROM UserApiLog
      LIMIT 10
    `);
    
    if (logs.rows.length > 0) {
      console.table(logs.rows);
    } else {
      console.log('No API logs found (table is empty)\n');
    }

    const logCount = await client.query('SELECT COUNT(*) as total FROM UserApiLog');
    console.log(`\nTotal API Logs: ${logCount.rows[0].total}\n`);

    // ============================================
    // SUMMARY
    // ============================================
    console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                              DATABASE SUMMARY                                ║');
    console.log('╠════════════════════════════════════════════════════════════════════════════════╣');
    console.log(`║ Users in UserMaster:        ${String(users.rows.length).padEnd(56)} ║`);
    console.log(`║ Endpoints in ApiEndpointMaster: ${String(endpointCount.rows[0].total).padEnd(49)} ║`);
    console.log(`║ Logs in UserApiLog:         ${String(logCount.rows[0].total).padEnd(56)} ║`);
    console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

    await client.end();
  } catch(err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
