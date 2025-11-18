'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface UploadProgress {
  percentage: number;
  status: 'uploading' | 'processing' | 'extracting' | 'complete' | 'error';
  message: string;
}

type UploadMode = 'single' | 'bulk' | 'bank-statement';

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadMode, setUploadMode] = useState<UploadMode>('single');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState<UploadProgress>({
    percentage: 0,
    status: 'uploading',
    message: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'json' | 'table'>('table');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedBulkFiles, setExpandedBulkFiles] = useState<Set<number>>(new Set());
  const [bulkFileViewMode, setBulkFileViewMode] = useState<Map<number, 'json' | 'table'>>(new Map());

  const acceptedFormats = [
    '.pdf', '.docx', '.doc', '.txt',
    '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff',
    '.xlsx', '.xls', '.csv'
  ];

  const acceptedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
    'image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ];

  const validateFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      setError(`Unsupported file format. Please upload: ${acceptedFormats.join(', ')}`);
      return false;
    }
    
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError('File size exceeds 50MB limit');
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (file: File) => {
    setError('');
    setResult(null);
    
    if (validateFile(file)) {
      if (uploadMode === 'bulk') {
        setSelectedFiles(prev => [...prev, file]);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleMultipleFileSelect = (files: FileList) => {
    setError('');
    setResult(null);
    
    const validFiles: File[] = [];
    Array.from(files).forEach(file => {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    });
    
    if (uploadMode === 'bulk') {
      setSelectedFiles(prev => [...prev, ...validFiles]);
    } else if (validFiles.length > 0) {
      setSelectedFile(validFiles[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (uploadMode === 'bulk' && files.length > 1) {
        handleMultipleFileSelect(files);
      } else {
        const file = files[0];
        if (file) {
          handleFileSelect(file);
        }
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (uploadMode === 'bulk' && files.length > 1) {
        handleMultipleFileSelect(files);
      } else {
        const file = files[0];
        if (file) {
          handleFileSelect(file);
        }
      }
    }
  }, [uploadMode]);

  const simulateProgress = async (callback: () => Promise<any>) => {
    setIsProcessing(true);
    setProgress({ percentage: 0, status: 'uploading', message: 'Uploading document...' });

    // Simulate upload progress
    for (let i = 0; i <= 30; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress({ percentage: i, status: 'uploading', message: 'Uploading document...' });
    }

    setProgress({ percentage: 40, status: 'processing', message: 'Processing document...' });
    await new Promise(resolve => setTimeout(resolve, 500));

    setProgress({ percentage: 60, status: 'extracting', message: 'Extracting data...' });
    
    try {
      await callback();
      
      setProgress({ percentage: 100, status: 'complete', message: 'Complete!' });
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      setProgress({ percentage: 0, status: 'error', message: 'Failed to process document' });
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpload = async () => {
    if (uploadMode === 'bulk') {
      if (selectedFiles.length === 0) return;
      
      try {
        await simulateProgress(async () => {
          const formData = new FormData();
          selectedFiles.forEach((file, index) => {
            formData.append(`file${index}`, file);
          });
          formData.append('mode', 'bulk');
          formData.append('count', selectedFiles.length.toString());

          const response = await fetch('/api/scan', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
          }

          const data = await response.json();
          setResult(data);
          setError('');
        });
      } catch (err: any) {
        setError(err.message || 'Failed to process documents. Please try again.');
        setResult(null);
      }
    } else {
      if (!selectedFile) return;

      try {
        await simulateProgress(async () => {
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('mode', uploadMode);

          const response = await fetch('/api/scan', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
          }

          const data = await response.json();
          setResult(data);
          setError('');
        });
      } catch (err: any) {
        setError(err.message || 'Failed to process document. Please try again.');
        setResult(null);
      }
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedFiles([]);
    setResult(null);
    setError('');
    setProgress({ percentage: 0, status: 'uploading', message: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      alert('JSON copied to clipboard!');
    }
  };

  const flattenObject = (obj: any, prefix: string = ''): Record<string, any> => {
    const flattened: Record<string, any> = {};
    
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (value === null || value === undefined) {
        flattened[newKey] = '';
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          flattened[newKey] = '';
        } else if (typeof value[0] === 'object' && value[0] !== null) {
          value.forEach((item, index) => {
            Object.assign(flattened, flattenObject(item, `${newKey}[${index}]`));
          });
        } else {
          flattened[newKey] = value.join(', ');
        }
      } else if (typeof value === 'object') {
        Object.assign(flattened, flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    });
    
    return flattened;
  };

  const exportToCSV = () => {
    if (!result) return;

    const flattened = flattenObject(result);
    const headers = Object.keys(flattened);
    const values = Object.values(flattened);

    const csvContent = [
      headers.join(','),
      values.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `scan_result_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    if (!result) return;

    const flattened = flattenObject(result);
    
    // Create HTML table for Excel
    let html = '<html><head><meta charset="utf-8"></head><body><table border="1">';
    html += '<thead><tr><th>Field</th><th>Value</th></tr></thead><tbody>';
    
    Object.entries(flattened).forEach(([key, value]) => {
      html += `<tr><td>${key}</td><td>${value}</td></tr>`;
    });
    
    html += '</tbody></table></body></html>';

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `scan_result_${Date.now()}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFileToCSV = (data: any, filename: string) => {
    const flattened = flattenObject(data);
    const headers = Object.keys(flattened);
    const values = Object.values(flattened);

    const csvContent = [
      headers.join(','),
      values.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename.replace(/\.[^/.]+$/, '')}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFileToExcel = (data: any, filename: string) => {
    const flattened = flattenObject(data);
    
    // Create HTML table for Excel
    let html = '<html><head><meta charset="utf-8"></head><body><table border="1">';
    html += '<thead><tr><th>Field</th><th>Value</th></tr></thead><tbody>';
    
    Object.entries(flattened).forEach(([key, value]) => {
      html += `<tr><td>${key}</td><td>${value}</td></tr>`;
    });
    
    html += '</tbody></table></body></html>';

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename.replace(/\.[^/.]+$/, '')}_${Date.now()}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const toggleBulkFile = (index: number) => {
    setExpandedBulkFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const setBulkFileView = (index: number, mode: 'json' | 'table') => {
    setBulkFileViewMode(prev => {
      const newMap = new Map(prev);
      newMap.set(index, mode);
      return newMap;
    });
  };

  const getBulkFileView = (index: number): 'json' | 'table' => {
    return bulkFileViewMode.get(index) || 'table';
  };

  const renderJsonValue = (value: any, key: string, level: number = 0): React.ReactElement => {
    const isExpanded = expandedSections.has(key);
    const indent = level * 20;

    if (value === null) {
      return <span className="text-gray-400">null</span>;
    }

    if (typeof value === 'boolean') {
      return <span className="text-blue-600">{value.toString()}</span>;
    }

    if (typeof value === 'number') {
      return <span className="text-green-600">{value}</span>;
    }

    if (typeof value === 'string') {
      return <span className="text-orange-600">&quot;{value}&quot;</span>;
    }

    if (Array.isArray(value)) {
      return (
        <div>
          <button
            onClick={() => toggleSection(key)}
            className="text-purple-600 hover:text-purple-700 font-mono"
          >
            {isExpanded ? 'Γû╝' : 'Γû╢'} Array[{value.length}]
          </button>
          {isExpanded && (
            <div style={{ marginLeft: `${indent + 20}px` }} className="border-l-2 border-gray-200 pl-4 mt-2">
              {value.map((item, index) => (
                <div key={index} className="mb-2">
                  <span className="text-gray-500 font-mono">[{index}]: </span>
                  {renderJsonValue(item, `${key}.${index}`, level + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value);
      return (
        <div>
          <button
            onClick={() => toggleSection(key)}
            className="text-purple-600 hover:text-purple-700 font-mono"
          >
            {isExpanded ? 'Γû╝' : 'Γû╢'} Object
          </button>
          {isExpanded && (
            <div style={{ marginLeft: `${indent + 20}px` }} className="border-l-2 border-gray-200 pl-4 mt-2">
              {entries.map(([k, v]) => (
                <div key={k} className="mb-2">
                  <span className="text-blue-700 font-mono">&quot;{k}&quot;: </span>
                  {renderJsonValue(v, `${key}.${k}`, level + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return <span className="text-gray-600">{String(value)}</span>;
  };

  const renderTableView = (data: any, parentKey: string = ''): React.ReactElement[] => {
    const rows: React.ReactElement[] = [];

    const renderValue = (value: any, key: string): React.ReactElement => {
      if (value === null || value === undefined) {
        return <span className="text-gray-400 italic">null</span>;
      }

      if (typeof value === 'boolean' || typeof value === 'number') {
        return <span className="font-medium">{String(value)}</span>;
      }

      if (typeof value === 'string') {
        return <span>{value}</span>;
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return <span className="text-gray-400 italic">Empty array</span>;
        }
        
        if (typeof value[0] === 'object' && value[0] !== null) {
          return (
            <div className="space-y-2">
              {value.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="text-xs font-semibold text-purple-600 mb-2">Item {index + 1}</div>
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className="flex text-sm mb-1">
                      <span className="font-medium text-gray-600 mr-2">{k}:</span>
                      <span className="text-gray-800">{String(v)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        }
        
        return <span>{value.join(', ')}</span>;
      }

      if (typeof value === 'object') {
        return (
          <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
            {Object.entries(value).map(([k, v]) => (
              <div key={k} className="flex text-sm">
                <span className="font-medium text-gray-600 mr-2">{k}:</span>
                <span className="text-gray-800">{String(v)}</span>
              </div>
            ))}
          </div>
        );
      }

      return <span>{String(value)}</span>;
    };

    const processObject = (obj: any, prefix: string = '') => {
      if (obj === null || obj === undefined) return;

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const key = prefix ? `${prefix}[${index}]` : `Item ${index + 1}`;
          if (typeof item === 'object' && item !== null) {
            processObject(item, key);
          } else {
            rows.push(
              <tr key={`${prefix}-${index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-700">{key}</td>
                <td className="py-3 px-4 text-gray-900">{renderValue(item, key)}</td>
              </tr>
            );
          }
        });
      } else if (typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            rows.push(
              <tr key={fullKey} className="bg-purple-50 border-b border-purple-100">
                <td colSpan={2} className="py-2 px-4 font-semibold text-purple-700 text-sm uppercase tracking-wide">
                  {fullKey}
                </td>
              </tr>
            );
            processObject(value, fullKey);
          } else {
            rows.push(
              <tr key={fullKey} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-700">{key}</td>
                <td className="py-3 px-4 text-gray-900">{renderValue(value, fullKey)}</td>
              </tr>
            );
          }
        });
      }
    };

    processObject(data, parentKey);
    return rows;
  };

  const getStatusColor = () => {
    switch (progress.status) {
      case 'uploading':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-purple-500';
      case 'extracting':
        return 'bg-indigo-500';
      case 'complete':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Document Scanner
            </h1>
            <p className="text-lg text-gray-600">
              Upload your documents and extract data with AI-powered processing
            </p>
          </div>

          {/* Upload Section */}
          {!result && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {/* Upload Mode Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Select Upload Mode</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setUploadMode('single');
                      setSelectedFile(null);
                      setSelectedFiles([]);
                      setResult(null);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      uploadMode === 'single'
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 mb-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <h4 className="font-bold text-gray-900 mb-1">Single Upload</h4>
                      <p className="text-sm text-gray-600 text-center">Upload one document at a time</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      setUploadMode('bulk');
                      setSelectedFile(null);
                      setSelectedFiles([]);
                      setResult(null);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      uploadMode === 'bulk'
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 mb-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h4 className="font-bold text-gray-900 mb-1">Bulk Upload</h4>
                      <p className="text-sm text-gray-600 text-center">Upload multiple documents</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      setUploadMode('bank-statement');
                      setSelectedFile(null);
                      setSelectedFiles([]);
                      setResult(null);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      uploadMode === 'bank-statement'
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 mb-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <h4 className="font-bold text-gray-900 mb-1">Bank Statement</h4>
                      <p className="text-sm text-gray-600 text-center">Process bank statements</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* File Upload Area */}
              <div
                className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  isDragging
                    ? 'border-purple-500 bg-purple-50 scale-105'
                    : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={acceptedFormats.join(',')}
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={isProcessing}
                  multiple={uploadMode === 'bulk'}
                />

                <div className="flex flex-col items-center">
                  <svg
                    className="w-20 h-20 text-purple-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  {uploadMode === 'bulk' && selectedFiles.length > 0 ? (
                    <div className="mb-6 max-w-md mx-auto">
                      <p className="text-lg font-medium text-gray-900 mb-3">
                        {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
                      </p>
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : selectedFile ? (
                    <div className="mb-6">
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      {uploadMode === 'bank-statement' && (
                        <p className="text-sm text-purple-600 mt-2 font-medium">
                          Processing as Bank Statement
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        {uploadMode === 'bulk' ? 'Drag and drop your files here' : 'Drag and drop your file here'}
                      </p>
                      <p className="text-gray-500">or</p>
                    </div>
                  )}

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {uploadMode === 'bulk' 
                      ? (selectedFiles.length > 0 ? 'Add More Files' : 'Select Files')
                      : (selectedFile ? 'Choose Different File' : 'Select File')
                    }
                  </button>

                  <p className="text-sm text-gray-400 mt-6">
                    Supported formats: PDF, DOCX, DOC, TXT, PNG, JPG, JPEG, GIF, BMP, TIFF, XLSX, XLS, CSV
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Max file size: 50MB{uploadMode === 'bulk' ? ' per file' : ''}</p>
                </div>
              </div>

              {/* Upload Button */}
              {((uploadMode === 'bulk' && selectedFiles.length > 0) || (uploadMode !== 'bulk' && selectedFile)) && !isProcessing && (
                <div className="mt-8 flex gap-4 justify-center">
                  <button
                    onClick={handleUpload}
                    className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    {uploadMode === 'bulk' 
                      ? `Process ${selectedFiles.length} Document${selectedFiles.length > 1 ? 's' : ''}`
                      : uploadMode === 'bank-statement'
                      ? 'Process Bank Statement'
                      : 'Process Document'
                    }
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-10 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Progress Bar */}
              {isProcessing && (
                <div className="mt-8 animate-fadeIn">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{progress.message}</span>
                      <span className="text-sm font-bold text-purple-600">{progress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ease-out ${getStatusColor()} shadow-lg`}
                        style={{ width: `${progress.percentage}%` }}
                      >
                        <div className="h-full w-full bg-white opacity-20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm">Processing your document...</span>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-fadeIn">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="animate-fadeIn">
              {/* Bulk Upload - Show Each File Separately */}
              {result.mode === 'bulk' && result.documents ? (
                <div className="space-y-6">
                  {/* Process Another Document Button */}
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Process Another Document
                    </button>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
                    <h3 className="text-2xl font-bold mb-4">Bulk Processing Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm opacity-90">Total Files</p>
                        <p className="text-3xl font-bold">{result.totalFiles}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm opacity-90">Successful</p>
                        <p className="text-3xl font-bold text-green-300">{result.summary.successfullyProcessed}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm opacity-90">Failed</p>
                        <p className="text-3xl font-bold text-red-300">{result.summary.failed}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm opacity-90">Processing Time</p>
                        <p className="text-2xl font-bold">{result.metadata.processingTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Individual File Results */}
                  {result.documents.map((doc: any, index: number) => {
                    const isExpanded = expandedBulkFiles.has(index);
                    const currentView = getBulkFileView(index);
                    
                    return (
                      <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4 cursor-pointer hover:from-purple-600 hover:to-indigo-600 transition-all"
                          onClick={() => toggleBulkFile(index)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <svg 
                                className={`w-6 h-6 text-white transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <h4 className="text-xl font-bold text-white">
                                Document {doc.index}: {doc.filename}
                              </h4>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              doc.status === 'Success' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}>
                              {doc.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          {/* Summary Info - Always Visible */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600">File Type</p>
                              <p className="font-semibold text-gray-900">{doc.fileType}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600">Size</p>
                              <p className="font-semibold text-gray-900">{doc.size}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600">Confidence</p>
                              <p className="font-semibold text-gray-900">{(doc.extractedFields.confidence * 100).toFixed(1)}%</p>
                            </div>
                          </div>

                          {/* Quick Summary */}
                          <div className="bg-purple-50 p-4 rounded-lg mb-4">
                            <h5 className="font-semibold text-purple-900 mb-2">Quick Summary</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-700">Document Type:</span>
                                <span className="font-medium text-gray-900">{doc.extractedFields.documentType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-700">Key Data Points:</span>
                                <span className="font-medium text-gray-900">{doc.extractedFields.keyDataPoints}</span>
                              </div>
                            </div>
                          </div>

                          {/* Expandable Detailed View */}
                          {isExpanded && doc.detailedData && (
                            <div className="animate-fadeIn">
                              {/* View Toggle for this file */}
                              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                                <div className="flex gap-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setBulkFileView(index, 'table');
                                    }}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                                      currentView === 'table'
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                  >
                                    Table View
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setBulkFileView(index, 'json');
                                    }}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                                      currentView === 'json'
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                  >
                                    JSON View
                                  </button>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      exportFileToCSV(doc.detailedData, doc.filename);
                                    }}
                                    className="px-3 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300 flex items-center gap-1 text-xs"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    CSV
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      exportFileToExcel(doc.detailedData, doc.filename);
                                    }}
                                    className="px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center gap-1 text-xs"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Excel
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigator.clipboard.writeText(JSON.stringify(doc.detailedData, null, 2));
                                      alert('Data copied to clipboard!');
                                    }}
                                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-1 text-xs"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                  </button>
                                </div>
                              </div>

                              {/* Table View for this file */}
                              {currentView === 'table' && (
                                <div className="bg-gray-50 rounded-lg overflow-hidden">
                                  <div className="overflow-x-auto max-h-96 overflow-y-auto">
                                    <table className="w-full">
                                      <thead className="bg-purple-100 sticky top-0">
                                        <tr>
                                          <th className="py-3 px-4 text-left font-semibold text-purple-900 text-sm">Field</th>
                                          <th className="py-3 px-4 text-left font-semibold text-purple-900 text-sm">Value</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {renderTableView(doc.detailedData)}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}

                              {/* JSON View for this file */}
                              {currentView === 'json' && (
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto font-mono text-xs">
                                  <div className="text-white">
                                    {renderJsonValue(doc.detailedData, `file-${index}`, 0)}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Click to expand message */}
                          {!isExpanded && (
                            <div className="text-center py-2">
                              <button 
                                onClick={() => toggleBulkFile(index)}
                                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                              >
                                Click to view detailed data ΓåÆ
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Aggregated Data */}
                  {result.aggregatedData && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Aggregated Analysis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-purple-600 mb-3">Financial Summary</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-gray-700">Total Amount:</span>
                              <span className="font-bold text-gray-900">${result.aggregatedData.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Currency:</span>
                              <span className="font-medium text-gray-900">{result.aggregatedData.currency}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-600 mb-3">Document Types Breakdown</h4>
                          <div className="space-y-2">
                            {Object.entries(result.aggregatedData.documentTypes).map(([type, count]: [string, any]) => (
                              <div key={type} className="flex justify-between">
                                <span className="text-gray-700">{type}:</span>
                                <span className="font-medium text-gray-900">{count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* View Toggle and Export Buttons for Single/Bank Statement */}
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => setViewMode('table')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          viewMode === 'table'
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Table View
                      </button>
                      <button
                        onClick={() => setViewMode('json')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          viewMode === 'json'
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        JSON View
                      </button>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={exportToCSV}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export CSV
                      </button>
                      <button
                        onClick={exportToExcel}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Excel
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Process Another Document
                      </button>
                    </div>
                  </div>

                  {/* Table View */}
                  {viewMode === 'table' && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            <tr>
                              <th className="py-4 px-6 text-left font-semibold text-lg">Field</th>
                              <th className="py-4 px-6 text-left font-semibold text-lg">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {renderTableView(result)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* JSON View */}
                  {viewMode === 'json' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Raw JSON Output</h3>
                        <button
                          onClick={copyToClipboard}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy JSON
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto font-mono text-sm">
                        <div className="text-white">
                          {renderJsonValue(result, 'root', 0)}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
