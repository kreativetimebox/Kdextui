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
    console.log('\n📝 Inserting UserApiLog data...\n');

    // Get actual UserIDs and ApiEndpointIDs from the database
    const usersResult = await client.query('SELECT UserID FROM UserMaster ORDER BY created_at LIMIT 5');
    const endpointsResult = await client.query('SELECT ApiEndpointID FROM ApiEndpointMaster ORDER BY created_at LIMIT 10');

    const userIds = usersResult.rows.map(r => r.userid);
    const endpointIds = endpointsResult.rows.map(r => r.apiendpointid);

    console.log(`Found ${userIds.length} users and ${endpointIds.length} endpoints in database\n`);

    // Create insert statement with actual IDs
    const values = [
      ['b9b0bd55-a41c-4d21-b832-b18296bb808f', userIds[0], endpointIds[0], '2025-09-13', false, '2025-04-29', '2025-10-13'],
      ['d750ba3c-f51a-45a3-b0ed-c70b00040872', userIds[1], endpointIds[1], '2025-09-26', false, '2025-01-23', '2025-05-02'],
      ['dd9d27d9-9ba7-443a-a7bd-fa87145bf771', userIds[2], endpointIds[2], '2024-11-30', true, '2025-11-02', '2025-08-01'],
      ['485e80f8-c437-4ee9-ba18-47c822e97a90', userIds[3], endpointIds[3], '2025-10-14', false, '2025-01-16', '2024-11-27'],
      ['348cc40b-39c7-49de-89a1-97bd98582d89', userIds[4], endpointIds[4], '2024-12-20', true, '2025-04-19', '2025-04-18'],
      ['73bca3ca-4ea0-4668-b3cd-394939e18249', userIds[0], endpointIds[5], '2025-06-30', false, '2025-09-23', '2025-09-08'],
      ['c2c00a6a-f046-4bc8-a9f0-1d6bb1eca31f', userIds[1], endpointIds[6], '2025-04-11', false, '2025-10-05', '2024-11-19'],
      ['39bb5d23-2f6f-4896-ab34-a03a3c63c13a', userIds[2], endpointIds[7], '2025-02-05', false, '2025-06-02', '2025-06-17'],
      ['438e5099-9598-4196-ad5d-bd385195c4e0', userIds[3], endpointIds[8], '2025-04-14', false, '2025-07-05', '2025-04-26'],
      ['7c0dff93-1883-4632-828d-140e33661b5e', userIds[4], endpointIds[9], '2025-04-30', false, '2025-10-08', '2025-02-02']
    ];

    let insertQuery = `
      INSERT INTO UserApiLog (UserApiLogID, UserID, ApiEndpointId, EndpointAccessDateTime, IsRequestSucceeded, created_at, updated_at)
      VALUES
    `;

    values.forEach((val, idx) => {
      const isLast = idx === values.length - 1;
      insertQuery += `
        ('${val[0]}', '${val[1]}', '${val[2]}', '${val[3]}', ${val[4]}, '${val[5]}', '${val[6]}')${isLast ? '' : ','}
      `;
    });

    insertQuery += ` ON CONFLICT (UserApiLogID) DO NOTHING;`;

    await client.query(insertQuery);

    // Get statistics
    const result = await client.query('SELECT COUNT(*) as total FROM UserApiLog');
    const successCount = await client.query('SELECT COUNT(*) as total FROM UserApiLog WHERE IsRequestSucceeded = true');
    const failureCount = await client.query('SELECT COUNT(*) as total FROM UserApiLog WHERE IsRequestSucceeded = false');

    console.log('✅ Successfully inserted UserApiLog data!\n');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 UserApiLog Statistics:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Total API Log Entries: ${result.rows[0].total}`);
    console.log(`Successful Requests:  ${successCount.rows[0].total}`);
    console.log(`Failed Requests:      ${failureCount.rows[0].total}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    // Show sample logs
    const logs = await client.query(`
      SELECT UserApiLogID, 
             SUBSTRING(UserID::text, 1, 8) || '...' as UserID,
             SUBSTRING(ApiEndpointId::text, 1, 8) || '...' as ApiEndpointId,
             TO_CHAR(EndpointAccessDateTime, 'YYYY-MM-DD') as access_date,
             IsRequestSucceeded as success
      FROM UserApiLog
      ORDER BY created_at DESC
      LIMIT 10
    `);

    console.log('Recent API Logs:');
    console.table(logs.rows);

    await client.end();
  } catch(err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
