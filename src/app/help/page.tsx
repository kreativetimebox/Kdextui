"use client";

import Link from "next/link";
import { Brain, Search, Book, MessageCircle, FileQuestion, Zap, Shield, CreditCard, Code, Users, HelpCircle, ChevronRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      articles: [
        { title: "Quick Start Guide", href: "#quick-start" },
        { title: "Account Setup", href: "#account-setup" },
        { title: "API Key Generation", href: "#api-key" },
        { title: "First API Request", href: "#first-request" },
      ],
    },
    {
      icon: Code,
      title: "API Documentation",
      description: "Complete API reference and examples",
      articles: [
        { title: "Authentication", href: "/docs#authentication" },
        { title: "Document Processing", href: "/docs#endpoints" },
        { title: "Error Handling", href: "/docs#errors" },
        { title: "Rate Limits", href: "/docs#rate-limits" },
      ],
    },
    {
      icon: CreditCard,
      title: "Billing & Plans",
      description: "Manage your subscription and payments",
      articles: [
        { title: "Pricing Plans", href: "/pricing" },
        { title: "Upgrade Your Plan", href: "#upgrade" },
        { title: "Payment Methods", href: "#payment" },
        { title: "Invoices & Receipts", href: "#invoices" },
      ],
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Keep your data safe and compliant",
      articles: [
        { title: "Data Security", href: "#security" },
        { title: "Privacy Policy", href: "/privacy-policy" },
        { title: "GDPR Compliance", href: "#gdpr" },
        { title: "Data Retention", href: "#retention" },
      ],
    },
    {
      icon: Zap,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: [
        { title: "API Errors", href: "#api-errors" },
        { title: "Upload Issues", href: "#upload-issues" },
        { title: "Authentication Problems", href: "#auth-problems" },
        { title: "Performance Tips", href: "#performance" },
      ],
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Manage your account settings",
      articles: [
        { title: "Update Profile", href: "#profile" },
        { title: "Change Password", href: "#password" },
        { title: "API Key Management", href: "#api-keys" },
        { title: "Delete Account", href: "#delete-account" },
      ],
    },
  ];

  const faqs = [
    {
      question: "How do I get started with FinanceAI?",
      answer: "Sign up for a free account, get your API key from the dashboard, and start making API requests. Check our Quick Start Guide for detailed instructions.",
    },
    {
      question: "What document types are supported?",
      answer: "We support bank statements (PDF, CSV), receipts (JPG, PNG, PDF), and invoices (PDF). Our AI can extract data from various formats and layouts.",
    },
    {
      question: "How accurate is the data extraction?",
      answer: "Our AI achieves 98%+ accuracy on standard documents. For custom or complex documents, accuracy may vary. You can review and verify all extracted data.",
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes! We use bank-level encryption (AES-256), comply with SOC 2 standards, and never store your original documents longer than necessary for processing.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
    },
    {
      question: "What are the rate limits?",
      answer: "Rate limits vary by plan: Free (100/day), Starter (1,000/day), Professional (10,000/day), Enterprise (custom). Check the Pricing page for details.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Navigation currentPage="help" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <HelpCircle className="h-5 w-5" />
              <span className="font-semibold">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
              Search our knowledge base or browse categories to find answers to your questions
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-purple-200 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.map((article) => (
                    <li key={article.title}>
                      <Link
                        href={article.href}
                        className="flex items-center justify-between text-purple-600 hover:text-purple-800 group"
                      >
                        <span className="text-sm font-medium">{article.title}</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-100 hover:border-purple-300 transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <FileQuestion className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-2xl p-12 text-center text-white">
          <MessageCircle className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <Mail className="h-5 w-5" />
              Contact Support
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-all border-2 border-white/20"
            >
              <Book className="h-5 w-5" />
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
