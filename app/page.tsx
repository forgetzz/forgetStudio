"use client";
import React, { useState } from "react";
import {
  Search,
  Download,
  Star,
  Shield,
  Users,
  Menu,
  X,
  Play,
  TrendingUp,
  Award,
  Zap,
  Gift,
  Package
} from "lucide-react";

interface App {
  id: number;
  name: string;
  category: string;
  rating: number;
  downloads: string;
  icon: string;
  description: string;
  size: string;
  featured?: boolean;
  downloadUrl?: string;
}

interface DownloadStatus {
  [key: string | number]: "downloading" | "completed" | null;
}

export default function CheerfulAPKStore() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({});

  // Function to handle APK download
  const handleDownload = (
    appId: string | number,
    appName: string,
    downloadUrl: string | null = null
  ): void => {
    // Set downloading status
    setDownloadStatus((prev) => ({ ...prev, [appId]: "downloading" as const }));

    // Sample APK URL - replace with your actual APK URLs
    const apkUrl =
      downloadUrl ||
      `https://example.com/apks/${appName
        .toLowerCase()
        .replace(/\s+/g, "")}.apk`;

    // Create download link
    const link = document.createElement("a");
    link.href = apkUrl;
    link.download = `${appName}.apk`;
    link.target = "_blank";

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate download progress
    setTimeout(() => {
      setDownloadStatus((prev) => ({ ...prev, [appId]: "completed" as const }));
      setTimeout(() => {
        setDownloadStatus((prev) => ({ ...prev, [appId]: null }));
      }, 2000);
    }, 1500);
  };

  const featuredApps: App[] = [
     {
      id: 1,
      name: "ClipCash",
      category: "Finance & Management",
      rating: 4.8,
      downloads: "8M+",
      icon: "/images/logoc.png",
      description: "Track and manage your finances easily",
      size: "85 MB",
      downloadUrl: "/apk/ClipCash.apk",
    },
    {
      id: 2,
      name: "Fun Games",
      category: "Games",
      rating: 4.9,
      downloads: "25M+",
      icon: "🎮",
      description: "Collection of fun and exciting games",
      size: "120MB",
      featured: true,
      downloadUrl: "https://your-domain.com/apps/fungames.apk",
    },
    {
      id: 3,
      name: "Task Manager",
      category: "Productivity",
      rating: 4.7,
      downloads: "5M+",
      icon: "📋",
      description: "Organize your tasks efficiently",
      size: "28MB",
      featured: true,
      downloadUrl: "https://your-domain.com/apps/taskmanager.apk",
    },
  ];

  const topApps: App[] = [
    {
      id: 4,
      name: "Music Player",
      category: "Music",
      rating: 4.6,
      downloads: "15M+",
      icon: "🎵",
      description: "High-quality music streaming app",
      size: "52MB",
      downloadUrl: "https://your-domain.com/apps/musicplayer.apk",
    },
    {
      id: 5,
      name: "Money Manager",
      category: "Finance",
      rating: 4.8,
      downloads: "8M+",
      icon: "💰",
      description: "Track and manage your finances easily",
      size: "35MB",
      downloadUrl: "/apk/MoneyManager.apk",
    },

  ];

  const categories: string[] = [
    "All",
    "Games",
    "Productivity",
    "Photography",
    "Music",
    "Finance",
    "Education",
    "Security",
  ];

  const filteredApps: App[] =
    activeCategory === "All"
      ? [...featuredApps, ...topApps]
      : [...featuredApps, ...topApps].filter(
          (app: App) => app.category === activeCategory
        );

  const getDownloadButtonText = (appId: number | string): string => {
    const status = downloadStatus[appId];
    if (status === "downloading") return "Downloading...";
    if (status === "completed") return "Downloaded!";
    return "Download APK";
  };

  const getDownloadButtonClass = (appId: number | string): string => {
    const status = downloadStatus[appId];
    const baseClass =
      "w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ";

    if (status === "downloading") {
      return (
        baseClass + "bg-orange-400 text-white cursor-not-allowed animate-pulse"
      );
    }
    if (status === "completed") {
      return baseClass + "bg-green-500 text-white";
    }
    return (
      baseClass +
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                APK Store
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Top Apps
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Developer
              </a>
            </nav>

            {/* Search & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Categories
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Top Apps
              </a>
              <a
                href="#"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Developer
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              Welcome to
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block">
                APK Store
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your trusted source for high-quality Android apps. Safe, secure, and always free to download.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  50K+
                </div>
                <div className="text-gray-600">Quality Apps</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  100M+
                </div>
                <div className="text-gray-600">Downloads</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  4.8★
                </div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleDownload("main", "APK Store App")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
              >
                <Download className="w-5 h-5 inline-block mr-2" />
                Download Our App
              </button>
              <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-full font-semibold border border-gray-200 hover:bg-gray-50 hover:shadow-lg transition-all duration-200">
                <Play className="w-5 h-5 inline-block mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-50 animate-ping"></div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4 border border-blue-200">
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-semibold">Featured Apps</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Editor's Choice
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked apps that offer the best user experience and functionality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredApps.map((app: App) => (
              <div
                key={app.id}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:scale-105"
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 text-4xl bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-200">
                    {app.icon && <img src={app.icon} alt="app"/>}
                  </div>

                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {app.name}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    {app.description}
                  </p>

                  <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                      {app.rating}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {app.downloads}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDownload(app.id, app.name, app.downloadUrl || null)
                    }
                    className={getDownloadButtonClass(app.id)}
                    disabled={downloadStatus[app.id] === "downloading"}
                  >
                    <Download className="w-4 h-4" />
                    <span>{getDownloadButtonText(app.id)}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-4 border border-green-200">
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-700 font-semibold">Browse Categories</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Find What You Need
            </h3>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category: string) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredApps.map((app: App) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 text-2xl bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-200">
                    {app.icon && <img src={app.icon} alt="app"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                      {app.name}
                    </h5>
                    <p className="text-sm text-gray-500 mb-2">
                      {app.category}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                        {app.rating}
                      </div>
                      <span>•</span>
                      <span>{app.size}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-3 mb-4 line-clamp-2">
                  {app.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="w-3 h-3 mr-1" />
                    {app.downloads}
                  </div>
                  <button
                    onClick={() =>
                      handleDownload(app.id, app.name, app.downloadUrl || null)
                    }
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                    disabled={downloadStatus[app.id] === "downloading"}
                  >
                    {downloadStatus[app.id] === "downloading" ? "..." : "Get"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Store?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best experience for downloading Android apps safely and securely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Secure & Safe
              </h4>
              <p className="text-gray-600">
                All apps are scanned and verified for your safety
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Fast Downloads
              </h4>
              <p className="text-gray-600">
                Lightning-fast download speeds with reliable servers
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Always Free
              </h4>
              <p className="text-gray-600">
                No hidden fees, completely free to use forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  APK Store
                </h4>
              </div>
              <p className="text-gray-600 text-sm">
                Your trusted source for high-quality Android applications. Download safely and securely.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-gray-800">Company</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Press Kit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-gray-800">Support</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Developer Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Status Page
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-gray-800">Legal</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    DMCA
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>
              &copy; 2025 APK Store. All rights reserved. Built with ❤️ for Android users.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}