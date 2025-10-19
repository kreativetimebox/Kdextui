"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, Key, FileText, BarChart3, Copy, Eye, EyeOff, Plus, Settings, LayoutDashboard, LogOut } from "lucide-react";
import DashboardNavigation from "@/components/DashboardNavigation";

interface User {
  id: string;
  name: string;
  email: string;
  api_key: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [showApiKey, setShowApiKey] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      
      if (!response.ok) {
        // User not authenticated, redirect to login
        router.push('/login');
        return;
      }

      const data = await response.json();
      setUser(data.user);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      router.push('/login');
    }
  };

  const copyApiKey = () => {
    if (user?.api_key) {
      navigator.clipboard.writeText(user.api_key);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <DashboardNavigation userName={user.name} userEmail={user.email} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-3">Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your API keys and monitor document processing usage</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="group bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-8 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Documents Processed</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">1,247</p>
                <p className="text-sm font-semibold text-green-600 flex items-center gap-1">
                  <span className="text-lg">↗</span> +23% from last month
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">API Calls This Month</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">3,892</p>
                <p className="text-sm font-semibold text-gray-600">1,108 remaining</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl shadow-xl border-2 border-green-100 p-8 hover:border-green-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Success Rate</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">99.2%</p>
                <p className="text-sm font-semibold text-green-600 flex items-center gap-1">
                  <span className="text-lg">↗</span> +0.3% from last month
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Keys Section */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-100 p-8 hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow-lg">
                  <Key className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 font-semibold">
                <Plus className="h-4 w-4" />
                <span>New Key</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Production Key</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <code className="bg-gray-100 px-3 py-2 rounded flex-1 font-mono text-sm">
                    {showApiKey ? user.api_key : user.api_key.replace(/./g, '•')}
                  </code>
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={copyApiKey}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title={copySuccess ? "Copied!" : "Copy API key"}
                  >
                    <Copy className={`h-4 w-4 ${copySuccess ? 'text-green-600' : ''}`} />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Created: {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>

            {copySuccess && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700 font-medium">✓ API key copied to clipboard!</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border-l-4 border-green-500 bg-green-50 rounded-r">
                <div className="bg-green-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Bank statement processed</p>
                  <p className="text-sm text-gray-500">2 minutes ago • 15 transactions extracted</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Success</span>
              </div>

              <div className="flex items-center space-x-4 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Receipt scanned</p>
                  <p className="text-sm text-gray-500">15 minutes ago • Merchant: Office Depot</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Success</span>
              </div>

              <div className="flex items-center space-x-4 p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r">
                <div className="bg-purple-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Invoice processed</p>
                  <p className="text-sm text-gray-500">1 hour ago • Supplier: Tech Solutions Inc</p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Success</span>
              </div>

              <div className="flex items-center space-x-4 p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Document processing failed</p>
                  <p className="text-sm text-gray-500">2 hours ago • File format not supported</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Failed</span>
              </div>

              <div className="flex items-center space-x-4 p-3 border-l-4 border-green-500 bg-green-50 rounded-r">
                <div className="bg-green-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Bank statement processed</p>
                  <p className="text-sm text-gray-500">3 hours ago • 23 transactions extracted</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Success</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/docs" 
              className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow group"
            >
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-purple-200 transition-colors">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">API Documentation</h3>
              <p className="text-gray-600">View complete API reference and integration guides</p>
            </Link>

            <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow group cursor-pointer">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Analytics</h3>
              <p className="text-gray-600">Monitor your API usage and performance metrics</p>
            </div>

            <Link
              href="/pricing"
              className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow group"
            >
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-green-200 transition-colors">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgrade Plan</h3>
              <p className="text-gray-600">View pricing and upgrade to unlock more features</p>
            </Link>
          </div>
        </div>

        {/* Billing & Subscription */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Subscription & Billing</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Plan */}
            <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">Free Plan</div>
                    <div className="text-sm text-gray-600">100 documents per month</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">$0</div>
                    <div className="text-sm text-gray-600">/month</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Documents used this month</span>
                    <span className="font-medium">73 / 100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '73%'}}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/pricing"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center block"
                  >
                    Upgrade to Pro
                  </Link>
                </div>
              </div>
            </div>

            {/* Usage Trends */}
            <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This month</span>
                  <span className="font-semibold text-gray-900">73 documents</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last month</span>
                  <span className="font-semibold text-gray-900">45 documents</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average per month</span>
                  <span className="font-semibold text-gray-900">59 documents</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Document Types Processed</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bank Statements</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Receipts</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Invoices</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}