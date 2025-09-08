"use client"
import React, { useState } from 'react';
import { Search, Download, Star, Shield, Users, Smartphone, Menu, X, Play, TrendingUp, Award, Heart, Zap, Skull } from 'lucide-react';

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
  [key: string | number]: 'downloading' | 'completed' | null;
}

export default function ForgetStudio() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({});

  // Function to handle APK download
  const handleDownload = (appId: string | number, appName: string, downloadUrl: string | null = null): void => {
    // Set downloading status
    setDownloadStatus(prev => ({ ...prev, [appId]: 'downloading' as const }));
    
    // Sample APK URL - replace with your actual APK URLs
    const apkUrl = downloadUrl || `https://example.com/apks/${appName.toLowerCase().replace(/\s+/g, '')}.apk`;
    
    // Create download link
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = `${appName}.apk`;
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Simulate download progress
    setTimeout(() => {
      setDownloadStatus(prev => ({ ...prev, [appId]: 'completed' as const }));
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [appId]: null }));
      }, 2000);
    }, 1500);
  };

  const featuredApps: App[] = [
    {
      id: 1,
      name: "DarkPhoto Editor",
      category: "Photography",
      rating: 4.8,
      downloads: "10M+",
      icon: "📸",
      description: "Dark-themed photo editor with punk filters",
      size: "45MB",
      featured: true,
      downloadUrl: "https://your-domain.com/apps/darkphoto.apk" // Replace with your URL
    },
    {
      id: 2,
      name: "Rage Gaming",
      category: "Games",
      rating: 4.9,
      downloads: "25M+",
      icon: "🎮",
      description: "Hardcore punk gaming experience",
      size: "120MB",
      featured: true,
      downloadUrl: "https://your-domain.com/apps/ragegaming.apk" // Replace with your URL
    },
    {
      id: 3,
      name: "Rebel Productivity",
      category: "Productivity",
      rating: 4.7,
      downloads: "5M+",
      icon: "📋",
      description: "Break the rules of productivity",
      size: "28MB",
      featured: true,
      downloadUrl: "https://your-domain.com/apps/rebelproductivity.apk" // Replace with your URL
    }
  ];

  const topApps: App[] = [
    {
      id: 4,
      name: "Underground Music",
      category: "Music",
      rating: 4.6,
      downloads: "15M+",
      icon: "🎵",
      description: "Raw underground music streaming",
      size: "52MB",
      downloadUrl: "https://your-domain.com/apps/undergroundmusic.apk"
    },
    {
      id: 5,
      name: "Hardcore Fitness",
      category: "Health",
      rating: 4.8,
      downloads: "8M+",
      icon: "💪",
      description: "No-nonsense fitness tracking",
      size: "35MB",
      downloadUrl: "https://your-domain.com/apps/hardcorefitness.apk"
    },
    {
      id: 6,
      name: "Street Knowledge",
      category: "Education",
      rating: 4.9,
      downloads: "12M+",
      icon: "📚",
      description: "Learn from the streets",
      size: "67MB",
      downloadUrl: "https://your-domain.com/apps/streetknowledge.apk"
    },
    {
      id: 7,
      name: "Ghost Vault",
      category: "Security",
      rating: 4.7,
      downloads: "3M+",
      icon: "🔒",
      description: "Invisible security protection",
      size: "25MB",
      downloadUrl: "https://your-domain.com/apps/ghostvault.apk"
    },
    {
      id: 8,
      name: "Dark Cloud Sync",
      category: "Productivity",
      rating: 4.5,
      downloads: "7M+",
      icon: "☁️",
      description: "Shadow cloud synchronization",
      size: "18MB",
      downloadUrl: "https://your-domain.com/apps/darkcloudsync.apk"
    }
  ];

  const categories: string[] = ['All', 'Games', 'Productivity', 'Photography', 'Music', 'Health', 'Education', 'Security'];

  const filteredApps: App[] = activeCategory === 'All' 
    ? [...featuredApps, ...topApps] 
    : [...featuredApps, ...topApps].filter((app: App) => app.category === activeCategory);

  const getDownloadButtonText = (appId: number | string): string => {
    const status = downloadStatus[appId];
    if (status === 'downloading') return 'Downloading...';
    if (status === 'completed') return 'Downloaded!';
    return 'Download APK';
  };

  const getDownloadButtonClass = (appId: number | string): string => {
    const status = downloadStatus[appId];
    const baseClass = "w-full py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ";
    
    if (status === 'downloading') {
      return baseClass + "bg-yellow-600 text-black cursor-not-allowed animate-pulse";
    }
    if (status === 'completed') {
      return baseClass + "bg-green-600 text-white";
    }
    return baseClass + "bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white hover:shadow-xl hover:shadow-red-500/25 transform hover:scale-105";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-red-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center border border-red-500/50">
                <Skull className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent font-mono">
                ForgetStudio
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-red-300 hover:text-red-400 font-bold transition-colors font-mono">HOME</a>
              <a href="#" className="text-red-300 hover:text-red-400 font-bold transition-colors font-mono">CATEGORIES</a>
              <a href="#" className="text-red-300 hover:text-red-400 font-bold transition-colors font-mono">TOP CHARTS</a>
              <a href="#" className="text-red-300 hover:text-red-400 font-bold transition-colors font-mono">DEVELOPER</a>
            </nav>

            {/* Search & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
                <input
                  type="text"
                  placeholder="Search underground apps..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-900 border border-red-600/50 rounded-full text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-red-900/50 text-red-400"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-red-800/50">
            <div className="px-4 py-6 space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
                <input
                  type="text"
                  placeholder="Search underground apps..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-red-600/50 rounded-full text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <a href="#" className="block py-2 text-red-300 hover:text-red-400 font-bold font-mono">HOME</a>
              <a href="#" className="block py-2 text-red-300 hover:text-red-400 font-bold font-mono">CATEGORIES</a>
              <a href="#" className="block py-2 text-red-300 hover:text-red-400 font-bold font-mono">TOP CHARTS</a>
              <a href="#" className="block py-2 text-red-300 hover:text-red-400 font-bold font-mono">DEVELOPER</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
              BREAK THE
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent block animate-pulse">
                SYSTEM
              </span>
            </h2>
            <p className="text-xl text-red-300 mb-8 max-w-2xl mx-auto font-mono">
              Underground APK store for rebels who refuse to follow the mainstream path
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-red-600/50 shadow-lg shadow-red-900/25">
                <div className="text-3xl font-bold text-red-500 mb-2 font-mono">666K+</div>
                <div className="text-red-300 font-mono">REBEL APPS</div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-600/50 shadow-lg shadow-pink-900/25">
                <div className="text-3xl font-bold text-pink-500 mb-2 font-mono">13M+</div>
                <div className="text-pink-300 font-mono">DOWNLOADS</div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-lg shadow-purple-900/25">
                <div className="text-3xl font-bold text-purple-500 mb-2 font-mono">4.9★</div>
                <div className="text-purple-300 font-mono">PUNK RATING</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleDownload('main', 'ForgetStudio Main App')}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-200 font-mono border border-red-500/50"
              >
                <Download className="w-5 h-5 inline-block mr-2" />
                DOWNLOAD NOW
              </button>
              <button className="bg-black/80 backdrop-blur-sm text-red-300 px-8 py-4 rounded-full font-bold border border-red-600/50 hover:bg-red-900/20 hover:shadow-lg hover:shadow-red-900/25 transition-all duration-200 font-mono">
                <Zap className="w-5 h-5 inline-block mr-2" />
                WATCH CHAOS
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-600/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-600/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-600/30 rounded-full animate-pulse"></div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-black/50 backdrop-blur-sm border-y border-red-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-red-900/50 to-pink-900/50 px-4 py-2 rounded-full mb-4 border border-red-600/50">
              <Skull className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-400 font-bold font-mono">UNDERGROUND PICKS</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4 font-mono">REBEL'S CHOICE</h3>
            <p className="text-red-300 max-w-2xl mx-auto font-mono">
              Hand-picked by underground developers who refuse to bow down to corporate control
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredApps.map((app: App) => (
              <div
                key={app.id}
                className="group bg-black/70 rounded-3xl p-8 shadow-lg shadow-red-900/25 hover:shadow-2xl hover:shadow-red-700/25 transition-all duration-300 border border-red-600/50 hover:border-red-500 cursor-pointer transform hover:scale-105"
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 text-4xl bg-gradient-to-br from-red-900/50 to-pink-900/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-red-600/30">
                    {app.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors font-mono">
                    {app.name}
                  </h4>
                  <p className="text-red-300 mb-4 text-sm font-mono">{app.description}</p>
                  
                  <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-red-400 font-mono">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-red-500 mr-1" />
                      {app.rating}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {app.downloads}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDownload(app.id, app.name, app.downloadUrl || null)}
                    className={getDownloadButtonClass(app.id)}
                    disabled={downloadStatus[app.id] === 'downloading'}
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
            <div className="inline-flex items-center bg-gradient-to-r from-purple-900/50 to-red-900/50 px-4 py-2 rounded-full mb-4 border border-purple-600/50">
              <Zap className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-purple-400 font-bold font-mono">CHAOS CATEGORIES</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4 font-mono">FIND YOUR POISON</h3>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category: string) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-200 font-mono ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white shadow-lg shadow-red-500/25 transform scale-105 border border-red-500'
                    : 'bg-black/70 text-red-300 hover:bg-red-900/30 border border-red-600/50 hover:border-red-500'
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
                className="bg-black/70 rounded-2xl p-6 shadow-lg shadow-red-900/25 hover:shadow-xl hover:shadow-red-700/25 transition-all duration-300 border border-red-600/50 hover:border-red-500 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 text-2xl bg-gradient-to-br from-red-900/50 to-pink-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-red-600/30">
                    {app.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-white truncate group-hover:text-red-400 transition-colors font-mono">
                      {app.name}
                    </h5>
                    <p className="text-sm text-red-400 mb-2 font-mono">{app.category}</p>
                    <div className="flex items-center space-x-2 text-xs text-red-500 font-mono">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-red-500 mr-1" />
                        {app.rating}
                      </div>
                      <span>•</span>
                      <span>{app.size}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-red-300 mt-3 mb-4 line-clamp-2 font-mono">
                  {app.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-red-400 font-mono">
                    <Users className="w-3 h-3 mr-1" />
                    {app.downloads}
                  </div>
                  <button 
                    onClick={() => handleDownload(app.id, app.name, app.downloadUrl || null)}
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 font-mono border border-red-500/50"
                    disabled={downloadStatus[app.id] === 'downloading'}
                  >
                    {downloadStatus[app.id] === 'downloading' ? '...' : 'GET'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-red-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4 font-mono">WHY JOIN THE REBELLION?</h3>
            <p className="text-red-300 max-w-2xl mx-auto font-mono">
              Break free from corporate control and experience true digital freedom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-red-500/50 shadow-lg shadow-red-900/25">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 font-mono">UNDERGROUND SECURE</h4>
              <p className="text-red-300 font-mono">All apps tested by rebel hackers for maximum security</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-pink-500/50 shadow-lg shadow-pink-900/25">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 font-mono">LIGHTNING CHAOS</h4>
              <p className="text-red-300 font-mono">Insane download speeds through dark web networks</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-500/50 shadow-lg shadow-purple-900/25">
                <Skull className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 font-mono">FOREVER REBEL</h4>
              <p className="text-red-300 font-mono">Always free, never corporate, purely underground</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center border border-red-500/50">
                  <Skull className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white font-mono">ForgetStudio</h4>
              </div>
              <p className="text-red-400 text-sm font-mono">
                The underground rebellion against mainstream app stores. Join the chaos.
              </p>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-white font-mono">REBELLION</h5>
              <ul className="space-y-2 text-sm text-red-400 font-mono">
                <li><a href="#" className="hover:text-red-300 transition-colors">ABOUT CHAOS</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">JOIN US</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">PRESS CHAOS</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">REBEL BLOG</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-white font-mono">SUPPORT</h5>
              <ul className="space-y-2 text-sm text-red-400 font-mono">
                <li><a href="#" className="hover:text-red-300 transition-colors">HELP CENTER</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">CONTACT REBELS</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">DEV PORTAL</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">SYSTEM STATUS</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-white font-mono">UNDERGROUND</h5>
              <ul className="space-y-2 text-sm text-red-400 font-mono">
                <li><a href="#" className="hover:text-red-300 transition-colors">PRIVACY CHAOS</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">REBEL TERMS</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">COOKIE ANARCHY</a></li>
                <li><a href="#" className="hover:text-red-300 transition-colors">DMCA FIGHT</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-800/50 mt-8 pt-8 text-center text-red-400 text-sm font-mono">
            <p>&copy; 2025 ForgetStudio. BREAK THE SYSTEM. ALL RIGHTS FORGOTTEN.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}