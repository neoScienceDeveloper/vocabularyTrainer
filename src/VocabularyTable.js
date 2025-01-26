import React, { useState } from "react";
import "./vocabulary_table.css";
import "./vocabulary_card.css"; // <-- Card-Stil hier einbinden

function VocabularyTable({ data, onSelectWord }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Hilfsfunktion zum sicheren Splitten
    const safeSplit = (value, delimiter) => {
        return typeof value === "string" && value.trim()
            ? value.split(delimiter).map((item) => item.trim())
            : [];
    };

    // Daten filtern (nach Englisch/Deutsch)
    const filteredData = data.filter((word) => {
        const english = word.Englisch ? word.Englisch.toLowerCase() : "";
        const german = word.Deutsch ? word.Deutsch.toLowerCase() : "";
        return (
            english.includes(searchTerm.toLowerCase()) ||
            german.includes(searchTerm.toLowerCase())
        );
    });

    // Button-Klickhandler fürs Auf- und Zuklappen
    const toggleExpand = (rowIndex) => {
        if (expandedIndex === rowIndex) {
            // bereits geöffnet -> schließen
            setExpandedIndex(null);
        } else {
            // noch zu -> öffnen
            setExpandedIndex(rowIndex);
        }
    };

    return (
        <div className="vocabulary-table">
            <h2 className="table-title">Vokabeltabelle</h2>

            {/* Suchfeld */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Suche nach einem Wort (Englisch oder Deutsch)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Tabelle */}
            <table className="styled-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Englisch</th>
                    <th>Deutsch</th>
                    <th>Aktion</th> {/* Neue Spalte für den Button */}
                </tr>
                </thead>
                <tbody>
                {filteredData.map((word, index) => (
                    <React.Fragment key={index}>
                        {/* Hauptzeile */}
                        <tr
                            className="clickable-row"
                            onClick={() => {
                                console.log('Selected Word:', word); // Debugging hinzugefügt
                                onSelectWord(index);
                            }}
                        >
                            <td>{index + 1}</td>
                            <td>{word.Englisch}</td>
                            <td>{word.Deutsch}</td>
                            <td>
                                {/* Button zum Ein-/Ausklappen */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // verhindert, dass onSelectWord aufgerufen wird, wenn du den Button klickst
                                        toggleExpand(index);
                                    }}
                                >
                                    {expandedIndex === index ? "▲" : "▼"}
                                </button>
                            </td>
                        </tr>

                        {/* Zusätzliche Zeile, wenn expandedIndex === index */}
                        {expandedIndex === index && (
                            <tr className="hover-row">
                                {/* colSpan = 4, weil wir oben 4 Spalten haben */}
                                <td colSpan={4} style={{ padding: 0, borderBottom: "none" }}>
                                    {/* Card-Layout direkt hier drunter */}
                                    <div className="vocabulary-card" style={{ margin: 0 }}>
                                        {/* Überschrift & Level */}
                                        <div className="word-section">
                                            <h2 className="english-word">
                                                {word.Englisch || "Unbekannt"}
                                            </h2>
                                            <span className="level">
                          {word.Level || "N/A"}
                        </span>
                                        </div>

                                        {/* Deutsche Übersetzung */}
                                        <h3 className="german-word">
                                            {word.Deutsch || "Keine Übersetzung verfügbar"}
                                        </h3>

                                        <div className="card-content">
                                            {/* Synonyms & Opposites */}
                                            <div className="content-row">
                                                <div className="content-box">
                                                    <h2 className="content-box-title">Synonyms</h2>
                                                    <p>
                                                        {word.Synonyms
                                                            ? word.Synonyms
                                                            : "Keine Synonyme verfügbar."}
                                                    </p>
                                                </div>
                                                <div className="content-box">
                                                    <h2 className="content-box-title">Opposites</h2>
                                                    <p>
                                                        {word.Opposites
                                                            ? word.Opposites
                                                            : "Keine Gegenteile verfügbar."}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description & Derived Forms */}
                                            <div className="content-row">
                                                <div className="content-box">
                                                    <h2 className="content-box-title">Description</h2>
                                                    {safeSplit(word.Description, "*").length > 0 ? (
                                                        safeSplit(word.Description, "*").map((desc, i) => (
                                                            <p key={i}>- {desc}</p>
                                                        ))
                                                    ) : (
                                                        <p>Keine Beschreibung verfügbar.</p>
                                                    )}
                                                </div>
                                                <div className="content-box">
                                                    <h2 className="content-box-title">Derived Forms</h2>
                                                    {safeSplit(word["Derived Forms"], "*").length > 0 ? (
                                                        safeSplit(word["Derived Forms"], "*").map((form, i) => (
                                                            <p key={i}>- {form}</p>
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
                                                    safeSplit(word.Beispielsätze, "/").map((sentence, i) => (
                                                        <p key={i}>- {sentence}</p>
                                                    ))
                                                ) : (
                                                    <p>Keine Beispielsätze verfügbar.</p>
                                                )}
                                            </div>

                                            {/* Definition (Cambridge) */}
                                            <div className="content-box full-row">
                                                <h2 className="content-box-title">
                                                    Definition (Cambridge)
                                                </h2>
                                                {safeSplit(word.Definition, "*").length > 0 ? (
                                                    safeSplit(word.Definition, "*").map((def, i) => (
                                                        <p key={i}>- {def}</p>
                                                    ))
                                                ) : (
                                                    <p>Keine Definitionen verfügbar.</p>
                                                )}
                                            </div>

                                            {/* Example Sentences (Cambridge) */}
                                            <div className="content-box full-row">
                                                <h2 className="content-box-title">
                                                    Example Sentences (Cambridge)
                                                </h2>
                                                {safeSplit(word["Example Senteces"], "*").length > 0 ? (
                                                    safeSplit(word["Example Senteces"], "*").map((sent, i) => (
                                                        <p key={i}>- {sent}</p>
                                                    ))
                                                ) : (
                                                    <p>Keine Beispielsätze verfügbar.</p>
                                                )}
                                            </div>

                                            {/* Related Words */}
                                            <div className="content-box full-row">
                                                <h2 className="content-box-title">
                                                    Related Words (Cambridge)
                                                </h2>
                                                <p>
                                                    {word["Related Words"] ||
                                                        "Keine verwandten Wörter verfügbar."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default VocabularyTable;
