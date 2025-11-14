const pg = require('pg');
const { v4: uuidv4 } = require('uuid');

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
    console.log('\n📋 Generating API Endpoint Mappings...\n');

    // Define endpoints and their valid types
    const uploadDocumentTypes = ['ReceiptPDF', 'ReceiptImage', 'InvoicePDF', 'InvoiceImage'];
    const bankStatementTypes = ['BankStatementPDF', 'BankStatementExcel', 'BankStatementCSV', 'BankStatementWord'];

    const endpoints = [
      { name: 'api/upload-document', types: uploadDocumentTypes },
      { name: 'api/bulk-upload-files', types: uploadDocumentTypes },
      { name: 'api/process-bank-statement', types: bankStatementTypes }
    ];

    // Generate all possible mappings
    const mappings = [];
    endpoints.forEach(endpoint => {
      endpoint.types.forEach(type => {
        mappings.push({
          ApiEndpointID: uuidv4(),
          ApiVersion: 'v1',
          ApiEndpoint: endpoint.name,
          EndpointType: type,
          created_at: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString().split('T')[0]
        });
      });
    });

    console.log('Generated Mappings:');
    console.log('═════════════════════════════════════════════════════════════');
    console.table(mappings);

    console.log(`\n✨ Total mappings generated: ${mappings.length}`);
    console.log('  - api/upload-document: 4 types');
    console.log('  - api/bulk-upload-files: 4 types');
    console.log('  - api/process-bank-statement: 4 types');
    console.log('═════════════════════════════════════════════════════════════\n');

    // Clear existing data
    console.log('🗑️  Clearing existing ApiEndpointMaster table...');
    await client.query('DELETE FROM ApiEndpointMaster');
    console.log('✅ Table cleared\n');

    // Build and execute insert query
    console.log('📝 Inserting new API endpoint mappings...\n');
    
    let insertQuery = `
      INSERT INTO ApiEndpointMaster (ApiEndpointID, ApiVersion, ApiEndpoint, EndpointType, created_at, updated_at)
      VALUES
    `;

    mappings.forEach((mapping, idx) => {
      const isLast = idx === mappings.length - 1;
      insertQuery += `
        ('${mapping.ApiEndpointID}', '${mapping.ApiVersion}', '${mapping.ApiEndpoint}', '${mapping.EndpointType}', '${mapping.created_at}', '${mapping.updated_at}')${isLast ? '' : ','}
      `;
    });

    insertQuery += `;`;

    await client.query(insertQuery);

    // Verify insertion
    const result = await client.query('SELECT COUNT(*) as total FROM ApiEndpointMaster');
    console.log('✅ Successfully inserted all API endpoint mappings!\n');
    console.log('═════════════════════════════════════════════════════════════');
    console.log(`Total Endpoints in Database: ${result.rows[0].total}`);
    console.log('═════════════════════════════════════════════════════════════\n');

    // Show statistics by endpoint
    console.log('📊 Endpoint Statistics:');
    const stats = await client.query(`
      SELECT ApiEndpoint, COUNT(*) as type_count
      FROM ApiEndpointMaster
      GROUP BY ApiEndpoint
      ORDER BY ApiEndpoint
    `);
    console.table(stats.rows);

    // Show statistics by type
    console.log('\n📊 EndpointType Statistics:');
    const typeStats = await client.query(`
      SELECT EndpointType, COUNT(*) as endpoint_count
      FROM ApiEndpointMaster
      GROUP BY EndpointType
      ORDER BY EndpointType
    `);
    console.table(typeStats.rows);

    // Show sample data
    console.log('\n📋 Sample Data (first 12 entries):');
    const samples = await client.query(`
      SELECT 
        SUBSTRING(ApiEndpointID::text, 1, 8) || '...' as id,
        ApiVersion as version,
        ApiEndpoint as endpoint,
        EndpointType as type,
        TO_CHAR(created_at, 'YYYY-MM-DD') as created
      FROM ApiEndpointMaster
      ORDER BY ApiEndpoint, EndpointType
      LIMIT 12
    `);
    console.table(samples.rows);

    console.log('\n✅ All API endpoints configured successfully!\n');

    await client.end();
  } catch(err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
