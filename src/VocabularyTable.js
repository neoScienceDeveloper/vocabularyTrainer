import React from 'react';
import './vocabulary_table.css'; // CSS-Datei für das Styling

function VocabularyTable({ data, onSelectWord }) {
    return (
        <div className="vocabulary-table">
            <h2 className="table-title">Vokabeltabelle</h2>
            <table className="styled-table">
                <thead>
                <tr>
                    <th>Englisch</th>
                    <th>Deutsch</th>
                </tr>
                </thead>
                <tbody>
                {data.map((word, index) => (
                    <tr key={index} onClick={() => onSelectWord(index)} className="clickable-row">
                        <td>{word.Englisch}</td>
                        <td>{word.Deutsch}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default VocabularyTable;
