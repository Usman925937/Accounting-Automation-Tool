import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  PieChart,
  Menu,
  X,
  Plus,
  Activity,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import TransactionInput from './components/TransactionInput';
import JournalEntries from './components/JournalEntries';
import TrialBalance from './components/TrialBalance';
import FinancialStatements from './components/FinancialStatements';
import Ledgers from './components/Ledgers';
import FinancialHealth from './components/FinancialHealth';
import { AccountingProvider } from './context/AccountingContext';

type TabType = 'dashboard' | 'health' | 'transactions' | 'journal' | 'ledgers' | 'trial' | 'statements';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp, color: 'text-blue-600' },
    { id: 'health', name: 'Financial Health', icon: Activity, color: 'text-emerald-600' },
    { id: 'transactions', name: 'Add Transaction', icon: Plus, color: 'text-green-600' },
    { id: 'journal', name: 'Journal Entries', icon: FileText, color: 'text-purple-600' },
    { id: 'ledgers', name: 'Ledgers', icon: Calculator, color: 'text-orange-600' },
    { id: 'trial', name: 'Trial Balance', icon: PieChart, color: 'text-pink-600' },
    { id: 'statements', name: 'Financial Statements', icon: FileText, color: 'text-indigo-600' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'health':
        return <FinancialHealth />;
      case 'transactions':
        return <TransactionInput />;
      case 'journal':
        return <JournalEntries />;
      case 'ledgers':
        return <Ledgers />;
      case 'trial':
        return <TrialBalance />;
      case 'statements':
        return <FinancialStatements />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AccountingProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
          <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
          <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Accounting Bot</span>
              </div>
              
              {/* User Profile - Mobile */}
              <div className="px-4 mt-6 mb-4">
                <div className="flex items-center p-3 bg-white/60 rounded-xl">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-600 truncate">{user.company}</p>
                  </div>
                </div>
              </div>
              
              <nav className="mt-8 px-3 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as TabType);
                        setSidebarOpen(false);
                      }}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-md hover:transform hover:scale-102'
                      }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? 'text-white' : `${item.color} group-hover:${item.color}`}`} />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
              
              {/* Logout Button - Mobile */}
              <div className="px-3 mt-6">
                <button
                  onClick={() => setUser(null)}
                  className="flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl w-full transition-all duration-200"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-6 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                  <Calculator className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Accounting Bot</span>
                  <p className="text-xs text-gray-500 mt-1">AI-Powered IFRS Compliance</p>
                </div>
              </div>
              
              {/* User Profile - Desktop */}
              <div className="px-6 mb-6">
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-blue-600 truncate font-medium">{user.company}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="flex-1 px-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as TabType)}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-md hover:transform hover:scale-102'
                      }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? 'text-white' : `${item.color} group-hover:${item.color}`}`} />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
              
              {/* Logout Button - Desktop */}
              <div className="px-4 pb-4">
                <button
                  onClick={() => setUser(null)}
                  className="flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl w-full transition-all duration-200"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-72 flex flex-col flex-1">
          {/* Top Header with User Info */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Desktop spacer */}
              <div className="hidden md:block"></div>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md" 
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-12 h-12 rounded-full border-2 border-blue-200" 
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-blue-600 font-medium">{user.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <User className="h-4 w-4 mr-3 text-gray-400" />
                        Profile Settings
                      </button>
                      <button 
                        onClick={() => {
                          setUser(null);
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AccountingProvider>
  );
}

export default App;