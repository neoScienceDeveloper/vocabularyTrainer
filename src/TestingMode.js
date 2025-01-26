import React, { useState } from "react";

function TestingMode({ data, mode, onStop }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const [knownWords, setKnownWords] = useState([]); // Richtig beantwortete Wörter
    const [unknownWords, setUnknownWords] = useState([]); // Falsch beantwortete Wörter

    const currentWord = data[currentIndex];

    const handleResult = (status) => {
        if (status === "Known") {
            setKnownWords((prev) => [...prev, currentWord]);
        } else {
            setUnknownWords((prev) => [...prev, currentWord]);
        }

        // Nächstes Wort laden und Lösung ausblenden
        setShowSolution(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handleShowSolution = () => {
        setShowSolution(true);
    };

    const handleScreenClick = (event) => {
        const screenWidth = window.innerWidth;
        const clickX = event.clientX;

        if (showSolution) {
            if (clickX < screenWidth / 2) {
                handleResult("Known");
            } else {
                handleResult("Unknown");
            }
        } else {
            handleShowSolution();
        }
    };

    if (!currentWord) {
        return <p>Loading...</p>;
    }

    return (
        <div
            className="testing-mode"
            onClick={handleScreenClick} // Klick auf die Bildschirmhälfte
        >
            <button onClick={onStop} className="end-button">Beenden</button>

            <div className="word-display">
                <h2>
                    {mode === "englishToGerman" ? currentWord.Englisch : currentWord.Deutsch}
                </h2>
                {showSolution && (
                    <p>
                        {mode === "englishToGerman" ? currentWord.Deutsch : currentWord.Englisch}
                    </p>
                )}
            </div>

            {showSolution && (
                <div className="result-buttons">
                    <button
                        className="known-button"
                        onClick={() => handleResult("Known")}
                    >
                        Known
                    </button>
                    <button
                        className="unknown-button"
                        onClick={() => handleResult("Unknown")}
                    >
                        Unknown
                    </button>
                </div>
            )}

            <h3>Known Words</h3>
            <table className="results-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Word</th>
                    <th>Translation</th>
                </tr>
                </thead>
                <tbody>
                {knownWords.map((word, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{mode === "englishToGerman" ? word.Englisch : word.Deutsch}</td>
                        <td>{mode === "englishToGerman" ? word.Deutsch : word.Englisch}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>Unknown Words</h3>
            <table className="results-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Word</th>
                    <th>Translation</th>
                </tr>
                </thead>
                <tbody>
                {unknownWords.map((word, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{mode === "englishToGerman" ? word.Englisch : word.Deutsch}</td>
                        <td>{mode === "englishToGerman" ? word.Deutsch : word.Englisch}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TestingMode;