"use client";

import Link from "next/link";
import { Brain, HomeIcon, BookOpen, DollarSign, Mail, Info, LayoutDashboard, LogOut, User, HelpCircle, Activity, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface DashboardNavigationProps {
  userName: string;
  userEmail: string;
}

export default function DashboardNavigation({ userName, userEmail }: DashboardNavigationProps) {
  const router = useRouter();
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowResourcesMenu(false);
      }
    };

    if (showResourcesMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showResourcesMenu]);

  const toggleResourcesMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowResourcesMenu(!showResourcesMenu);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/');
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/docs', label: 'Documentation', icon: BookOpen },
    { href: '/pricing', label: 'Pricing', icon: DollarSign },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, isActive: true },
  ];

  const resourceItems = [
    { href: '/help', label: 'Help Center', icon: HelpCircle },
    { href: '/status', label: 'System Status', icon: Activity },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  const userInitial = userName.charAt(0).toUpperCase();

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
              const isActive = item.isActive;
              
              return (
                <Link
                  key={item.label}
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

            {/* Resources Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative"
            >
              <button
                onClick={toggleResourcesMenu}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                <Info className="h-4 w-4" />
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${showResourcesMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showResourcesMenu && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 z-50"
                >
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    {resourceItems.map((item) => {
                      const Icon = item.icon;
                      
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowResourcesMenu(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-sm transition-colors text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/profile"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition-all"
            >
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{userInitial}</span>
              </div>
              <div className="hidden lg:block">
                <span className="text-gray-700 text-sm font-medium block">{userName}</span>
                <span className="text-xs text-gray-500">{userEmail}</span>
              </div>
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-all flex items-center gap-1.5 md:hidden"
              title="Profile"
            >
              <User className="h-4 w-4" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-all flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
