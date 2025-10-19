"use client";

import Link from "next/link";
import { Brain, Users, Target, Award, ArrowRight, Lightbulb, Shield, HomeIcon, BookOpen, DollarSign, Mail, Info } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Navigation currentPage="about" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About FinanceAI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re revolutionizing financial document processing with cutting-edge AI technology, 
            helping accountants and businesses save time while increasing accuracy.
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10M+</div>
            <div className="text-gray-600">Documents Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">99.5%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">API Availability</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower accounting professionals with AI-driven technology that eliminates manual data entry, 
              reduces errors, and accelerates financial workflows. We believe technology should enhance human 
              expertise, not replace it.
            </p>
          </div>
          
          <div className="group bg-white rounded-3xl shadow-2xl p-10 border-2 border-gray-100 hover:border-purple-200 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become the global standard for intelligent financial document processing, enabling businesses 
              of all sizes to achieve unprecedented levels of efficiency and accuracy in their financial operations.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Founded in 2023 by a team of AI researchers and accounting professionals, FinanceAI was born 
                from a simple observation: accountants were spending too much time on repetitive data entry 
                tasks that could be automated with the right technology.
              </p>
              <p>
                Our founders, having worked in both Big Four accounting firms and leading AI research labs, 
                understood the pain points of manual document processing firsthand. They witnessed countless 
                hours wasted on extracting data from bank statements, receipts, and invoices - tasks that 
                were both tedious and error-prone.
              </p>
              <p>
                Today, FinanceAI processes millions of financial documents monthly for accounting firms, 
                small businesses, and enterprise clients worldwide. Our AI models, trained on diverse 
                financial documents, achieve industry-leading accuracy while maintaining the highest 
                standards of data security and privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core principles guide everything we do, from product development to customer support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Security First</h3>
            <p className="text-gray-600">
              Your financial data is sacred. We employ enterprise-grade security measures and never store 
              sensitive information longer than necessary.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
            <p className="text-gray-600">
              We&apos;re obsessed with accuracy and performance. Every model update and feature release 
              undergoes rigorous testing to ensure reliability.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer-Centric</h3>
            <p className="text-gray-600">
              Your success is our success. We listen to feedback, iterate quickly, and provide support 
              that goes above and beyond expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the experts behind FinanceAI&apos;s innovative technology and customer success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">SM</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Mitchell</h3>
            <p className="text-purple-600 font-medium mb-4">CEO & Co-Founder</p>
            <p className="text-gray-600 text-sm">
              Former Big Four partner with 15+ years in financial services. PhD in Computer Science from Stanford.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">DK</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">David Kim</h3>
            <p className="text-purple-600 font-medium mb-4">CTO & Co-Founder</p>
            <p className="text-gray-600 text-sm">
              AI research veteran from Google Brain. Specialized in document understanding and OCR technologies.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">AR</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Alex Rodriguez</h3>
            <p className="text-purple-600 font-medium mb-4">VP of Product</p>
            <p className="text-gray-600 text-sm">
              Product management expert from fintech unicorns. Passionate about user experience and API design.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-purple-600 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recognition & Achievements</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              We&apos;re proud of the recognition we&apos;ve received from industry leaders and customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">🏆</div>
              <div className="font-semibold mb-1">Best AI Startup 2024</div>
              <div className="text-purple-200 text-sm">TechCrunch Awards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">⭐</div>
              <div className="font-semibold mb-1">4.9/5 Rating</div>
              <div className="text-purple-200 text-sm">G2 Customer Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">🛡️</div>
              <div className="font-semibold mb-1">SOC 2 Certified</div>
              <div className="text-purple-200 text-sm">Enterprise Security</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">🚀</div>
              <div className="font-semibold mb-1">$10M Series A</div>
              <div className="text-purple-200 text-sm">Funded by Top VCs</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of accounting professionals who have already revolutionized their document processing with FinanceAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium inline-flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}