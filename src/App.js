import React, { useState, useEffect } from "react";
import loadData from "./DataLoader";
import NavigationBar from "./NavigationBar";
import VocabularyTable from "./VocabularyTable";
import TestingMode from "./TestingMode";
import VocabularyCard from "./VocabularyCard"; // Hier den fehlenden Import hinzufügen

function App() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [view, setView] = useState("table"); // 'table', 'card', or 'testing'
    const [selectedWordIndex, setSelectedWordIndex] = useState(null); // Index des ausgewählten Wortes

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedData = await loadData("/vokabeln.xlsx");
                setData(loadedData);
                setOriginalData(loadedData);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, []);

    const startTestingMode = (mode) => {
        setData((prevData) => [...prevData].sort(() => Math.random() - 0.5));
        setView("testing");
    };

    const stopTestingMode = () => {
        setData(originalData);
        setView("table");
    };

    const handleSelectWord = (index) => {
        setSelectedWordIndex(index);
        setView("card"); // Ansicht zu "card" wechseln
    };

    return (
        <div>
            <NavigationBar onStartTestingMode={startTestingMode} />
            {view === "table" && <VocabularyTable data={data} onSelectWord={handleSelectWord} />}
            {view === "card" && selectedWordIndex !== null && (
                <VocabularyCard
                    word={data[selectedWordIndex]}
                    onNext={() =>
                        setSelectedWordIndex((prevIndex) => (prevIndex + 1) % data.length)
                    }
                    onPrev={() =>
                        setSelectedWordIndex((prevIndex) =>
                            prevIndex === 0 ? data.length - 1 : prevIndex - 1
                        )
                    }
                    onBack={() => setView("table")}
                />
            )}
            {view === "testing" && (
                <TestingMode
                    data={data}
                    mode={"englishToGerman"}
                    onStop={stopTestingMode}
                />
            )}
        </div>
    );
}

export default App;
