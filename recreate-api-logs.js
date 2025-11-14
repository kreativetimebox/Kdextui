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
    console.log('\n📝 Replacing UserApiLog data with valid references...\n');

    // Get all UserIDs from UserMaster
    const usersResult = await client.query('SELECT UserID FROM UserMaster ORDER BY created_at');
    const userIds = usersResult.rows.map(r => r.userid);

    // Get all ApiEndpointIDs from ApiEndpointMaster
    const endpointsResult = await client.query('SELECT ApiEndpointID FROM ApiEndpointMaster ORDER BY created_at');
    const endpointIds = endpointsResult.rows.map(r => r.apiendpointid);

    console.log(`✓ Found ${userIds.length} users and ${endpointIds.length} endpoints in database\n`);

    // Data structure with provided details (we'll use DB IDs for FK references)
    const logData = [
      { UserApiLogID: 'b9b0bd55-a41c-4d21-b832-b18296bb808f', userIndex: 0, endpointIndex: 0, accessDate: '2025-09-13', success: false, createdAt: '2025-04-29', updatedAt: '2025-10-13' },
      { UserApiLogID: 'd750ba3c-f51a-45a3-b0ed-c70b00040872', userIndex: 1, endpointIndex: 1, accessDate: '2025-09-26', success: false, createdAt: '2025-01-23', updatedAt: '2025-05-02' },
      { UserApiLogID: 'dd9d27d9-9ba7-443a-a7bd-fa87145bf771', userIndex: 2, endpointIndex: 2, accessDate: '2024-11-30', success: true, createdAt: '2025-11-02', updatedAt: '2025-08-01' },
      { UserApiLogID: '485e80f8-c437-4ee9-ba18-47c822e97a90', userIndex: 3, endpointIndex: 3, accessDate: '2025-10-14', success: false, createdAt: '2025-01-16', updatedAt: '2024-11-27' },
      { UserApiLogID: '348cc40b-39c7-49de-89a1-97bd98582d89', userIndex: 4, endpointIndex: 4, accessDate: '2024-12-20', success: true, createdAt: '2025-04-19', updatedAt: '2025-04-18' },
      { UserApiLogID: '73bca3ca-4ea0-4668-b3cd-394939e18249', userIndex: 0, endpointIndex: 5, accessDate: '2025-06-30', success: false, createdAt: '2025-09-23', updatedAt: '2025-09-08' },
      { UserApiLogID: 'c2c00a6a-f046-4bc8-a9f0-1d6bb1eca31f', userIndex: 1, endpointIndex: 6, accessDate: '2025-04-11', success: false, createdAt: '2025-10-05', updatedAt: '2024-11-19' },
      { UserApiLogID: '39bb5d23-2f6f-4896-ab34-a03a3c63c13a', userIndex: 2, endpointIndex: 7, accessDate: '2025-02-05', success: false, createdAt: '2025-06-02', updatedAt: '2025-06-17' },
      { UserApiLogID: '438e5099-9598-4196-ad5d-bd385195c4e0', userIndex: 3, endpointIndex: 8, accessDate: '2025-04-14', success: false, createdAt: '2025-07-05', updatedAt: '2025-04-26' },
      { UserApiLogID: '7c0dff93-1883-4632-828d-140e33661b5e', userIndex: 4, endpointIndex: 9, accessDate: '2025-04-30', success: false, createdAt: '2025-10-08', updatedAt: '2025-02-02' }
    ];

    // Clear existing data
    console.log('🗑️  Clearing existing UserApiLog table...');
    await client.query('DELETE FROM UserApiLog');
    console.log('✅ Table cleared\n');

    // Build insert query with actual references
    console.log('📝 Building insert statement with valid user and endpoint references...\n');
    
    let insertQuery = `
      INSERT INTO UserApiLog (UserApiLogID, UserID, ApiEndpointId, EndpointAccessDateTime, IsRequestSucceeded, created_at, updated_at)
      VALUES
    `;

    logData.forEach((log, idx) => {
      const isLast = idx === logData.length - 1;
      const userId = userIds[log.userIndex % userIds.length];
      const endpointId = endpointIds[log.endpointIndex % endpointIds.length];
      
      insertQuery += `
        ('${log.UserApiLogID}', '${userId}', '${endpointId}', '${log.accessDate}', ${log.success}, '${log.createdAt}', '${log.updatedAt}')${isLast ? '' : ','}
      `;
    });

    insertQuery += `;`;

    await client.query(insertQuery);

    // Verify insertion
    const result = await client.query('SELECT COUNT(*) as total FROM UserApiLog');
    const successCount = await client.query('SELECT COUNT(*) as success_count FROM UserApiLog WHERE IsRequestSucceeded = true');
    const failureCount = await client.query('SELECT COUNT(*) as fail_count FROM UserApiLog WHERE IsRequestSucceeded = false');

    console.log('✅ Successfully replaced UserApiLog data!\n');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 UserApiLog Statistics:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Total API Log Entries:  ${result.rows[0].total}`);
    console.log(`Successful Requests:   ${successCount.rows[0].success_count}`);
    console.log(`Failed Requests:       ${failureCount.rows[0].fail_count}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    // Show user distribution
    console.log('📊 Logs by User:');
    const userLogs = await client.query(`
      SELECT 
        um.email,
        COUNT(ual.UserApiLogID) as log_count,
        SUM(CASE WHEN ual.IsRequestSucceeded = true THEN 1 ELSE 0 END) as successful,
        SUM(CASE WHEN ual.IsRequestSucceeded = false THEN 1 ELSE 0 END) as failed
      FROM UserMaster um
      LEFT JOIN UserApiLog ual ON um.UserID = ual.UserID
      GROUP BY um.email
      ORDER BY log_count DESC
    `);
    console.table(userLogs.rows);

    // Show endpoint distribution
    console.log('\n📊 Logs by Endpoint:');
    const endpointLogs = await client.query(`
      SELECT 
        aem.ApiEndpoint,
        aem.EndpointType,
        COUNT(ual.UserApiLogID) as log_count,
        SUM(CASE WHEN ual.IsRequestSucceeded = true THEN 1 ELSE 0 END) as successful
      FROM ApiEndpointMaster aem
      LEFT JOIN UserApiLog ual ON aem.ApiEndpointID = ual.ApiEndpointId
      WHERE ual.UserApiLogID IS NOT NULL
      GROUP BY aem.ApiEndpoint, aem.EndpointType
      ORDER BY log_count DESC
    `);
    console.table(endpointLogs.rows);

    // Show sample data
    console.log('\n📋 Sample API Logs (all 10 entries):');
    const samples = await client.query(`
      SELECT 
        SUBSTRING(ual.UserApiLogID::text, 1, 8) || '...' as LogID,
        um.email as user_email,
        aem.ApiEndpoint as endpoint,
        aem.EndpointType as type,
        TO_CHAR(ual.EndpointAccessDateTime, 'YYYY-MM-DD') as access_date,
        ual.IsRequestSucceeded as success,
        TO_CHAR(ual.created_at, 'YYYY-MM-DD') as created
      FROM UserApiLog ual
      JOIN UserMaster um ON ual.UserID = um.UserID
      JOIN ApiEndpointMaster aem ON ual.ApiEndpointId = aem.ApiEndpointID
      ORDER BY ual.created_at DESC
    `);
    console.table(samples.rows);

    console.log('\n✅ UserApiLog data successfully replaced with valid references!\n');

    await client.end();
  } catch(err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
