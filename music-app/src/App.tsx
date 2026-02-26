import { useState } from 'react'
import './App.css';
import HomeScreen from "./tabs/HomeScreen";
import { SettingsScreen } from "./tabs/Settings";

type TabName = 'Home' | 'Settings';

export function App() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');

  return (
    <div className="app-container">
      <div className="content">
        {activeTab === 'Home' && <HomeScreen />}
        {activeTab === 'Settings' && <SettingsScreen />}
      </div>

      <div className="navigation">
        <button 
          className={`nav-tab ${activeTab === 'Home' ? 'active' : ''}`}
          onClick={() => setActiveTab('Home')}
        >
          🎵 Home
        </button>
        <button 
          className={`nav-tab ${activeTab === 'Settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('Settings')}
        >
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
}
