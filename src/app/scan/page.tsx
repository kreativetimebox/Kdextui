'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FileText, Receipt, Landmark, Upload, Search, Filter, Download, Trash2, Check, Clock, AlertCircle, CheckCircle2, MoreVertical, Tag, Eye, X, Code, Loader2, Image, FileSpreadsheet } from 'lucide-react';

type DocumentType = 'invoice' | 'receipt' | 'bank-statement';
type DocumentStatus = 'pending' | 'processing' | 'verified' | 'completed' | 'flagged';

interface Document {
  id: string;
  type: DocumentType;
  status: DocumentStatus;
  uploadDate: string;
  vendor: string;
  description: string;
  amount: string;
  currency: string;
  confidence?: number;
  selected: boolean;
  extractedData?: any; // Full extracted data from API
}

export default function ScanPage() {
  const [activeTab, setActiveTab] = useState<DocumentStatus>('pending');
  const [selectedType, setSelectedType] = useState<DocumentType | 'all'>('all');
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [resultView, setResultView] = useState<'table' | 'json'>('table');
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk' | 'bank-statement'>('single');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Handle file upload
  const handleFileUpload = async (files: FileList | null, documentType?: DocumentType) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress('Uploading...');

    try {
      const formData = new FormData();

      if (uploadMode === 'bulk') {
        // Bulk upload for multiple invoices/receipts
        formData.append('count', files.length.toString());
        Array.from(files).forEach((file, index) => {
          formData.append(`file${index}`, file);
        });

        setUploadProgress('Processing bulk upload...');
        const response = await fetch('/api/scan/bulk', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (result.success && result.documents) {
          const newDocuments: Document[] = result.documents.map((doc: any) => ({
            id: doc.id,
            type: doc.documentType,
            status: doc.status,
            uploadDate: doc.uploadDate,
            vendor: doc.extractedData.vendor || doc.extractedData.storeName || 'Unknown',
            description: doc.extractedData.description || `${doc.documentType} document`,
            amount: doc.extractedData.amount?.toString() || '0.00',
            currency: doc.extractedData.currency || 'USD',
            confidence: Math.round(doc.confidence * 100),
            selected: false,
            extractedData: doc.extractedData
          }));
          
          setDocuments(prev => [...newDocuments, ...prev]);
          setUploadProgress(`Successfully uploaded ${files.length} documents`);
        }

      } else if (uploadMode === 'bank-statement') {
        // Bank statement upload
        formData.append('file', files[0]);

        setUploadProgress('Processing bank statement...');
        const response = await fetch('/api/scan/bank-statement', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (result.success) {
          const newDocument: Document = {
            id: Date.now().toString(),
            type: 'bank-statement',
            status: 'verified',
            uploadDate: new Date().toISOString().split('T')[0],
            vendor: result.statementInfo.bank || 'Bank',
            description: `Account ${result.statementInfo.accountNumber}`,
            amount: result.accountSummary.closingBalance?.toString() || '0.00',
            currency: result.accountSummary.currency || 'USD',
            confidence: Math.round((result.metadata?.confidence || 0.95) * 100),
            selected: false,
            extractedData: result
          };
          
          setDocuments(prev => [newDocument, ...prev]);
          setUploadProgress('Bank statement processed successfully');
        }

      } else {
        // Single upload for invoice or receipt
        formData.append('file', files[0]);
        formData.append('type', documentType || 'invoice');

        setUploadProgress(`Processing ${documentType}...`);
        const response = await fetch('/api/scan/single', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (result.success) {
          const isInvoice = result.documentType === 'invoice';
          const extractedData = result.extractedData;
          
          const newDocument: Document = {
            id: Date.now().toString(),
            type: result.documentType,
            status: 'pending',
            uploadDate: new Date().toISOString().split('T')[0],
            vendor: isInvoice 
              ? extractedData.vendor?.name || extractedData.vendorInfo?.name || 'Unknown Vendor'
              : extractedData.storeName || extractedData.documentInfo?.storeName || 'Unknown Store',
            description: isInvoice
              ? `Invoice ${extractedData.documentInfo?.documentNumber || extractedData.invoiceNumber || ''}`
              : `Receipt from ${extractedData.storeName || 'store'}`,
            amount: (extractedData.financialSummary?.totalAmount || extractedData.total || 0).toString(),
            currency: extractedData.financialSummary?.currency || extractedData.currency || 'USD',
            confidence: Math.round((result.extractionMetadata?.confidence || 0.95) * 100),
            selected: false,
            extractedData: extractedData
          };
          
          setDocuments(prev => [newDocument, ...prev]);
          setUploadProgress(`${documentType} processed successfully`);
        }
      }

      setTimeout(() => {
        setShowUploadModal(false);
        setIsUploading(false);
        setUploadProgress('');
        setUploadError('');
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Upload failed. Please try again.';
      setUploadError(errorMessage);
      setUploadProgress('');
      setIsUploading(false);
    }
  };

  const tabs = [
    { key: 'pending' as DocumentStatus, label: 'Pending Review', count: 18, icon: Clock, color: 'amber' },
    { key: 'processing' as DocumentStatus, label: 'Processing', count: 5, icon: AlertCircle, color: 'blue' },
    { key: 'verified' as DocumentStatus, label: 'Verified', count: 12, icon: CheckCircle2, color: 'green' },
    { key: 'completed' as DocumentStatus, label: 'Completed', count: 24, icon: Check, color: 'emerald' },
    { key: 'flagged' as DocumentStatus, label: 'Flagged', count: 2, icon: AlertCircle, color: 'red' }
  ];

  const documentTypes = [
    { key: 'all' as const, label: 'All Types', icon: FileText, count: documents.length, color: 'purple' },
    { key: 'invoice' as DocumentType, label: 'Invoices', icon: FileText, count: documents.filter(d => d.type === 'invoice').length, color: 'blue' },
    { key: 'receipt' as DocumentType, label: 'Receipts', icon: Receipt, count: documents.filter(d => d.type === 'receipt').length, color: 'green' },
    { key: 'bank-statement' as DocumentType, label: 'Bank Statements', icon: Landmark, count: documents.filter(d => d.type === 'bank-statement').length, color: 'indigo' }
  ];

  const getStatusBadge = (status: DocumentStatus) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      verified: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      flagged: 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[status];
  };

  const handleSelectAll = () => {
    const allSelected = documents.every(d => d.selected);
    setDocuments(docs => docs.map(doc => ({ ...doc, selected: !allSelected })));
  };

  const handleSelectDocument = (id: string) => {
    setDocuments(docs => docs.map(doc => doc.id === id ? { ...doc, selected: !doc.selected } : doc));
  };

  const filteredDocuments = documents.filter(doc => {
    if (doc.status !== activeTab) return false;
    if (selectedType !== 'all' && doc.type !== selectedType) return false;
    if (searchQuery && !doc.vendor.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !doc.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selectedCount = documents.filter(d => d.selected).length;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Document Management
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Intelligent scanning for invoices, receipts & bank statements</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Upload className="h-5 w-5" />
                Upload Documents
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <div
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                      activeTab === tab.key 
                        ? 'border-purple-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{tab.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{tab.count}</p>
                      </div>
                      <Icon className={`h-8 w-8 text-${tab.color}-500`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Filter by Type</h3>
                <div className="space-y-2">
                  {documentTypes.map((type) => {
                    const Icon = type.icon;
                    
                    return (
                      <button
                        key={type.key}
                        onClick={() => setSelectedType(type.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          selectedType === type.key
                            ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 font-semibold shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${selectedType === type.key ? 'bg-purple-200' : 'bg-gray-100'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">{type.label}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          selectedType === type.key 
                            ? 'bg-purple-200 text-purple-700' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {type.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    {selectedCount > 0 && (
                      <span className="text-sm font-medium text-gray-700 px-3 py-1 bg-purple-100 rounded-full">
                        {selectedCount} selected
                      </span>
                    )}
                    <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Approve
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                      />
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg border border-gray-300">
                      <Filter className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-hidden overflow-y-auto" style={{maxHeight: 'calc(100vh - 400px)'}}>
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0 z-10">
                      <tr>
                        <th className="w-12 px-6 py-4">
                          <input
                            type="checkbox"
                            checked={documents.length > 0 && documents.every(d => d.selected)}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4"
                          />
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Vendor</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Confidence</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                        <th className="w-12 px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredDocuments.map((doc) => (
                        <tr
                          key={doc.id}
                          className={`hover:bg-purple-50 transition-colors ${doc.selected ? 'bg-purple-50 border-l-4 border-purple-500' : ''}`}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={doc.selected}
                              onChange={() => handleSelectDocument(doc.id)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(doc.status)}`}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {doc.type === 'invoice' && <FileText className="h-4 w-4 text-blue-500" />}
                              {doc.type === 'receipt' && <Receipt className="h-4 w-4 text-green-500" />}
                              {doc.type === 'bank-statement' && <Landmark className="h-4 w-4 text-indigo-500" />}
                              <span className="text-sm text-gray-600 capitalize">{doc.type.replace('-', ' ')}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">{doc.vendor}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600 max-w-xs truncate">{doc.description}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-gray-900">{doc.currency} {doc.amount}</p>
                          </td>
                          <td className="px-6 py-4">
                            {doc.confidence && (
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      doc.confidence >= 95 ? 'bg-green-500' : 
                                      doc.confidence >= 85 ? 'bg-amber-500' : 
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${doc.confidence}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium text-gray-600">{doc.confidence}%</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600">{new Date(doc.uploadDate).toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => {
                                setSelectedDocument(doc);
                                setShowResultModal(true);
                              }}
                              className="p-2 hover:bg-purple-100 rounded-lg text-purple-600 hover:text-purple-700"
                              title="View Results"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredDocuments.length === 0 && (
                  <div className="text-center py-16">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl font-medium text-gray-700 mb-2">
                      {documents.length === 0 ? 'No documents uploaded yet' : 'No documents found'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {documents.length === 0 
                        ? 'Start by uploading your first document' 
                        : 'Try adjusting your filters'}
                    </p>
                    {documents.length === 0 && (
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      >
                        <Upload className="h-5 w-5" />
                        Upload Documents
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden transform transition-all">
            {/* Modal Header - Fixed */}
            <div className="flex-shrink-0 px-8 pt-8 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Upload Documents</h2>
                  <p className="text-gray-600 mt-1">Select upload mode and choose files</p>
                </div>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setIsUploading(false);
                    setUploadProgress('');
                    setUploadError('');
                  }}
                  className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                  disabled={isUploading}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-8">

            {/* Error Message */}
            {uploadError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">Upload Failed</p>
                  <p className="text-sm text-red-700 mt-1">{uploadError}</p>
                </div>
                <button
                  onClick={() => setUploadError('')}
                  className="ml-auto text-red-400 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Success Message */}
            {uploadProgress && !uploadError && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-900">{uploadProgress}</p>
              </div>
            )}

            {/* Upload Mode Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Mode</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setUploadMode('single')}
                  disabled={isUploading}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    uploadMode === 'single'
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-300 hover:border-purple-300'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <FileText className={`h-6 w-6 mx-auto mb-2 ${uploadMode === 'single' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <p className={`text-sm font-medium ${uploadMode === 'single' ? 'text-purple-900' : 'text-gray-700'}`}>Single</p>
                  <p className="text-xs text-gray-500 mt-1">Invoice/Receipt</p>
                </button>
                <button
                  onClick={() => setUploadMode('bulk')}
                  disabled={isUploading}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    uploadMode === 'bulk'
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-300 hover:border-purple-300'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <Receipt className={`h-6 w-6 mx-auto mb-2 ${uploadMode === 'bulk' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <p className={`text-sm font-medium ${uploadMode === 'bulk' ? 'text-purple-900' : 'text-gray-700'}`}>Bulk</p>
                  <p className="text-xs text-gray-500 mt-1">Multiple files</p>
                </button>
                <button
                  onClick={() => setUploadMode('bank-statement')}
                  disabled={isUploading}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    uploadMode === 'bank-statement'
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-300 hover:border-purple-300'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <Landmark className={`h-6 w-6 mx-auto mb-2 ${uploadMode === 'bank-statement' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <p className={`text-sm font-medium ${uploadMode === 'bank-statement' ? 'text-purple-900' : 'text-gray-700'}`}>Bank Statement</p>
                  <p className="text-xs text-gray-500 mt-1">Account data</p>
                </button>
              </div>
            </div>

            {/* Document Type Selection (only for single mode) */}
            {uploadMode === 'single' && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Document Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        const fileInput = document.getElementById('file-upload-invoice') as HTMLInputElement;
                        if (fileInput) fileInput.click();
                      }}
                      disabled={isUploading}
                      className={`p-4 rounded-xl border-2 border-gray-300 hover:border-purple-300 transition-all ${
                        isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm font-medium text-gray-700">Invoice</p>
                    </button>
                    <button
                      onClick={() => {
                        const fileInput = document.getElementById('file-upload-receipt') as HTMLInputElement;
                        if (fileInput) fileInput.click();
                      }}
                      disabled={isUploading}
                      className={`p-4 rounded-xl border-2 border-gray-300 hover:border-purple-300 transition-all ${
                        isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      <Receipt className="h-6 w-6 mx-auto mb-2 text-green-500" />
                      <p className="text-sm font-medium text-gray-700">Receipt</p>
                    </button>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.gif,.bmp,.tiff"
                    className="hidden"
                    id="file-upload-invoice"
                    onChange={(e) => handleFileUpload(e.target.files, 'invoice')}
                    disabled={isUploading}
                  />
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.gif,.bmp,.tiff"
                    className="hidden"
                    id="file-upload-receipt"
                    onChange={(e) => handleFileUpload(e.target.files, 'receipt')}
                    disabled={isUploading}
                  />
                </div>

                {/* Supported File Types Info for Single Mode */}
                <div className="mb-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-purple-600" />
                    Supported File Types
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <p className="text-xs font-semibold text-gray-700">📄 Documents</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">• PDF</p>
                        <p className="text-xs text-gray-600">• DOCX</p>
                        <p className="text-xs text-gray-600">• DOC</p>
                        <p className="text-xs text-gray-600">• TXT</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Image className="h-4 w-4 text-green-600" />
                        <p className="text-xs font-semibold text-gray-700">🖼️ Images</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">• PNG</p>
                        <p className="text-xs text-gray-600">• JPG</p>
                        <p className="text-xs text-gray-600">• JPEG</p>
                        <p className="text-xs text-gray-600">• GIF</p>
                        <p className="text-xs text-gray-600">• BMP</p>
                        <p className="text-xs text-gray-600">• TIFF</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileSpreadsheet className="h-4 w-4 text-purple-600" />
                        <p className="text-xs font-semibold text-gray-700">📊 Spreadsheets</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">• XLSX</p>
                        <p className="text-xs text-gray-600">• XLS</p>
                        <p className="text-xs text-gray-600">• CSV</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Max file size:</span> 10MB
                    </p>
                  </div>
                </div>
              </>
            )}
            
            {/* Supported File Types Info */}
            {(uploadMode === 'bulk' || uploadMode === 'bank-statement') && (
              <div className="mb-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-purple-600" />
                  Supported File Types
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <p className="text-xs font-semibold text-gray-700">📄 Documents</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">• PDF</p>
                      <p className="text-xs text-gray-600">• DOCX</p>
                      <p className="text-xs text-gray-600">• DOC</p>
                      <p className="text-xs text-gray-600">• TXT</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Image className="h-4 w-4 text-green-600" />
                      <p className="text-xs font-semibold text-gray-700">🖼️ Images</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">• PNG</p>
                      <p className="text-xs text-gray-600">• JPG</p>
                      <p className="text-xs text-gray-600">• JPEG</p>
                      <p className="text-xs text-gray-600">• GIF</p>
                      <p className="text-xs text-gray-600">• BMP</p>
                      <p className="text-xs text-gray-600">• TIFF</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileSpreadsheet className="h-4 w-4 text-purple-600" />
                      <p className="text-xs font-semibold text-gray-700">📊 Spreadsheets</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">• XLSX</p>
                      <p className="text-xs text-gray-600">• XLS</p>
                      <p className="text-xs text-gray-600">• CSV</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Max file size:</span> {uploadMode === 'bank-statement' ? '20MB' : '10MB per file'}
                    {uploadMode === 'bulk' && <span className="ml-2">• <span className="font-semibold">Max files:</span> 50</span>}
                  </p>
                </div>
              </div>
            )}

            {/* File Upload Area (for bulk and bank-statement modes) */}
            {(uploadMode === 'bulk' || uploadMode === 'bank-statement') && (
              <div className="border-3 border-dashed border-purple-300 rounded-2xl p-12 text-center hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer bg-gradient-to-br from-purple-50/50 to-white">
                <Upload className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {isUploading ? 'Uploading...' : 'Drop your files here'}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {isUploading ? uploadProgress : 'or click to browse from your computer'}
                </p>
                <input
                  type="file"
                  multiple={uploadMode === 'bulk'}
                  accept={uploadMode === 'bank-statement' ? '.pdf,.csv,.xlsx,.xls,.docx,.doc,.txt' : '.pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.gif,.bmp,.tiff,.xlsx,.xls,.csv'}
                  className="hidden"
                  id="file-upload-main"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  disabled={isUploading}
                />
                <label
                  htmlFor="file-upload-main"
                  className={`mt-6 inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Browse Files'
                  )}
                </label>
              </div>
            )}

            </div>

            {/* Modal Footer - Fixed */}
            <div className="flex-shrink-0 px-8 py-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setIsUploading(false);
                    setUploadProgress('');
                  }}
                  disabled={isUploading}
                  className={`px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? 'Uploading...' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResultModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full flex flex-col" style={{maxWidth: '72rem', maxHeight: 'calc(100vh - 2rem)'}}>
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {selectedDocument.type === 'invoice' && <FileText className="h-6 w-6 text-blue-500" />}
                  {selectedDocument.type === 'receipt' && <Receipt className="h-6 w-6 text-green-500" />}
                  {selectedDocument.type === 'bank-statement' && <Landmark className="h-6 w-6 text-indigo-500" />}
                  <span className="capitalize">{selectedDocument.type.replace('-', ' ')} Results</span>
                </h2>
                <p className="text-gray-600 text-sm mt-1">Vendor: {selectedDocument.vendor}</p>
              </div>
              <button
                onClick={() => {
                  setShowResultModal(false);
                  setSelectedDocument(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
              <button
                onClick={() => setResultView('table')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
                  resultView === 'table'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-4 w-4" />
                Table View
              </button>
              <button
                onClick={() => setResultView('json')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
                  resultView === 'json'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Code className="h-4 w-4" />
                JSON View
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-4" style={{flex: '1 1 auto', minHeight: 0}}>
              {resultView === 'table' ? (
                <div className="space-y-6">
                  {/* Receipt Table View */}
                  {selectedDocument.type === 'receipt' && selectedDocument.extractedData && (
                    <>
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Receipt Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Receipt Number</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.receiptNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Store Name</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.storeName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date & Time</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.date} {selectedDocument.extractedData.time}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <h3 className="text-xl font-bold text-gray-900 p-6 pb-4">Items</h3>
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Item</th>
                              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Qty</th>
                              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Price</th>
                              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {selectedDocument.extractedData.items?.map((item: any, idx: number) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 text-right text-gray-900">{item.quantity}</td>
                                <td className="px-6 py-4 text-right text-gray-900">${item.price.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right font-semibold text-gray-900">${item.total.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50 font-bold">
                            <tr>
                              <td colSpan={3} className="px-6 py-3 text-right">Subtotal:</td>
                              <td className="px-6 py-3 text-right">${selectedDocument.extractedData.subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td colSpan={3} className="px-6 py-3 text-right">Tax:</td>
                              <td className="px-6 py-3 text-right">${selectedDocument.extractedData.tax.toFixed(2)}</td>
                            </tr>
                            <tr className="text-lg text-purple-700">
                              <td colSpan={3} className="px-6 py-3 text-right">Total:</td>
                              <td className="px-6 py-3 text-right">${selectedDocument.extractedData.total.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.paymentMethod}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Card Last 4 Digits</p>
                            <p className="font-semibold text-gray-900">****{selectedDocument.extractedData.cardLastFour}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Invoice Table View */}
                  {selectedDocument.type === 'invoice' && selectedDocument.extractedData && (
                    <>
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Invoice Information</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Invoice Number</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.invoiceNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Issue Date</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.issueDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Due Date</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.dueDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Vendor Information</h3>
                          <div className="space-y-2">
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.vendorInfo.name}</p>
                            <p className="text-sm text-gray-600">{selectedDocument.extractedData.vendorInfo.address}</p>
                            <p className="text-sm text-gray-600">Tax ID: {selectedDocument.extractedData.vendorInfo.taxId}</p>
                            <p className="text-sm text-gray-600">{selectedDocument.extractedData.vendorInfo.email}</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h3>
                          <div className="space-y-2">
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.customerInfo.name}</p>
                            <p className="text-sm text-gray-600">{selectedDocument.extractedData.customerInfo.address}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <h3 className="text-xl font-bold text-gray-900 p-6 pb-4">Line Items</h3>
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Description</th>
                              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Qty</th>
                              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Unit Price</th>
                              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {selectedDocument.extractedData.lineItems?.map((item: any, idx: number) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 text-gray-900">{item.description}</td>
                                <td className="px-6 py-4 text-right text-gray-900">{item.quantity}</td>
                                <td className="px-6 py-4 text-right text-gray-900">${item.unitPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right font-semibold text-gray-900">${item.amount.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50 font-bold">
                            <tr>
                              <td colSpan={3} className="px-6 py-3 text-right">Subtotal:</td>
                              <td className="px-6 py-3 text-right">${selectedDocument.extractedData.subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td colSpan={3} className="px-6 py-3 text-right">Tax:</td>
                              <td className="px-6 py-3 text-right">${selectedDocument.extractedData.tax.toFixed(2)}</td>
                            </tr>
                            <tr className="text-lg text-purple-700">
                              <td colSpan={3} className="px-6 py-3 text-right">Total:</td>
                              <td className="px-6 py-3 text-right">${selectedDocument.extractedData.total.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <p className="text-sm text-gray-600">Payment Terms: <span className="font-semibold text-gray-900">{selectedDocument.extractedData.paymentTerms}</span></p>
                      </div>
                    </>
                  )}

                  {/* Bank Statement Table View */}
                  {selectedDocument.type === 'bank-statement' && selectedDocument.extractedData && (
                    <>
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Account Holder</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.accountHolder}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Account Number</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.accountNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bank Name</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.bankName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Statement Period</p>
                            <p className="font-semibold text-gray-900">{selectedDocument.extractedData.statementPeriod.from} to {selectedDocument.extractedData.statementPeriod.to}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Account Summary</h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-gray-600">Opening Balance</p>
                            <p className="text-2xl font-bold text-gray-900">${selectedDocument.extractedData.openingBalance.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Closing Balance</p>
                            <p className="text-2xl font-bold text-green-600">${selectedDocument.extractedData.closingBalance.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Deposits</p>
                            <p className="text-xl font-bold text-green-600">+${selectedDocument.extractedData.totalDeposits.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Withdrawals</p>
                            <p className="text-xl font-bold text-red-600">-${selectedDocument.extractedData.totalWithdrawals.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <h3 className="text-xl font-bold text-gray-900 p-6 pb-4">Transactions</h3>
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Description</th>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
                              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Amount</th>
                              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {selectedDocument.extractedData.transactions?.map((txn: any, idx: number) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 text-gray-900">{txn.date}</td>
                                <td className="px-6 py-4 text-gray-900">{txn.description}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    txn.type === 'Credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                  }`}>
                                    {txn.type}
                                  </span>
                                </td>
                                <td className={`px-6 py-4 text-right font-semibold ${
                                  txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {txn.type === 'Credit' ? '+' : ''}{txn.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right font-semibold text-gray-900">${txn.balance.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono">
                    {JSON.stringify(selectedDocument.extractedData, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center gap-3 p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={() => {
                  setShowResultModal(false);
                  setSelectedDocument(null);
                }}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-white font-medium text-sm"
              >
                Close
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    // Export CSV
                    const data = selectedDocument.extractedData;
                    let csvContent = '';
                    
                    if (selectedDocument.type === 'receipt' && data.items) {
                      csvContent = 'Receipt Number,Store Name,Date,Item,Quantity,Price,Total\n';
                      csvContent += `${data.receiptNumber},${data.storeName},${data.date},,,,\n`;
                      data.items.forEach((item: any) => {
                        csvContent += `,,${data.date},${item.name},${item.quantity},${item.price},${item.total}\n`;
                      });
                      csvContent += `,,,,Subtotal,,${data.subtotal}\n`;
                      csvContent += `,,,,Tax,,${data.tax}\n`;
                      csvContent += `,,,,Total,,${data.total}\n`;
                    } else if (selectedDocument.type === 'invoice' && data.lineItems) {
                      csvContent = 'Invoice Number,Vendor,Issue Date,Due Date,Description,Quantity,Unit Price,Amount\n';
                      csvContent += `${data.invoiceNumber},${data.vendorInfo.name},${data.issueDate},${data.dueDate},,,,\n`;
                      data.lineItems.forEach((item: any) => {
                        csvContent += `,,,,${item.description},${item.quantity},${item.unitPrice},${item.amount}\n`;
                      });
                      csvContent += `,,,,Subtotal,,,${data.subtotal}\n`;
                      csvContent += `,,,,Tax,,,${data.tax}\n`;
                      csvContent += `,,,,Total,,,${data.total}\n`;
                    } else if (selectedDocument.type === 'bank-statement' && data.transactions) {
                      csvContent = 'Account Number,Account Holder,Bank,Date,Description,Type,Amount,Balance\n';
                      data.transactions.forEach((txn: any) => {
                        csvContent += `${data.accountNumber},${data.accountHolder},${data.bankName},${txn.date},${txn.description},${txn.type},${txn.amount},${txn.balance}\n`;
                      });
                      csvContent += `,,,,Opening Balance,,,${data.openingBalance}\n`;
                      csvContent += `,,,,Closing Balance,,,${data.closingBalance}\n`;
                    }
                    
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const link = document.createElement('a');
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', `${selectedDocument.type}_${selectedDocument.id}_result.csv`);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-md flex items-center gap-2 text-sm"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
                <button 
                  onClick={() => {
                    // Export Excel
                    const data = selectedDocument.extractedData;
                    let htmlContent = '<html><head><meta charset="UTF-8"><style>table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ddd;padding:8px;}th{background-color:#7c3aed;color:white;font-weight:bold;}</style></head><body><table>';
                    
                    if (selectedDocument.type === 'receipt' && data.items) {
                      htmlContent += '<tr><th colspan="7">Receipt: ' + data.receiptNumber + ' - ' + data.storeName + '</th></tr>';
                      htmlContent += '<tr><th>Date</th><th>Item</th><th>Quantity</th><th>Price</th><th>Total</th></tr>';
                      data.items.forEach((item: any) => {
                        htmlContent += `<tr><td>${data.date}</td><td>${item.name}</td><td>${item.quantity}</td><td>$${item.price}</td><td>$${item.total}</td></tr>`;
                      });
                      htmlContent += `<tr><td colspan="4" style="text-align:right;font-weight:bold;">Subtotal:</td><td>$${data.subtotal}</td></tr>`;
                      htmlContent += `<tr><td colspan="4" style="text-align:right;font-weight:bold;">Tax:</td><td>$${data.tax}</td></tr>`;
                      htmlContent += `<tr><td colspan="4" style="text-align:right;font-weight:bold;">Total:</td><td>$${data.total}</td></tr>`;
                    } else if (selectedDocument.type === 'invoice' && data.lineItems) {
                      htmlContent += '<tr><th colspan="5">Invoice: ' + data.invoiceNumber + ' - ' + data.vendorInfo.name + '</th></tr>';
                      htmlContent += '<tr><th>Description</th><th>Quantity</th><th>Unit Price</th><th>Amount</th></tr>';
                      data.lineItems.forEach((item: any) => {
                        htmlContent += `<tr><td>${item.description}</td><td>${item.quantity}</td><td>$${item.unitPrice}</td><td>$${item.amount}</td></tr>`;
                      });
                      htmlContent += `<tr><td colspan="3" style="text-align:right;font-weight:bold;">Subtotal:</td><td>$${data.subtotal}</td></tr>`;
                      htmlContent += `<tr><td colspan="3" style="text-align:right;font-weight:bold;">Tax:</td><td>$${data.tax}</td></tr>`;
                      htmlContent += `<tr><td colspan="3" style="text-align:right;font-weight:bold;">Total:</td><td>$${data.total}</td></tr>`;
                    } else if (selectedDocument.type === 'bank-statement' && data.transactions) {
                      htmlContent += '<tr><th colspan="5">Bank Statement: ' + data.accountNumber + ' - ' + data.accountHolder + '</th></tr>';
                      htmlContent += '<tr><th>Date</th><th>Description</th><th>Type</th><th>Amount</th><th>Balance</th></tr>';
                      data.transactions.forEach((txn: any) => {
                        htmlContent += `<tr><td>${txn.date}</td><td>${txn.description}</td><td>${txn.type}</td><td>$${txn.amount}</td><td>$${txn.balance}</td></tr>`;
                      });
                    }
                    
                    htmlContent += '</table></body></html>';
                    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
                    const link = document.createElement('a');
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', `${selectedDocument.type}_${selectedDocument.id}_result.xls`);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium shadow-md flex items-center gap-2 text-sm"
                >
                  <Download className="h-4 w-4" />
                  Export Excel
                </button>
                <button 
                  onClick={() => {
                    const dataStr = JSON.stringify(selectedDocument.extractedData, null, 2);
                    const blob = new Blob([dataStr], { type: 'application/json' });
                    const link = document.createElement('a');
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', `${selectedDocument.type}_${selectedDocument.id}_result.json`);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium shadow-md flex items-center gap-2 text-sm"
                >
                  <Download className="h-4 w-4" />
                  Export JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
