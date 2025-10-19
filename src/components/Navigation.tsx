"use client";

import Link from "next/link";
import { Brain, HomeIcon, BookOpen, DollarSign, Mail, Info, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NavigationProps {
  currentPage?: 'home' | 'docs' | 'pricing' | 'contact' | 'about' | 'dashboard';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon, key: 'home' },
    { href: '/docs', label: 'Documentation', icon: BookOpen, key: 'docs' },
    { href: '/pricing', label: 'Pricing', icon: DollarSign, key: 'pricing' },
    ...(isAuthenticated ? [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' }] : []),
    { href: '/contact', label: 'Contact', icon: Mail, key: 'contact' },
    { href: '/about', label: 'About', icon: Info, key: 'about' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Brain className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-colors" />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              FinanceAI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.key;
              
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-purple-600 font-semibold'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center space-x-3">
                {user && (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden lg:block">
                      <span className="text-gray-700 text-sm font-medium block">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                )}
                <Link 
                  href="/dashboard" 
                  className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
