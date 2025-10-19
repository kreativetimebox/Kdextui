"use client";

import Link from "next/link";
import { Brain, Cookie, Settings, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Navigation currentPage="home" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-600 text-lg">
              Learn how FinanceAI uses cookies to improve your experience
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
              Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
              as well as to provide reporting information.
            </p>
            <p className="text-gray-600 leading-relaxed">
              At FinanceAI, we use cookies to enhance your experience, understand how you interact with our services, 
              and improve our API documentation and user interface.
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                    <p className="text-gray-600 mb-3">
                      These cookies are necessary for the website to function and cannot be switched off. 
                      They are usually only set in response to actions made by you such as logging in or filling in forms.
                    </p>
                    <div className="text-sm text-gray-500">
                      <strong>Examples:</strong> Authentication tokens, session management, security settings
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                    <p className="text-gray-600 mb-3">
                      These cookies help us understand how visitors interact with our website by collecting 
                      and reporting information anonymously. This helps us improve our services.
                    </p>
                    <div className="text-sm text-gray-500">
                      <strong>Examples:</strong> Google Analytics, page views, user journey tracking
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                    <p className="text-gray-600 mb-3">
                      These cookies enable enhanced functionality and personalization, such as remembering 
                      your preferences and settings.
                    </p>
                    <div className="text-sm text-gray-500">
                      <strong>Examples:</strong> Language preferences, theme settings, API key visibility
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cookie Details */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Cookie Information</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">auth-token</td>
                    <td className="px-4 py-3 text-sm text-gray-600">User authentication</td>
                    <td className="px-4 py-3 text-sm text-gray-600">24 hours</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Essential</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">session-id</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Session management</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Session</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Essential</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">_ga</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Google Analytics tracking</td>
                    <td className="px-4 py-3 text-sm text-gray-600">2 years</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Analytics</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">theme-preference</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Remember user theme choice</td>
                    <td className="px-4 py-3 text-sm text-gray-600">1 year</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Functional</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">api-key-visibility</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Remember API key show/hide preference</td>
                    <td className="px-4 py-3 text-sm text-gray-600">30 days</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Functional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie 
              preferences by clicking on the appropriate opt-out links provided below or by modifying your 
              browser settings.
            </p>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Settings</h3>
              <p className="text-gray-600 mb-4">
                Most web browsers allow you to control cookies through their settings preferences. 
                To find out more about cookies, including how to see what cookies have been set, 
                visit <a href="https://www.aboutcookies.org" className="text-purple-600 hover:text-purple-700">www.aboutcookies.org</a> or 
                <a href="https://www.allaboutcookies.org" className="text-purple-600 hover:text-purple-700 ml-1">www.allaboutcookies.org</a>.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li>• <strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
                <li>• <strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li>• <strong>Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may use third-party services that set cookies on our behalf. These services help us 
              analyze website traffic, understand user behavior, and improve our services.
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Google Analytics</h3>
                <p className="text-gray-600 text-sm mb-2">
                  We use Google Analytics to understand how users interact with our website.
                </p>
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  Google Privacy Policy →
                </a>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. We will notify you of any material 
              changes by posting the updated policy on our website.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We encourage you to review this Cookie Policy periodically to stay informed about how 
              we use cookies and related technologies.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> privacy@financeai.com</p>
              <p><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94102</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/privacy-policy"
            className="text-center bg-white border border-purple-200 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="text-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}