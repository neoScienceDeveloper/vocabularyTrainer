import React from "react";
import "./vocabulary_card.css";

function VocabularyCard({ word, onNext, onPrev, onBack }) {
    if (!word) {
        return <p>Loading...</p>;
    }

    const safeSplit = (value, delimiter) => {
        return typeof value === "string" && value.trim() ? value.split(delimiter).map(item => item.trim()) : [];
    };

    return (
        <div className="vocabulary-card">
            {/* Header mit Zurück-Button */}
            <div className="card-header">
                <button className="back-button" onClick={onBack}>
                    ⬅ Zurück zur Tabelle
                </button>
                <div className="card-navigation">
                    <button id="previous" onClick={onPrev} className="nav-button">
                        ⬅
                    </button>
                    <button id="next" onClick={onNext} className="nav-button">
                        ➡
                    </button>
                </div>
            </div>

            {/* Englisches Wort und Level */}
            <div className="word-section">
                <h2 className="english-word">{word.Englisch || "Unbekannt"}</h2>
                <span className="level">{word.Level || "N/A"}</span>
            </div>

            {/* Deutsches Wort */}
            <h3 className="german-word">{word.Deutsch || "Keine Übersetzung verfügbar"}</h3>

            {/* Inhalte */}
            <div className="card-content">
                {/* Synonyms und Opposites */}
                <div className="content-row">
                    <div className="content-box">
                        <h2 className="content-box-title">Synonyms</h2>
                        <p>{word.Synonyms || "Keine Synonyme verfügbar."}</p>
                    </div>
                    <div className="content-box">
                        <h2 className="content-box-title">Opposites</h2>
                        <p>{word.Opposites || "Keine Gegenteile verfügbar."}</p>
                    </div>
                </div>

                {/* Description und Derived Forms */}
                <div className="content-row">
                    <div className="content-box">
                        <h2 className="content-box-title">Description</h2>
                        {safeSplit(word.Description, "*").length > 0 ? (
                            safeSplit(word.Description, "*").map((desc, index) => (
                                <p key={index}>- {desc}</p>
                            ))
                        ) : (
                            <p>Keine Beschreibung verfügbar.</p>
                        )}
                    </div>
                    <div className="content-box">
                        <h2 className="content-box-title">Derived Forms</h2>
                        {safeSplit(word["Derived Forms"], "*").length > 0 ? (
                            safeSplit(word["Derived Forms"], "*").map((form, index) => (
                                <p key={index}>- {form}</p>
                            ))
                        ) : (
                            <p>Keine abgeleiteten Formen verfügbar.</p>
                        )}
                    </div>
                </div>

                {/* Beispielsätze */}
                <div className="content-box full-row">
                    <h2 className="content-box-title">Beispielsätze</h2>
                    {safeSplit(word.Beispielsätze, "/").length > 0 ? (
                        safeSplit(word.Beispielsätze, "/").map((sentence, index) => (
                            <p key={index}>- {sentence}</p>
                        ))
                    ) : (
                        <p>Keine Beispielsätze verfügbar.</p>
                    )}
                </div>

                {/* Definitions Cambridge */}
                <div className="content-box full-row">
                    <h2 className="content-box-title">Definitions (Cambridge)</h2>
                    {safeSplit(word.Definition, "*").length > 0 ? (
                        safeSplit(word.Definition, "*").map((def, index) => (
                            <p key={index}>- {def}</p>
                        ))
                    ) : (
                        <p>Keine Definitionen verfügbar.</p>
                    )}
                </div>

                {/* Example Sentences */}
                <div className="content-box full-row">
                    <h2 className="content-box-title">Example Sentences (Cambridge)</h2>
                    {safeSplit(word["Example Senteces"], "*").length > 0 ? (
                        safeSplit(word["Example Senteces"], "*").map((sent, index) => (
                            <p key={index}>- {sent}</p>
                        ))
                    ) : (
                        <p>Keine Beispielsätze verfügbar.</p>
                    )}
                </div>

                {/* Related Words */}
                <div className="content-box full-row">
                    <h2 className="content-box-title">Related Words (Cambridge)</h2>
                    <p>{word["Related Words"] || "Keine verwandten Wörter verfügbar."}</p>
                </div>
            </div>
        </div>
    );
}

export default VocabularyCard;