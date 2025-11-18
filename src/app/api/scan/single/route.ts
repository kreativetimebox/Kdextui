import { NextRequest, NextResponse } from 'next/server';

/**
 * Single Upload Endpoint - For individual invoices and receipts
 * POST /api/scan/single
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const documentType = formData.get('type') as string; // 'invoice' or 'receipt'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate document type
    if (!documentType || !['invoice', 'receipt'].includes(documentType)) {
      return NextResponse.json(
        { error: 'Invalid document type. Must be "invoice" or "receipt"' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/bmp',
      'image/tiff',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF or image files.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max for single upload)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual API integration
    // const backendResponse = await fetch('YOUR_BACKEND_API_URL/single', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const result = await backendResponse.json();

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock response based on document type
    const mockResponse = generateSingleUploadResponse(file, documentType);

    return NextResponse.json(mockResponse, { status: 200 });

  } catch (error: any) {
    console.error('Single Upload API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock response generator for single upload
function generateSingleUploadResponse(file: File, documentType: string) {
  const isInvoice = documentType === 'invoice';

  return {
    success: true,
    uploadType: 'single',
    documentType: documentType,
    filename: file.name,
    fileType: file.type,
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    processedAt: new Date().toISOString(),
    extractedData: isInvoice ? {
      documentInfo: {
        type: 'Invoice',
        documentNumber: `INV-2024-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
        issueDate: '2024-11-15',
        dueDate: '2024-12-15',
        status: 'Unpaid',
      },
      vendor: {
        name: 'ABC Corporation',
        address: '123 Business St, New York, NY 10001',
        taxId: '12-3456789',
        email: 'billing@abccorp.com',
        phone: '+1 (555) 123-4567',
      },
      customer: {
        name: 'Your Company Inc.',
        address: '456 Commerce Ave, Los Angeles, CA 90001',
        contactPerson: 'John Smith',
      },
      lineItems: [
        {
          itemNumber: 1,
          description: 'Professional Services - Consulting',
          quantity: 40,
          unitPrice: 150.00,
          amount: 6000.00,
          taxRate: 0.08,
        },
        {
          itemNumber: 2,
          description: 'Software License - Annual',
          quantity: 1,
          unitPrice: 2500.00,
          amount: 2500.00,
          taxRate: 0.08,
        },
      ],
      financialSummary: {
        subtotal: 8500.00,
        taxAmount: 680.00,
        discount: 0.00,
        totalAmount: 9180.00,
        currency: 'USD',
      },
      paymentInfo: {
        terms: 'Net 30',
        method: 'Bank Transfer',
        status: 'Pending',
      },
    } : {
      documentInfo: {
        type: 'Receipt',
        receiptNumber: `RCP-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
        date: '2024-11-15',
        time: '14:32:00',
        storeName: 'Office Supplies Plus',
        location: '789 Main St, Boston, MA 02101',
      },
      items: [
        {
          name: 'Office Paper - A4 (500 sheets)',
          quantity: 3,
          unitPrice: 8.99,
          amount: 26.97,
        },
        {
          name: 'Blue Ink Pens (Pack of 12)',
          quantity: 2,
          unitPrice: 5.49,
          amount: 10.98,
        },
        {
          name: 'Stapler - Heavy Duty',
          quantity: 1,
          unitPrice: 15.99,
          amount: 15.99,
        },
      ],
      financialSummary: {
        subtotal: 53.94,
        taxAmount: 4.32,
        totalAmount: 58.26,
        currency: 'USD',
      },
      payment: {
        method: 'Credit Card',
        cardType: 'Visa',
        lastFourDigits: '4532',
        transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      },
    },
    extractionMetadata: {
      confidence: 0.92 + Math.random() * 0.07,
      processingTime: '1.8s',
      fieldsExtracted: isInvoice ? 15 : 12,
      model: 'document-ai-v3',
      language: 'en',
    },
    validation: {
      passed: true,
      checks: {
        documentStructure: 'Valid',
        dataCompleteness: 'Complete',
        amountCalculation: 'Verified',
        dateFormat: 'Valid',
      },
    },
    suggestedActions: isInvoice ? [
      'Review line items for accuracy',
      'Verify vendor information',
      'Add to accounts payable',
      'Schedule payment before due date',
    ] : [
      'Categorize expense',
      'Attach to expense report',
      'Verify merchant details',
      'Archive receipt',
    ],
  };
}
