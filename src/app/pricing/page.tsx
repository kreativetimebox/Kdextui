'use client'

import { useState } from "react";
import Link from "next/link";
import { Brain, Check, Zap, Shield, HeadphonesIcon, HomeIcon, BookOpen, DollarSign, Mail, Info } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Navigation currentPage="pricing" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-100 rounded-full">
            <span className="text-purple-700 font-semibold text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Flexible Plans for Every Business
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Simple, <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Transparent</span> Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Choose the perfect plan for your document processing needs. 
            Start free and scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-6 mb-12">
            <span className={`text-lg font-semibold transition-colors ${!isAnnual ? 'text-purple-600' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-300 shadow-lg ${
                isAnnual ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                  isAnnual ? 'translate-x-10' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-semibold transition-colors ${isAnnual ? 'text-purple-600' : 'text-gray-500'}`}>
              Annual
              <span className="ml-2 text-sm bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full font-bold shadow-md">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <div className="group bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 relative hover:border-purple-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-5xl font-extrabold text-gray-900 mb-2">
                $0
                <span className="text-xl font-normal text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 font-medium">Perfect for trying out our service</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">100 documents per month</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">All document types</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Basic API access</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">5 requests per minute</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Email support</span>
              </div>
            </div>

            <Link
              href="/signup"
              className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl hover:bg-gray-800 transition-all font-bold text-center block shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="group bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-2xl border-2 border-purple-600 p-8 relative transform scale-105 hover:scale-110 transition-all duration-300">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
                ${isAnnual ? '39' : '49'}
                <span className="text-xl font-normal text-gray-500">/{isAnnual ? 'month' : 'month'}</span>
              </div>
              {isAnnual && (
                <div className="text-sm text-gray-500 mb-2">
                  Billed annually at $468/year
                </div>
              )}
              <p className="text-gray-600">For growing businesses</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">5,000 documents per month</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">All document types</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Full API access</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">50 requests per minute</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Priority email support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Advanced analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Webhook notifications</span>
              </div>
            </div>

            <Link
              href="/signup"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-bold text-center block shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              {isAnnual ? 'Start Annual Plan' : 'Start Pro Trial'}
            </Link>
            {isAnnual && (
              <p className="text-center text-sm text-purple-600 font-semibold mt-3">
                Billed annually • Save $120/year
              </p>
            )}
          </div>

          {/* Business Plan */}
          <div className="group bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 relative hover:border-purple-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
              <div className="text-5xl font-extrabold text-gray-900 mb-2">
                ${isAnnual ? '79' : '99'}
                <span className="text-xl font-normal text-gray-500">/{isAnnual ? 'month' : 'month'}</span>
              </div>
              {isAnnual && (
                <div className="text-sm text-gray-500 mb-2">
                  Billed annually at $948/year
                </div>
              )}
              <p className="text-gray-600">For scaling teams</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">15,000 documents per month</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">All document types</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Full API access</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">100 requests per minute</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">24/7 priority support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Advanced analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Webhook notifications</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Custom API integrations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Dedicated account manager</span>
              </div>
            </div>

            <Link
              href="/signup"
              className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl hover:bg-gray-800 transition-all font-bold text-center block shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isAnnual ? 'Start Business Plan' : 'Start Business Plan'}
            </Link>
            {isAnnual && (
              <p className="text-center text-sm text-green-600 font-semibold mt-3">
                Billed annually • Save $240/year
              </p>
            )}
          </div>

          {/* Enterprise Plan */}
          <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border-2 border-gray-300 p-8 relative hover:border-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-8">
              <div className="inline-block mb-2 px-3 py-1 bg-blue-100 rounded-full">
                <span className="text-blue-700 font-semibold text-xs flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Premium Support
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-5xl font-extrabold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
                Custom
              </div>
              <p className="text-gray-600 font-medium">For large scale operations</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Unlimited documents</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">All document types</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Custom integrations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Custom rate limits</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">24/7 phone support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Dedicated account manager</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">SLA guarantees</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-center block"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              See what&apos;s included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6">
                    <div className="font-semibold text-gray-900">Free</div>
                    <div className="text-sm font-normal text-gray-600">$0/month</div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="font-semibold text-purple-600">Pro</div>
                    <div className="text-sm font-normal text-gray-600">
                      ${isAnnual ? '39' : '49'}/{isAnnual ? 'month' : 'month'}
                    </div>
                    {isAnnual && (
                      <div className="text-xs text-green-600">Save 20%</div>
                    )}
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="font-semibold text-gray-900">Business</div>
                    <div className="text-sm font-normal text-gray-600">
                      ${isAnnual ? '79' : '99'}/{isAnnual ? 'month' : 'month'}
                    </div>
                    {isAnnual && (
                      <div className="text-xs text-green-600">Save 20%</div>
                    )}
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="font-semibold text-gray-900">Enterprise</div>
                    <div className="text-sm font-normal text-gray-600">Custom</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Documents per month</td>
                  <td className="py-4 px-6 text-center text-gray-600">100</td>
                  <td className="py-4 px-6 text-center text-gray-600">5,000</td>
                  <td className="py-4 px-6 text-center text-gray-600">15,000</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">API Rate Limit</td>
                  <td className="py-4 px-6 text-center text-gray-600">5/min</td>
                  <td className="py-4 px-6 text-center text-gray-600">50/min</td>
                  <td className="py-4 px-6 text-center text-gray-600">100/min</td>
                  <td className="py-4 px-6 text-center text-gray-600">Custom</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Bank Statements</td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Receipts & Invoices</td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Advanced Analytics</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Webhook Notifications</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Custom API Integrations</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Dedicated Account Manager</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">SLA Guarantees</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center text-gray-400">-</td>
                  <td className="py-4 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose FinanceAI?
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Built for modern businesses that need reliable, accurate document processing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-purple-100">
                Process thousands of documents in seconds with 99.5% accuracy using our advanced AI models.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-purple-100">
                SOC 2 compliant with end-to-end encryption. Your data is always secure and never stored.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-purple-100">
                Get help when you need it with our dedicated support team and comprehensive documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What types of documents can you process?
              </h3>
              <p className="text-gray-600">
                We support bank statements, receipts, invoices, and other financial documents in PDF, PNG, and JPG formats. Our AI can extract transaction details, amounts, dates, merchant information, and more.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How accurate is the data extraction?
              </h3>
              <p className="text-gray-600">
                Our AI achieves 99.5% accuracy across all document types. We continuously improve our models based on new data and user feedback.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Yes, absolutely. We&apos;re SOC 2 compliant and use end-to-end encryption. Documents are processed in real-time and never stored on our servers.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you&apos;re not satisfied, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of businesses that trust FinanceAI for their document processing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/signup" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold text-lg"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pricing FAQs
          </h2>
          <p className="text-xl text-gray-600">
            Common questions about our pricing and plans
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Can I change plans at any time?
            </h3>
            <p className="text-gray-600">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
              and we&apos;ll pro-rate any charges or credits on your next bill.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What happens if I exceed my monthly document limit?
            </h3>
            <p className="text-gray-600">
              We&apos;ll notify you when you reach 80% and 100% of your limit. You can either upgrade your plan 
              or purchase additional documents at $0.10 per document. Your API won&apos;t be blocked.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Do unused documents roll over to the next month?
            </h3>
            <p className="text-gray-600">
              No, document credits reset at the beginning of each billing cycle. However, Enterprise customers 
              can negotiate custom terms including document rollover.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Is there a free trial?
            </h3>
            <p className="text-gray-600">
              Yes! All paid plans come with a 14-day free trial. No credit card required to start. 
              You can also start with our free plan to test the platform with 100 documents per month.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards (Visa, Mastercard, American Express), ACH transfers for Enterprise 
              customers, and can issue invoices for annual subscriptions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How does the annual discount work?
            </h3>
            <p className="text-gray-600">
              Save 20% by paying annually instead of monthly. For example, the Pro plan costs $588/year (instead 
              of $720), saving you $132. Annual plans are billed once per year.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What&apos;s included in priority support?
            </h3>
            <p className="text-gray-600">
              Priority support includes: 4-hour response time (vs. 24 hours), direct phone and chat access, 
              dedicated account manager, and priority feature requests.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Can I get a refund?
            </h3>
            <p className="text-gray-600">
              Yes, we offer a 30-day money-back guarantee for all plans. If you&apos;re not satisfied, contact us 
              within 30 days of your first payment for a full refund.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}