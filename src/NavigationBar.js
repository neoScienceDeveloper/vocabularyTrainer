import React from "react";
import "./navigation_bar.css";

function NavigationBar({ onStartTestingMode }) {
    return (
        <nav className="navigation-bar">
            <h1 className="app-title">Vocabulary Trainer</h1>
            <div className="mode-buttons">
                <button
                    className="mode-button"
                    onClick={() => onStartTestingMode("englishToGerman")}
                >
                    Test: Englisch → Deutsch
                </button>
                <button
                    className="mode-button"
                    onClick={() => onStartTestingMode("germanToEnglish")}
                >
                    Test: Deutsch → Englisch
                </button>
            </div>
        </nav>
    );
}

export default NavigationBar;