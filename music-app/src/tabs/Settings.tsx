import { useState, useEffect } from "react";
import "./Settings.css";

export const SettingsScreen = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Sync DOM whenever darkMode state changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="settings-screen">
            <h1>Settings</h1>

            <div className="settings-section">
                <h2>Appearance</h2>
                <div className="setting-item">
                    <label htmlFor="darkmode-toggle">Dark Mode</label>
                    <label className="toggle-switch">
                        <input 
                            id="darkmode-toggle"
                            type="checkbox" 
                            checked={darkMode} 
                            onChange={toggleDarkMode}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            <div className="settings-section">
                <h2>About</h2>
                <p>🎵 Music Artist Search App</p>
                <p>Version 1.0.0</p>
                <p>Powered by <a href="https://www.theaudiodb.com/" target="_blank" rel="noreferrer">TheAudioDB API</a></p>
            </div>
        </div>
    );
};
