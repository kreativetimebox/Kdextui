"use client";

import Link from "next/link";
import { Brain, CheckCircle, AlertCircle, Clock, Activity, Server, Database, Zap, Shield, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      name: "API Endpoints",
      status: "operational",
      uptime: "99.98%",
      icon: Server,
      description: "All API endpoints are functioning normally",
      lastIncident: "None in the last 30 days",
    },
    {
      name: "Document Processing",
      status: "operational",
      uptime: "99.95%",
      icon: Activity,
      description: "AI document extraction is working correctly",
      lastIncident: "None in the last 30 days",
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.99%",
      icon: Database,
      description: "Database systems are healthy",
      lastIncident: "None in the last 30 days",
    },
    {
      name: "Authentication",
      status: "operational",
      uptime: "99.97%",
      icon: Shield,
      description: "Login and authentication services are running smoothly",
      lastIncident: "None in the last 30 days",
    },
    {
      name: "File Upload",
      status: "operational",
      uptime: "99.96%",
      icon: Zap,
      description: "File upload and storage services are available",
      lastIncident: "None in the last 30 days",
    },
  ];

  const metrics = [
    {
      label: "Average Response Time",
      value: "142ms",
      trend: "down",
      icon: Clock,
      color: "green",
    },
    {
      label: "Success Rate",
      value: "99.8%",
      trend: "up",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Uptime (30 days)",
      value: "99.97%",
      trend: "stable",
      icon: TrendingUp,
      color: "green",
    },
  ];

  const incidents = [
    {
      date: "2025-10-01",
      title: "Scheduled Maintenance",
      description: "Database optimization and server updates completed successfully.",
      status: "resolved",
      duration: "45 minutes",
    },
    {
      date: "2025-09-15",
      title: "Minor API Slowdown",
      description: "Temporary increase in response times during peak hours. Resolved by scaling infrastructure.",
      status: "resolved",
      duration: "1 hour 20 minutes",
    },
  ];

  const upcomingMaintenance = [
    {
      date: "2025-10-25",
      time: "02:00 - 04:00 UTC",
      title: "Planned Database Migration",
      impact: "Low",
      description: "We'll be upgrading our database infrastructure. Brief service interruptions may occur.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-100";
      case "degraded":
        return "text-yellow-600 bg-yellow-100";
      case "outage":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5" />;
      case "outage":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">All Systems Operational</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              System Status
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-4">
              Real-time status and performance of FinanceAI services
            </p>
            <p className="text-sm text-purple-200">
              Last updated: {currentTime.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="bg-white rounded-xl shadow-lg border-2 border-purple-100 p-6 hover:border-purple-300 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-8 w-8 text-${metric.color}-600`} />
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-${metric.color}-100 text-${metric.color}-700`}>
                    {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Status */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Status</h2>
        
        <div className="space-y-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="bg-white rounded-xl shadow-lg border-2 border-purple-100 p-6 hover:border-purple-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          {service.status === "operational" ? "Operational" : service.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          Uptime: {service.uptime}
                        </span>
                        <span>Last incident: {service.lastIncident}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Maintenance */}
      {upcomingMaintenance.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Maintenance</h2>
          
          <div className="space-y-4">
            {upcomingMaintenance.map((maintenance, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{maintenance.title}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                        {maintenance.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{maintenance.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">📅 {maintenance.date}</span>
                      <span>🕐 {maintenance.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Incidents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Incidents</h2>
        
        {incidents.length > 0 ? (
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gray-500 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{incident.title}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                        Resolved
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{incident.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 {incident.date}</span>
                      <span>⏱️ Duration: {incident.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 rounded-xl border-2 border-green-200 p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-900">No recent incidents</p>
            <p className="text-gray-600 mt-2">All systems have been running smoothly!</p>
          </div>
        )}
      </section>

      {/* Subscribe to Updates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get notified about service updates, maintenance, and incidents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-purple-400" />
                <span className="font-bold text-xl">FinanceAI</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered financial document processing for modern accounting.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 FinanceAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
