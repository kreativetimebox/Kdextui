"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Settings, Check } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always enabled
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    saveCookiePreferences(allPreferences);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    saveCookiePreferences(necessaryOnly);
  };

  const saveCustomPreferences = () => {
    saveCookiePreferences(preferences);
  };

  const saveCookiePreferences = (prefs: typeof preferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === "necessary") return; // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 animate-in fade-in duration-300" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden">
            {/* Simple Banner View */}
            {!showSettings ? (
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      We value your privacy
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                      By clicking "Accept All", you consent to our use of cookies.{" "}
                      <Link href="/cookie-policy" className="text-purple-600 hover:text-purple-800 font-semibold underline">
                        Learn more
                      </Link>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={acceptAll}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Check className="w-5 h-5" />
                        Accept All
                      </button>
                      
                      <button
                        onClick={acceptNecessary}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                      >
                        Necessary Only
                      </button>
                      
                      <button
                        onClick={() => setShowSettings(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all border-2 border-purple-200"
                      >
                        <Settings className="w-5 h-5" />
                        Customize
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={acceptNecessary}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Settings View */
              <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Cookie Preferences
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  Manage your cookie preferences. You can enable or disable different types of cookies below.
                </p>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Necessary Cookies</h4>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                        Always Active
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">
                      Essential for the website to function properly. These cannot be disabled.
                    </p>
                  </div>

                  {/* Functional Cookies */}
                  <div className="bg-white rounded-xl p-4 border-2 border-purple-100 hover:border-purple-300 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Cookie className="w-4 h-4 text-purple-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Functional Cookies</h4>
                      </div>
                      <button
                        onClick={() => togglePreference("functional")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.functional ? "bg-purple-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.functional ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">
                      Enable enhanced functionality like remembering your preferences and settings.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-white rounded-xl p-4 border-2 border-purple-100 hover:border-purple-300 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Cookie className="w-4 h-4 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Analytics Cookies</h4>
                      </div>
                      <button
                        onClick={() => togglePreference("analytics")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.analytics ? "bg-purple-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.analytics ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">
                      Help us understand how visitors interact with our website to improve user experience.
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="bg-white rounded-xl p-4 border-2 border-purple-100 hover:border-purple-300 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Cookie className="w-4 h-4 text-orange-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Marketing Cookies</h4>
                      </div>
                      <button
                        onClick={() => togglePreference("marketing")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.marketing ? "bg-purple-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.marketing ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">
                      Used to deliver personalized advertisements relevant to you and your interests.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-gray-100">
                  <button
                    onClick={saveCustomPreferences}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
                  >
                    <Check className="w-5 h-5" />
                    Save Preferences
                  </button>
                  
                  <button
                    onClick={acceptAll}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-all"
                  >
                    Accept All
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <Link 
                    href="/cookie-policy" 
                    className="text-sm text-purple-600 hover:text-purple-800 font-semibold underline"
                  >
                    View our Cookie Policy
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
