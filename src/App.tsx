// frontend/src/App.tsx
import React from 'react';
import HeatmapUploader from './components/Heatmap';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Gerador de Mapa de Calor</h1>
      <HeatmapUploader />
    </div>
  );
};

export default App;
