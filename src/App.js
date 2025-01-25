import React, { useState, useEffect } from 'react';
import loadData from './DataLoader';
import NavigationBar from './NavigationBar';
import VocabularyTable from './VocabularyTable';
import VocabularyCard from './VocabularyCard';

function App() {
    const [data, setData] = useState([]);
    const [view, setView] = useState('table'); // 'table' oder 'card'
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedData = await loadData('/vokabeln.xlsx');
                setData(loadedData);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    const navigateToCard = (index) => {
        setCurrentWordIndex(index);
        setView('card');
    };

    return (
        <div>
            <NavigationBar />
            {view === 'table' && (
                <VocabularyTable data={data} onSelectWord={navigateToCard} />
            )}
            {view === 'card' && (
                <VocabularyCard
                    word={data[currentWordIndex]}
                    onNext={() => setCurrentWordIndex((prev) => (prev + 1) % data.length)}
                    onPrev={() =>
                        setCurrentWordIndex((prev) => (prev - 1 + data.length) % data.length)
                    }
                    onBack={() => setView('table')}
                />
            )}
        </div>
    );
}

export default App;
