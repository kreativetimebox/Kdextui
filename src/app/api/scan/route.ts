import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const mode = formData.get('mode') as string || 'single';

    if (mode === 'bulk') {
      const count = parseInt(formData.get('count') as string || '0');
      const files: File[] = [];
      
      for (let i = 0; i < count; i++) {
        const file = formData.get(`file${i}`) as File;
        if (file) files.push(file);
      }

      if (files.length === 0) {
        return NextResponse.json(
          { error: 'No files provided' },
          { status: 400 }
        );
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate bulk response
      const bulkResponse = generateBulkResponse(files);
      return NextResponse.json(bulkResponse, { status: 200 });
    }

    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/bmp',
      'image/tiff',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      );
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 50MB limit' },
        { status: 400 }
      );
    }

    // TODO: Replace this with your actual API endpoint
    // Example: Send to your backend processing service
    // const backendResponse = await fetch('YOUR_BACKEND_API_URL', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const result = await backendResponse.json();

    // Mock response for demonstration
    // Replace this with actual API integration
    const mockResponse = mode === 'bank-statement' 
      ? generateBankStatementResponse(file.name, file.type)
      : generateMockResponse(file.name, file.type);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json(mockResponse, { status: 200 });

  } catch (error: any) {
    console.error('Scan API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock bulk response generator
function generateBulkResponse(files: File[]) {
  return {
    success: true,
    mode: 'bulk',
    processedAt: new Date().toISOString(),
    totalFiles: files.length,
    summary: {
      totalDocuments: files.length,
      successfullyProcessed: files.length,
      failed: 0,
      totalSize: files.reduce((sum, f) => sum + f.size, 0),
    },
    documents: files.map((file, index) => {
      // Generate full mock data for each file
      const isInvoice = file.name.toLowerCase().includes('invoice') || index % 2 === 0;
      
      return {
        index: index + 1,
        filename: file.name,
        fileType: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        status: 'Success',
        processedAt: new Date().toISOString(),
        // Full detailed data for each document
        detailedData: isInvoice ? {
          documentInfo: {
            type: 'Invoice',
            documentNumber: `INV-2024-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
            date: '2024-11-15',
            dueDate: '2024-12-15',
          },
          vendor: {
            name: `Vendor ${String.fromCharCode(65 + index)}`,
            address: `${100 + index * 23} Business St, New York, NY 10001`,
            taxId: `${10 + index}-${1000000 + index * 111111}`,
            email: `billing@vendor${index}.com`,
            phone: `+1 (555) ${100 + index * 11}-${1000 + index * 111}`,
          },
          customer: {
            name: 'XYZ Enterprises',
            address: '456 Commerce Ave, Los Angeles, CA 90001',
            contactPerson: 'John Smith',
          },
          lineItems: [
            {
              description: 'Professional Services',
              quantity: 10 + index * 5,
              unitPrice: 100.00 + index * 25,
              amount: (10 + index * 5) * (100.00 + index * 25),
              taxRate: 0.08,
            },
            {
              description: 'Software License',
              quantity: 1,
              unitPrice: 1500.00 + index * 100,
              amount: 1500.00 + index * 100,
              taxRate: 0.08,
            },
          ],
          financialSummary: {
            subtotal: (10 + index * 5) * (100.00 + index * 25) + (1500.00 + index * 100),
            taxAmount: ((10 + index * 5) * (100.00 + index * 25) + (1500.00 + index * 100)) * 0.08,
            totalAmount: ((10 + index * 5) * (100.00 + index * 25) + (1500.00 + index * 100)) * 1.08,
            currency: 'USD',
          },
        } : {
          documentInfo: {
            type: 'Receipt',
            receiptNumber: `RCP-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
            date: '2024-11-15',
            storeName: `Store ${String.fromCharCode(65 + index)}`,
          },
          items: [
            {
              name: `Product ${index + 1}`,
              quantity: Math.floor(Math.random() * 5) + 1,
              price: Math.random() * 100 + 10,
            },
            {
              name: `Product ${index + 2}`,
              quantity: Math.floor(Math.random() * 3) + 1,
              price: Math.random() * 50 + 5,
            },
          ],
          payment: {
            method: index % 3 === 0 ? 'Cash' : index % 3 === 1 ? 'Credit Card' : 'Debit Card',
            total: Math.random() * 200 + 50,
            tax: (Math.random() * 200 + 50) * 0.08,
          },
        },
        extractedFields: {
          documentType: isInvoice ? 'Invoice' : 'Receipt',
          confidence: 0.92 + Math.random() * 0.07,
          keyDataPoints: Math.floor(Math.random() * 20) + 10,
        },
      };
    }),
    aggregatedData: {
      totalAmount: files.length * 1500 + Math.random() * 5000,
      currency: 'USD',
      documentTypes: {
        Invoices: Math.floor(files.length * 0.6),
        Receipts: Math.floor(files.length * 0.4),
      },
    },
    metadata: {
      processingTime: `${(files.length * 1.2).toFixed(1)}s`,
      apiVersion: '1.0',
      batchId: `BATCH-${Date.now()}`,
    },
  };
}

// Mock bank statement response generator
function generateBankStatementResponse(filename: string, fileType: string) {
  return {
    success: true,
    mode: 'bank-statement',
    filename: filename,
    fileType: fileType,
    processedAt: new Date().toISOString(),
    statementInfo: {
      accountNumber: '****7890',
      accountHolder: 'John Doe',
      bank: 'First National Bank',
      statementPeriod: {
        from: '2024-10-01',
        to: '2024-10-31',
      },
      branch: 'Main Street Branch',
    },
    accountSummary: {
      openingBalance: 15750.00,
      closingBalance: 18340.50,
      totalDeposits: 12500.00,
      totalWithdrawals: 9909.50,
      netChange: 2590.50,
      currency: 'USD',
    },
    transactions: [
      {
        date: '2024-10-01',
        description: 'Salary Deposit - ABC Corp',
        type: 'Credit',
        amount: 5000.00,
        balance: 20750.00,
        reference: 'SAL-OCT-2024',
      },
      {
        date: '2024-10-03',
        description: 'Rent Payment',
        type: 'Debit',
        amount: -1500.00,
        balance: 19250.00,
        reference: 'RENT-001',
      },
      {
        date: '2024-10-05',
        description: 'Grocery Store Purchase',
        type: 'Debit',
        amount: -250.50,
        balance: 18999.50,
        reference: 'POS-12345',
      },
      {
        date: '2024-10-08',
        description: 'Freelance Payment Received',
        type: 'Credit',
        amount: 2500.00,
        balance: 21499.50,
        reference: 'FRL-8901',
      },
      {
        date: '2024-10-12',
        description: 'Utility Bill - Electricity',
        type: 'Debit',
        amount: -180.00,
        balance: 21319.50,
        reference: 'UTIL-ELEC',
      },
      {
        date: '2024-10-15',
        description: 'Online Shopping',
        type: 'Debit',
        amount: -450.00,
        balance: 20869.50,
        reference: 'WEB-99876',
      },
      {
        date: '2024-10-18',
        description: 'Investment Dividend',
        type: 'Credit',
        amount: 1200.00,
        balance: 22069.50,
        reference: 'DIV-Q4-2024',
      },
      {
        date: '2024-10-20',
        description: 'Insurance Premium',
        type: 'Debit',
        amount: -500.00,
        balance: 21569.50,
        reference: 'INS-PREM',
      },
      {
        date: '2024-10-25',
        description: 'Restaurant Payment',
        type: 'Debit',
        amount: -125.00,
        balance: 21444.50,
        reference: 'POS-67890',
      },
      {
        date: '2024-10-28',
        description: 'Consulting Income',
        type: 'Credit',
        amount: 3800.00,
        balance: 25244.50,
        reference: 'CONS-INV-205',
      },
      {
        date: '2024-10-30',
        description: 'ATM Withdrawal',
        type: 'Debit',
        amount: -300.00,
        balance: 24944.50,
        reference: 'ATM-11223',
      },
      {
        date: '2024-10-31',
        description: 'Monthly Service Charge',
        type: 'Debit',
        amount: -15.00,
        balance: 24929.50,
        reference: 'SVC-CHRG',
      },
    ],
    categoryBreakdown: {
      Income: {
        Salary: 5000.00,
        Freelance: 2500.00,
        Investment: 1200.00,
        Consulting: 3800.00,
        total: 12500.00,
      },
      Expenses: {
        Housing: 1500.00,
        Groceries: 250.50,
        Utilities: 180.00,
        Shopping: 450.00,
        Insurance: 500.00,
        Dining: 125.00,
        Cash: 300.00,
        Fees: 15.00,
        total: 3320.50,
      },
    },
    insights: {
      largestDeposit: { amount: 5000.00, description: 'Salary Deposit - ABC Corp' },
      largestWithdrawal: { amount: 1500.00, description: 'Rent Payment' },
      averageTransactionAmount: 1041.63,
      totalTransactions: 12,
      savingsRate: 0.20,
    },
    metadata: {
      processingTime: '3.2s',
      apiVersion: '1.0',
      model: 'bank-statement-ai-v2',
      confidence: 0.98,
    },
  };
}

// Mock response generator - Replace with actual API integration
function generateMockResponse(filename: string, fileType: string) {
  const fileExtension = filename.split('.').pop()?.toLowerCase();

  // Generate different mock responses based on file type
  if (fileType.includes('pdf') || fileType.includes('image')) {
    return {
      success: true,
      filename: filename,
      fileType: fileType,
      processedAt: new Date().toISOString(),
      documentInfo: {
        type: 'Invoice',
        documentNumber: 'INV-2024-001234',
        date: '2024-11-15',
        dueDate: '2024-12-15',
      },
      vendor: {
        name: 'ABC Corporation',
        address: '123 Business St, New York, NY 10001',
        taxId: '12-3456789',
        email: 'billing@abccorp.com',
        phone: '+1 (555) 123-4567',
      },
      customer: {
        name: 'XYZ Enterprises',
        address: '456 Commerce Ave, Los Angeles, CA 90001',
        taxId: '98-7654321',
        contactPerson: 'John Smith',
      },
      lineItems: [
        {
          description: 'Professional Services - Consulting',
          quantity: 40,
          unitPrice: 150.00,
          amount: 6000.00,
          taxRate: 0.08,
        },
        {
          description: 'Software License - Annual',
          quantity: 1,
          unitPrice: 2500.00,
          amount: 2500.00,
          taxRate: 0.08,
        },
        {
          description: 'Support & Maintenance',
          quantity: 12,
          unitPrice: 200.00,
          amount: 2400.00,
          taxRate: 0.08,
        },
      ],
      financialSummary: {
        subtotal: 10900.00,
        taxAmount: 872.00,
        discount: 0.00,
        shippingCost: 0.00,
        totalAmount: 11772.00,
        currency: 'USD',
      },
      paymentInfo: {
        method: 'Bank Transfer',
        terms: 'Net 30',
        accountNumber: '****1234',
        routingNumber: '****5678',
        status: 'Pending',
      },
      extractedText: {
        confidence: 0.96,
        language: 'en',
        pageCount: 1,
      },
      metadata: {
        processingTime: '2.4s',
        apiVersion: '1.0',
        model: 'document-ai-v2',
      },
    };
  } else if (fileExtension === 'csv' || fileExtension === 'xlsx' || fileExtension === 'xls') {
    return {
      success: true,
      filename: filename,
      fileType: fileType,
      processedAt: new Date().toISOString(),
      spreadsheetInfo: {
        totalRows: 150,
        totalColumns: 8,
        sheetNames: ['Transactions', 'Summary', 'Categories'],
      },
      transactions: [
        {
          date: '2024-11-01',
          description: 'Office Supplies Purchase',
          category: 'Expenses',
          amount: -450.00,
          balance: 12550.00,
        },
        {
          date: '2024-11-05',
          description: 'Client Payment - Project Alpha',
          category: 'Revenue',
          amount: 5000.00,
          balance: 17550.00,
        },
        {
          date: '2024-11-10',
          description: 'Software Subscription',
          category: 'Expenses',
          amount: -299.00,
          balance: 17251.00,
        },
        {
          date: '2024-11-15',
          description: 'Consulting Services Revenue',
          category: 'Revenue',
          amount: 3500.00,
          balance: 20751.00,
        },
      ],
      summary: {
        totalRevenue: 8500.00,
        totalExpenses: 749.00,
        netIncome: 7751.00,
        averageTransactionAmount: 2312.25,
        largestTransaction: 5000.00,
      },
      categoryBreakdown: {
        Revenue: 8500.00,
        Expenses: 749.00,
      },
      metadata: {
        processingTime: '1.8s',
        dataQuality: 'High',
        missingValues: 0,
      },
    };
  } else if (fileExtension === 'txt' || fileExtension === 'doc' || fileExtension === 'docx') {
    return {
      success: true,
      filename: filename,
      fileType: fileType,
      processedAt: new Date().toISOString(),
      documentAnalysis: {
        documentType: 'Business Report',
        wordCount: 1247,
        pageCount: 4,
        language: 'English',
        readingTime: '6 minutes',
      },
      extractedEntities: {
        organizations: ['ABC Corporation', 'Tech Innovations Inc', 'Global Finance Ltd'],
        persons: ['John Smith', 'Sarah Johnson', 'Michael Chen'],
        locations: ['New York', 'San Francisco', 'London'],
        dates: ['2024-11-15', '2024-12-01', '2024-Q4'],
        amounts: ['$1,200,000', '$500,000', '$2.5M'],
      },
      keyInsights: [
        {
          type: 'Financial',
          content: 'Q4 revenue projected at $2.5M, representing 15% growth YoY',
          confidence: 0.94,
        },
        {
          type: 'Strategic',
          content: 'Partnership with Tech Innovations Inc to be finalized by December',
          confidence: 0.89,
        },
        {
          type: 'Operational',
          content: 'New office expansion in London planned for Q1 2025',
          confidence: 0.92,
        },
      ],
      sentiment: {
        overall: 'Positive',
        score: 0.78,
        breakdown: {
          positive: 0.65,
          neutral: 0.28,
          negative: 0.07,
        },
      },
      topics: [
        { topic: 'Financial Performance', relevance: 0.92 },
        { topic: 'Business Strategy', relevance: 0.85 },
        { topic: 'Market Analysis', relevance: 0.78 },
        { topic: 'Operational Updates', relevance: 0.71 },
      ],
      metadata: {
        processingTime: '3.1s',
        apiVersion: '1.0',
        model: 'nlp-advanced-v3',
      },
    };
  }

  // Default generic response
  return {
    success: true,
    filename: filename,
    fileType: fileType,
    processedAt: new Date().toISOString(),
    message: 'Document processed successfully',
    extractedData: {
      format: fileExtension?.toUpperCase(),
      status: 'Completed',
      confidence: 0.95,
    },
    metadata: {
      processingTime: '2.0s',
      apiVersion: '1.0',
    },
  };
}
