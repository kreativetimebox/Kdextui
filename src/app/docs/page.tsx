import Link from "next/link";
import { Brain, Code, FileText, Key, Shield, Zap, HomeIcon, BookOpen, DollarSign, Mail, Info, Rocket, Lock, Terminal, Webhook, Package, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <Brain className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-colors" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">FinanceAI</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all flex items-center gap-1.5">
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link href="/docs" className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg transition-all flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                Documentation
              </Link>
              <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" />
                Pricing
              </Link>
              <Link href="/contact" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                Contact
              </Link>
              <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all flex items-center gap-1.5">
                <Info className="h-4 w-4" />
                About
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                href="/login" 
                className="text-sm font-semibold text-purple-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 lg:flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-100 p-8 sticky top-24 hover:border-purple-200 transition-all">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">Documentation</h3>
                </div>
                <p className="text-sm text-gray-500 ml-11">Quick Navigation</p>
              </div>
              
              <nav className="space-y-1.5">
                <a href="#getting-started" className="group flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:translate-x-1">
                  <Rocket className="h-5 w-5 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold">Getting Started</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </a>
                
                <a href="#authentication" className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-md transform hover:translate-x-1 border-2 border-transparent hover:border-purple-200">
                  <Lock className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all">Authentication</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600">→</span>
                </a>
                
                <a href="#endpoints" className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-md transform hover:translate-x-1 border-2 border-transparent hover:border-purple-200">
                  <Terminal className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all">API Endpoints</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600">→</span>
                </a>
                
                <a href="#examples" className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-md transform hover:translate-x-1 border-2 border-transparent hover:border-purple-200">
                  <Code className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all">Code Examples</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600">→</span>
                </a>
                
                <a href="#webhooks" className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-md transform hover:translate-x-1 border-2 border-transparent hover:border-purple-200">
                  <Webhook className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all">Webhooks</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600">→</span>
                </a>
                
                <a href="#sdks" className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-md transform hover:translate-x-1 border-2 border-transparent hover:border-purple-200">
                  <Package className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all">SDK Libraries</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600">→</span>
                </a>
                
                <a href="#best-practices" className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-md transform hover:translate-x-1 border-2 border-transparent hover:border-purple-200">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all">Best Practices</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600">→</span>
                </a>
                
                <a href="#rate-limits" className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-md transform hover:translate-x-1 border-2 border-transparent hover:border-purple-200">
                  <TrendingUp className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all">Rate Limits</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600">→</span>
                </a>
                
                <a href="#errors" className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-md transform hover:translate-x-1 border-2 border-transparent hover:border-purple-200">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all">Error Handling</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-600">→</span>
                </a>
              </nav>
              
              {/* Quick Links Section */}
              <div className="mt-8 pt-6 border-t-2 border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <a href="/pricing" className="group flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-all duration-300 hover:translate-x-1 transform">
                    <DollarSign className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:font-semibold transition-all">View Pricing</span>
                  </a>
                  <a href="/contact" className="group flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-all duration-300 hover:translate-x-1 transform">
                    <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:font-semibold transition-all">Get Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
              <p className="text-xl text-gray-600">
                Complete guide to integrating FinanceAI&apos;s document processing API
              </p>
            </div>

            {/* Getting Started Section */}
            <section id="getting-started" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <div className="flex items-center mb-6">
                  <Zap className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Base URL</h3>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                      https://api.financeai.com/v1
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Start</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Sign up for a free account</li>
                      <li>Get your API key from the dashboard</li>
                      <li>Make your first API call</li>
                      <li>Process your documents!</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🚀 Get Started</h3>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-gray-700 mb-4">
                        Ready to start processing documents? Create your free account to get instant access to the API.
                      </p>
                      <div className="flex gap-3">
                        <Link 
                          href="/signup" 
                          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                        >
                          Create Free Account
                        </Link>
                        <Link 
                          href="/dashboard" 
                          className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm font-semibold"
                        >
                          View Dashboard
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Authentication Section */}
            <section id="authentication" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <div className="flex items-center mb-6">
                  <Key className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Authentication</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-600">
                    All API requests require authentication using your API key in the Authorization header.
                  </p>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                    <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                      <code>
{`curl -X POST https://api.financeai.com/v1/documents/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@document.pdf"`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* API Endpoints Section */}
            <section id="endpoints" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <div className="flex items-center mb-6">
                  <Code className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">API Endpoints</h2>
                </div>
                
                <div className="space-y-8">
                  {/* Document Scan Endpoint */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-3">POST</span>
                      /documents/scan
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Upload and process a financial document to extract structured data.
                    </p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Parameters:</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div><code className="bg-white px-2 py-1 rounded">file</code> (required) - The document file to process</div>
                      <div><code className="bg-white px-2 py-1 rounded">type</code> (optional) - Document type: bank_statement, receipt, invoice</div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2 mt-4">Response:</h4>
                    <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                      <code>
{`{
  "id": "doc_123456789",
  "type": "bank_statement",
  "status": "completed",
  "data": {
    "account_number": "****1234",
    "balance": 5420.50,
    "transactions": [
      {
        "date": "2025-01-15",
        "description": "ACH Credit",
        "amount": 2500.00,
        "type": "credit",
        "merchant": "SALARY DEPOSIT"
      }
    ]
  }
}`}
                      </code>
                    </div>
                  </div>

                  {/* Get Document Endpoint */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-3">GET</span>
                      /documents/{"{id}"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Retrieve the processing results for a specific document.
                    </p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
                    <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                      <code>
{`{
  "id": "doc_123456789",
  "type": "receipt",
  "status": "completed",
  "created_at": "2025-01-19T10:30:00Z",
  "data": {
    "merchant_name": "Office Supplies Plus",
    "total_amount": 45.99,
    "date": "2025-01-19",
    "tax_amount": 3.68,
    "items": [
      {
        "description": "Printer Paper",
        "amount": 15.99
      },
      {
        "description": "Pens (Pack)",
        "amount": 8.99
      }
    ]
  }
}`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Code Examples Section */}
            <section id="examples" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <div className="flex items-center mb-6">
                  <FileText className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Code Examples</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">JavaScript/Node.js</h3>
                    <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                      <code>
{`const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
form.append('file', fs.createReadStream('bank_statement.pdf'));
form.append('type', 'bank_statement');

const response = await axios.post(
  'https://api.financeai.com/v1/documents/scan',
  form,
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      ...form.getHeaders()
    }
  }
);

console.log(response.data);`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Python</h3>
                    <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                      <code>
{`import requests

url = "https://api.financeai.com/v1/documents/scan"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

with open("receipt.pdf", "rb") as f:
    files = {"file": f}
    data = {"type": "receipt"}
    
    response = requests.post(url, headers=headers, files=files, data=data)
    result = response.json()
    
print(result)`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Rate Limits Section */}
            <section id="rate-limits" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Rate Limits & Pricing</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">Free Tier</h3>
                    <div className="text-2xl font-bold text-purple-600 mb-2">100</div>
                    <p className="text-purple-700 text-sm">documents per month</p>
                    <p className="text-purple-600 text-sm mt-2">5 requests/minute</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">Pro</h3>
                    <div className="text-2xl font-bold text-purple-600 mb-2">5,000</div>
                    <p className="text-purple-700 text-sm">documents per month</p>
                    <p className="text-purple-600 text-sm mt-2">50 requests/minute</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">Enterprise</h3>
                    <div className="text-2xl font-bold text-purple-600 mb-2">Unlimited</div>
                    <p className="text-purple-700 text-sm">Custom pricing</p>
                    <p className="text-purple-600 text-sm mt-2">Custom rate limits</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Error Handling Section */}
            <section id="errors" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Handling</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">HTTP Status Codes</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <code>200</code>
                        <span className="text-gray-600">Success</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <code>400</code>
                        <span className="text-gray-600">Bad Request</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <code>401</code>
                        <span className="text-gray-600">Unauthorized</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <code>429</code>
                        <span className="text-gray-600">Rate Limited</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <code>500</code>
                        <span className="text-gray-600">Server Error</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Error Response Format</h3>
                    <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                      <code>
{`{
  "error": {
    "code": "invalid_file_type",
    "message": "File type not supported. Please upload PDF, PNG, or JPG files.",
    "details": {
      "supported_types": ["pdf", "png", "jpg", "jpeg"]
    }
  }
}`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Webhooks Section */}
            <section id="webhooks" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <div className="flex items-center mb-6">
                  <Zap className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Webhooks</h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Configure webhooks to receive real-time notifications when document processing is complete.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Webhook Events</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <code className="text-sm">document.processed</code>
                        <span className="text-sm text-gray-600">Document processing completed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <code className="text-sm">document.failed</code>
                        <span className="text-sm text-gray-600">Document processing failed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <code className="text-sm">batch.completed</code>
                        <span className="text-sm text-gray-600">Batch processing completed</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Webhook Payload Example</h3>
                    <div className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                      <code>
{`{
  "event": "document.processed",
  "timestamp": "2025-10-19T14:30:00Z",
  "data": {
    "document_id": "doc_abc123",
    "type": "invoice",
    "status": "completed",
    "extracted_data": {
      "supplier_name": "ABC Supplies Inc.",
      "invoice_number": "INV-2024-001",
      "total_amount": 1250.00,
      "currency": "USD",
      "invoice_date": "2024-10-15"
    }
  }
}`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SDK Libraries Section */}
            <section id="sdks" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <div className="flex items-center mb-6">
                  <Code className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">SDK Libraries</h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Use our official SDKs for faster integration in your preferred programming language.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Python SDK</h3>
                    <p className="text-gray-600 text-sm mb-4">Official Python client for FinanceAI</p>
                    <div className="bg-gray-900 text-white rounded p-3 text-sm mb-3">
                      <code>pip install financeai-python</code>
                    </div>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      View Documentation →
                    </a>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Node.js SDK</h3>
                    <p className="text-gray-600 text-sm mb-4">Official Node.js client for FinanceAI</p>
                    <div className="bg-gray-900 text-white rounded p-3 text-sm mb-3">
                      <code>npm install @financeai/node</code>
                    </div>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      View Documentation →
                    </a>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ruby SDK</h3>
                    <p className="text-gray-600 text-sm mb-4">Official Ruby client for FinanceAI</p>
                    <div className="bg-gray-900 text-white rounded p-3 text-sm mb-3">
                      <code>gem install financeai</code>
                    </div>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      View Documentation →
                    </a>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">PHP SDK</h3>
                    <p className="text-gray-600 text-sm mb-4">Official PHP client for FinanceAI</p>
                    <div className="bg-gray-900 text-white rounded p-3 text-sm mb-3">
                      <code>composer require financeai/php</code>
                    </div>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      View Documentation →
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices Section */}
            <section id="best-practices" className="mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Quality</h3>
                    <p className="text-gray-600">
                      For best results, upload documents with resolution of at least 300 DPI. Ensure text is clearly 
                      visible and not obscured by shadows or glare. PDFs are preferred over image formats when available.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Handling</h3>
                    <p className="text-gray-600">
                      Always implement retry logic with exponential backoff for failed requests. Check the confidence 
                      scores of extracted data and implement a review process for low-confidence results.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Rate Limiting</h3>
                    <p className="text-gray-600">
                      Monitor your rate limit headers and implement queuing for batch processing. Consider upgrading 
                      your plan if you frequently hit rate limits during peak usage.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
                    <p className="text-gray-600">
                      Never expose your API keys in client-side code or public repositories. Rotate keys regularly 
                      and use environment variables to store sensitive credentials.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Retention</h3>
                    <p className="text-gray-600">
                      Documents are automatically deleted after 30 days. Download and store extracted data in your 
                      own systems if you need long-term access. Use the retention settings to adjust storage duration.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-purple-100 mb-6">
                Sign up for your free API key and start processing documents today.
              </p>
              <Link 
                href="/signup"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-block"
              >
                Get Your API Key
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}