import { NextRequest, NextResponse } from 'next/server';

/**
 * Bulk Upload Endpoint - For multiple invoices and receipts
 * POST /api/scan/bulk
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fileCount = parseInt(formData.get('count') as string || '0');
    const files: File[] = [];
    
    // Collect all files
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file${i}`) as File;
      if (file) files.push(file);
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate file count (max 50 files per batch)
    if (files.length > 50) {
      return NextResponse.json(
        { error: 'Maximum 50 files allowed per batch upload' },
        { status: 400 }
      );
    }

    // Validate each file
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

    const maxFileSize = 10 * 1024 * 1024; // 10MB per file
    const invalidFiles: string[] = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        invalidFiles.push(`${file.name} (unsupported type)`);
      } else if (file.size > maxFileSize) {
        invalidFiles.push(`${file.name} (exceeds 10MB)`);
      }
    }

    if (invalidFiles.length > 0) {
      return NextResponse.json(
        { 
          error: 'Some files are invalid',
          invalidFiles: invalidFiles,
          message: 'Please remove invalid files and try again'
        },
        { status: 400 }
      );
    }

    // TODO: Replace with actual API integration
    // const backendResponse = await fetch('YOUR_BACKEND_API_URL/bulk', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const result = await backendResponse.json();

    // Simulate processing delay (longer for bulk)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock bulk response
    const bulkResponse = generateBulkUploadResponse(files);

    return NextResponse.json(bulkResponse, { status: 200 });

  } catch (error: any) {
    console.error('Bulk Upload API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock response generator for bulk upload
function generateBulkUploadResponse(files: File[]) {
  const documents = files.map((file, index) => {
    // Determine document type based on filename or random
    const isInvoice = file.name.toLowerCase().includes('invoice') || 
                      file.name.toLowerCase().includes('inv') || 
                      index % 2 === 0;
    
    const documentType = isInvoice ? 'invoice' : 'receipt';
    const confidence = 0.88 + Math.random() * 0.11;

    return {
      id: `DOC-${Date.now()}-${index}`,
      index: index + 1,
      filename: file.name,
      fileType: file.type,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      documentType: documentType,
      status: confidence > 0.95 ? 'verified' : confidence > 0.90 ? 'processing' : 'pending',
      uploadDate: new Date().toISOString(),
      extractedData: isInvoice ? {
        type: 'Invoice',
        vendor: `Vendor ${String.fromCharCode(65 + (index % 26))}`,
        documentNumber: `INV-2024-${String(10000 + index).padStart(6, '0')}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amount: parseFloat((Math.random() * 5000 + 500).toFixed(2)),
        currency: 'USD',
        description: `Professional services and consulting for project ${index + 1}`,
      } : {
        type: 'Receipt',
        vendor: `Store ${String.fromCharCode(65 + (index % 26))}`,
        receiptNumber: `RCP-${String(20000 + index).padStart(6, '0')}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amount: parseFloat((Math.random() * 500 + 10).toFixed(2)),
        currency: 'USD',
        description: `Office supplies and equipment purchase`,
      },
      confidence: parseFloat(confidence.toFixed(2)),
      processingTime: `${(Math.random() * 2 + 1).toFixed(1)}s`,
    };
  });

  // Calculate statistics
  const totalAmount = documents.reduce((sum, doc) => sum + (doc.extractedData.amount || 0), 0);
  const invoiceCount = documents.filter(d => d.documentType === 'invoice').length;
  const receiptCount = documents.filter(d => d.documentType === 'receipt').length;
  const statusCounts = {
    verified: documents.filter(d => d.status === 'verified').length,
    processing: documents.filter(d => d.status === 'processing').length,
    pending: documents.filter(d => d.status === 'pending').length,
  };

  return {
    success: true,
    uploadType: 'bulk',
    processedAt: new Date().toISOString(),
    batchId: `BATCH-${Date.now()}`,
    summary: {
      totalFiles: files.length,
      successfullyProcessed: files.length,
      failed: 0,
      totalSize: files.reduce((sum, f) => sum + f.size, 0),
      totalSizeMB: parseFloat((files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2)),
    },
    documents: documents,
    statistics: {
      documentTypes: {
        invoices: invoiceCount,
        receipts: receiptCount,
      },
      statusBreakdown: statusCounts,
      financialSummary: {
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        averageAmount: parseFloat((totalAmount / documents.length).toFixed(2)),
        currency: 'USD',
      },
      averageConfidence: parseFloat((documents.reduce((sum, d) => sum + d.confidence, 0) / documents.length).toFixed(2)),
      processingTime: `${(files.length * 1.5).toFixed(1)}s`,
    },
    nextSteps: [
      'Review documents with confidence < 0.90',
      'Verify vendor information for accuracy',
      'Categorize expenses by department',
      'Export data to accounting system',
    ],
    metadata: {
      apiVersion: '1.0',
      model: 'bulk-processor-v2',
      timestamp: new Date().toISOString(),
    },
  };
}
