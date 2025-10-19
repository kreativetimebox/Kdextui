import Link from "next/link";
import { Brain, ArrowLeft, Shield, Lock, Eye, Users, FileText, Settings, HomeIcon, BookOpen, DollarSign, Mail, Info } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <Link href="/docs" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all flex items-center gap-1.5">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 text-lg">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: October 19, 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              FinanceAI Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
              you use our AI-powered financial document processing API and related services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, do not use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                    <p className="text-gray-600 mb-3">
                      Information you provide directly to us when you create an account or use our services:
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Name and email address</li>
                      <li>• Company information</li>
                      <li>• Billing and payment information</li>
                      <li>• API usage preferences</li>
                      <li>• Communication preferences</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Document Data</h3>
                    <p className="text-gray-600 mb-3">
                      Information contained in documents you upload for processing:
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Bank statements and transaction data</li>
                      <li>• Receipt and invoice information</li>
                      <li>• Financial document metadata</li>
                      <li>• Extracted data results</li>
                    </ul>
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-green-800 text-sm">
                        <strong>Important:</strong> Financial documents are processed securely and deleted within 24 hours unless you specify otherwise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
                    <p className="text-gray-600 mb-3">
                      Information automatically collected when you use our services:
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• API usage patterns and frequency</li>
                      <li>• Device and browser information</li>
                      <li>• IP address and location data</li>
                      <li>• Website interaction data</li>
                      <li>• Error logs and performance metrics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We use the information we collect for the following purposes:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Service Delivery</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Process financial documents using AI</li>
                  <li>• Provide API access and functionality</li>
                  <li>• Generate usage reports and analytics</li>
                  <li>• Maintain and improve service quality</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Management</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Create and manage user accounts</li>
                  <li>• Process billing and payments</li>
                  <li>• Provide customer support</li>
                  <li>• Send service notifications</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Security & Compliance</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Detect and prevent fraud</li>
                  <li>• Ensure data security</li>
                  <li>• Monitor for unauthorized access</li>
                  <li>• Comply with legal requirements</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Service Improvement</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Analyze usage patterns</li>
                  <li>• Improve AI model accuracy</li>
                  <li>• Develop new features</li>
                  <li>• Optimize performance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties except as described below:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Service Providers</h3>
                <p className="text-gray-600 text-sm">
                  We may share information with trusted third-party service providers who assist us in operating our platform, 
                  conducting business, or serving our users, provided they agree to keep this information confidential.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                <p className="text-gray-600 text-sm">
                  We may disclose information when required by law, such as to comply with a subpoena or similar legal process, 
                  or when we believe disclosure is necessary to protect our rights or safety.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Business Transfers</h3>
                <p className="text-gray-600 text-sm">
                  In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be 
                  transferred as part of that transaction.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We implement comprehensive security measures to protect your information:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Encryption</h3>
                </div>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• TLS 1.3 encryption in transit</li>
                  <li>• AES-256 encryption at rest</li>
                  <li>• End-to-end encrypted API calls</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Access Control</h3>
                </div>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Multi-factor authentication</li>
                  <li>• Role-based access control</li>
                  <li>• Regular access reviews</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Infrastructure</h3>
                </div>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• SOC 2 Type II certified</li>
                  <li>• Regular security audits</li>
                  <li>• Isolated processing environments</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Monitoring</h3>
                </div>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• 24/7 security monitoring</li>
                  <li>• Intrusion detection systems</li>
                  <li>• Automated threat response</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Document Processing Data</h3>
              <p className="text-gray-600 mb-4">
                Financial documents you upload for processing are automatically deleted within 24 hours of processing completion, 
                unless you explicitly request longer retention for your records.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-3">Account Information</h3>
              <p className="text-gray-600 mb-4">
                We retain your account information for as long as your account is active or as needed to provide you services. 
                You may request account deletion at any time.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-3">Usage Data</h3>
              <p className="text-gray-600">
                Aggregated and anonymized usage data may be retained for up to 3 years for service improvement purposes.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Access</h3>
                  <p className="text-gray-600 text-sm">Request access to your personal information we hold</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Correction</h3>
                  <p className="text-gray-600 text-sm">Request correction of inaccurate or incomplete information</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Deletion</h3>
                  <p className="text-gray-600 text-sm">Request deletion of your personal information</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Portability</h3>
                  <p className="text-gray-600 text-sm">Request transfer of your data to another service provider</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Objection</h3>
                  <p className="text-gray-600 text-sm">Object to processing of your personal information</p>
                </div>
              </div>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our services are hosted in the United States. If you are accessing our services from outside the United States, 
              please be aware that your information may be transferred to, stored, and processed in the United States.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We ensure that any international transfers comply with applicable data protection laws and implement appropriate 
              safeguards to protect your information.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul className="text-gray-600 space-y-2 mb-4">
              <li>• Posting the updated policy on our website</li>
              <li>• Sending you an email notification</li>
              <li>• Displaying a prominent notice on our platform</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-600 mb-6">
              <p><strong>Privacy Officer:</strong> privacy@financeai.com</p>
              <p><strong>General Inquiries:</strong> support@financeai.com</p>
              <p><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94102</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/cookie-policy"
                className="inline-flex items-center justify-center gap-2 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}