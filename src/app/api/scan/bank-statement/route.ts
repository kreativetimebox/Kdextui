import { NextRequest, NextResponse } from 'next/server';

/**
 * Bank Statement Upload Endpoint - For bank statements only
 * POST /api/scan/bank-statement
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type - Bank statements are typically PDF, CSV, or Excel
    const allowedTypes = [
      'application/pdf',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Bank statements must be PDF, CSV, or Excel format.' },
        { status: 400 }
      );
    }

    // Validate file size (20MB max for bank statements)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 20MB limit' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual API integration
    // const backendResponse = await fetch('YOUR_BACKEND_API_URL/bank-statement', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const result = await backendResponse.json();

    // Simulate processing delay (bank statements take longer)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock bank statement response
    const mockResponse = generateBankStatementResponse(file);

    return NextResponse.json(mockResponse, { status: 200 });

  } catch (error: any) {
    console.error('Bank Statement API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock response generator for bank statements
function generateBankStatementResponse(file: File) {
  // Generate random transactions
  const transactions = generateRandomTransactions(25);
  const openingBalance = 15000 + Math.random() * 10000;
  const totalDeposits = transactions.filter(t => t.type === 'Credit').reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = Math.abs(transactions.filter(t => t.type === 'Debit').reduce((sum, t) => sum + t.amount, 0));
  const closingBalance = openingBalance + totalDeposits - totalWithdrawals;

  return {
    success: true,
    uploadType: 'bank-statement',
    filename: file.name,
    fileType: file.type,
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    processedAt: new Date().toISOString(),
    statementInfo: {
      accountNumber: `****${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      accountHolder: 'John Doe',
      accountType: 'Business Checking',
      bank: 'First National Bank',
      bankCode: 'FNB',
      branch: 'Main Street Branch',
      branchCode: 'MSB-001',
      statementPeriod: {
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
        days: 30,
      },
    },
    accountSummary: {
      openingBalance: parseFloat(openingBalance.toFixed(2)),
      closingBalance: parseFloat(closingBalance.toFixed(2)),
      totalDeposits: parseFloat(totalDeposits.toFixed(2)),
      totalWithdrawals: parseFloat(totalWithdrawals.toFixed(2)),
      netChange: parseFloat((closingBalance - openingBalance).toFixed(2)),
      currency: 'USD',
    },
    transactions: transactions,
    categoryBreakdown: {
      income: {
        salary: parseFloat((totalDeposits * 0.4).toFixed(2)),
        freelance: parseFloat((totalDeposits * 0.25).toFixed(2)),
        investment: parseFloat((totalDeposits * 0.2).toFixed(2)),
        other: parseFloat((totalDeposits * 0.15).toFixed(2)),
        total: parseFloat(totalDeposits.toFixed(2)),
      },
      expenses: {
        housing: parseFloat((totalWithdrawals * 0.35).toFixed(2)),
        utilities: parseFloat((totalWithdrawals * 0.12).toFixed(2)),
        groceries: parseFloat((totalWithdrawals * 0.15).toFixed(2)),
        transportation: parseFloat((totalWithdrawals * 0.10).toFixed(2)),
        entertainment: parseFloat((totalWithdrawals * 0.08).toFixed(2)),
        healthcare: parseFloat((totalWithdrawals * 0.07).toFixed(2)),
        other: parseFloat((totalWithdrawals * 0.13).toFixed(2)),
        total: parseFloat(totalWithdrawals.toFixed(2)),
      },
    },
    insights: {
      largestDeposit: {
        amount: Math.max(...transactions.filter(t => t.type === 'Credit').map(t => t.amount)),
        description: 'Salary Deposit - ABC Corp',
        date: transactions.find(t => t.type === 'Credit')?.date || '',
      },
      largestWithdrawal: {
        amount: Math.max(...transactions.filter(t => t.type === 'Debit').map(t => Math.abs(t.amount))),
        description: 'Rent Payment',
        date: transactions.find(t => t.type === 'Debit')?.date || '',
      },
      averageTransactionAmount: parseFloat((Math.abs(totalDeposits + totalWithdrawals) / transactions.length).toFixed(2)),
      totalTransactions: transactions.length,
      savingsRate: parseFloat(((totalDeposits - totalWithdrawals) / totalDeposits).toFixed(2)),
      cashFlow: {
        positive: totalDeposits > totalWithdrawals,
        trend: 'Improving',
        monthOverMonthChange: '+12%',
      },
    },
    alerts: [
      {
        type: 'info',
        message: 'Account balance increased by ' + ((closingBalance - openingBalance) / openingBalance * 100).toFixed(1) + '%',
        severity: 'low',
      },
      ...(closingBalance < 5000 ? [{
        type: 'warning',
        message: 'Account balance is below $5,000',
        severity: 'medium',
      }] : []),
    ],
    reconciliation: {
      status: 'Completed',
      unmatchedTransactions: 0,
      duplicates: 0,
      missingTransactions: 0,
      accuracy: 100,
    },
    exportOptions: [
      'CSV',
      'Excel',
      'PDF Report',
      'QuickBooks',
      'Xero',
      'JSON',
    ],
    metadata: {
      processingTime: '4.2s',
      apiVersion: '1.0',
      model: 'bank-statement-ai-v3',
      confidence: 0.97,
      pagesProcessed: Math.ceil(transactions.length / 10),
      transactionsExtracted: transactions.length,
    },
  };
}

// Helper function to generate random transactions
function generateRandomTransactions(count: number) {
  const transactionTypes = [
    { type: 'Credit', descriptions: ['Salary Deposit', 'Freelance Payment', 'Investment Dividend', 'Consulting Income', 'Refund', 'Client Payment'] },
    { type: 'Debit', descriptions: ['Rent Payment', 'Utility Bill', 'Grocery Store', 'Restaurant', 'Gas Station', 'Online Shopping', 'Insurance Premium', 'ATM Withdrawal', 'Healthcare', 'Subscription'] },
  ];

  const transactions = [];
  let runningBalance = 15000 + Math.random() * 10000;

  for (let i = 0; i < count; i++) {
    const isCredit = Math.random() > 0.4; // 40% credit, 60% debit
    const typeData = transactionTypes[isCredit ? 0 : 1];
    const description = typeData.descriptions[Math.floor(Math.random() * typeData.descriptions.length)];
    const amount = isCredit 
      ? parseFloat((Math.random() * 3000 + 500).toFixed(2))
      : -parseFloat((Math.random() * 800 + 50).toFixed(2));
    
    runningBalance += amount;

    transactions.push({
      id: `TXN-${Date.now()}-${i}`,
      date: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: description + (isCredit ? ' - ABC Corp' : ''),
      type: typeData.type,
      amount: amount,
      balance: parseFloat(runningBalance.toFixed(2)),
      reference: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      category: isCredit ? 'Income' : 'Expense',
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
