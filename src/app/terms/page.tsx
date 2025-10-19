"use client";

import Link from "next/link";
import { Brain, FileText, Shield, AlertCircle, CheckCircle, Scale } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Scale className="h-5 w-5" />
            <span className="font-semibold">Legal</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">
            Please read these terms and conditions carefully before using our service.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: October 19, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-8 md:p-12">
          
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using FinanceAI (&quot;Service&quot;), you agree to be bound by these Terms and Conditions 
              (&quot;Terms&quot;). If you disagree with any part of the terms, you may not access the Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          {/* Use License */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily use the FinanceAI API for personal or commercial purposes, 
              subject to these restrictions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You must not modify or copy the materials</li>
              <li>You must not use the materials for any commercial purpose without a valid subscription</li>
              <li>You must not attempt to decompile or reverse engineer any software contained in the Service</li>
              <li>You must not remove any copyright or other proprietary notations from the materials</li>
              <li>You must not transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
            </ul>
          </section>

          {/* Account Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Terms</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  You must be 18 years or older to use this Service
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  You must provide your legal full name, a valid email address, and any other information 
                  requested in order to complete the signup process
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  You are responsible for maintaining the security of your account and password
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  You are responsible for all activity that occurs under your account
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  You may not use the Service for any illegal or unauthorized purpose
                </p>
              </div>
            </div>
          </section>

          {/* API Usage */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. API Usage and Rate Limits</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your use of the FinanceAI API is subject to the following conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You must comply with the rate limits specified in your subscription plan</li>
              <li>Excessive API calls may result in temporary suspension of your account</li>
              <li>You must not attempt to bypass rate limits or other technical restrictions</li>
              <li>You must not share your API key with unauthorized third parties</li>
              <li>API keys must be kept secure and confidential</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment and Billing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For paid subscriptions, the following terms apply:
            </p>
            <div className="bg-purple-50 border-2 border-purple-100 rounded-xl p-6 space-y-3">
              <p className="text-gray-700">
                <strong>Billing Cycle:</strong> All fees are billed in advance on a monthly or annual basis, 
                depending on your selected plan.
              </p>
              <p className="text-gray-700">
                <strong>Payment Method:</strong> You must provide valid payment information and authorize us 
                to charge the applicable fees.
              </p>
              <p className="text-gray-700">
                <strong>Automatic Renewal:</strong> Your subscription will automatically renew unless you cancel 
                before the renewal date.
              </p>
              <p className="text-gray-700">
                <strong>Refunds:</strong> Refunds are issued on a case-by-case basis. Generally, fees are non-refundable 
                except as required by law.
              </p>
              <p className="text-gray-700">
                <strong>Price Changes:</strong> We reserve the right to modify our pricing with 30 days notice.
              </p>
            </div>
          </section>

          {/* Data and Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your use of the Service is also governed by our{" "}
              <Link href="/privacy-policy" className="text-purple-600 hover:text-purple-800 font-semibold underline">
                Privacy Policy
              </Link>
              . By using the Service, you acknowledge that you have read and understood our privacy practices.
            </p>
            <div className="flex items-start gap-3 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 font-semibold mb-2">Data Security</p>
                <p className="text-gray-700">
                  We implement industry-standard security measures to protect your data. However, no method of 
                  transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive 
              property of FinanceAI and its licensors.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>All trademarks, logos, and service marks are owned by FinanceAI or third parties</li>
              <li>You may not use our trademarks without prior written consent</li>
              <li>Data you upload remains your property, but you grant us license to process it</li>
              <li>Extracted data and analysis results are provided for your use under your subscription</li>
            </ul>
          </section>

          {/* Prohibited Uses */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Uses</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not use the Service:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">For any unlawful purpose or to violate any laws</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">To transmit any malicious code, viruses, or harmful data</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">To interfere with or disrupt the Service or servers</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">To impersonate or attempt to impersonate FinanceAI or other users</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">To harvest or collect information about other users</p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any 
              reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate 
              your account, you may simply discontinue using the Service or contact our support team.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                In no event shall FinanceAI, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential or punitive damages, including without 
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of the Service is at your sole risk. The Service is provided on an &quot;AS IS&quot; and 
              &quot;AS AVAILABLE&quot; basis. The Service is provided without warranties of any kind, whether 
              express or implied, including, but not limited to, implied warranties of merchantability, fitness 
              for a particular purpose, non-infringement or course of performance.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of the United States, 
              without regard to its conflict of law provisions. Our failure to enforce any right or provision 
              of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              We will provide notice of material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Posting the updated Terms on this page</li>
              <li>Updating the &quot;Last updated&quot; date at the top of this page</li>
              <li>Sending an email notification to your registered email address</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Your continued use of the Service after any changes indicates your acceptance of the updated Terms.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-purple-50 border-2 border-purple-100 rounded-xl p-6 space-y-2">
              <p><strong>Email:</strong> legal@financeai.com</p>
              <p><strong>Address:</strong> FinanceAI Inc., 123 AI Street, San Francisco, CA 94105</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Acceptance of Terms</h3>
                <p className="text-gray-700">
                  By using FinanceAI, you acknowledge that you have read, understood, and agree to be bound by 
                  these Terms and Conditions. If you do not agree to these terms, please do not use our Service.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link 
            href="/privacy-policy"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all border-2 border-purple-200 shadow-md"
          >
            <Shield className="h-5 w-5" />
            Privacy Policy
          </Link>
          <Link 
            href="/cookie-policy"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all border-2 border-purple-200 shadow-md"
          >
            <FileText className="h-5 w-5" />
            Cookie Policy
          </Link>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
          >
            Contact Support
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
