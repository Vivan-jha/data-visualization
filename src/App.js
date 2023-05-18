import React from 'react';
import './App.css';

import Bar from './Bar';
import Doughnut from './Doughnut';
import Line from './Line';
import BubbleChart from './Bubble';

import AreaChart from './Scatter';
import RadarChart from './Polar';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Bar />
      <Doughnut />
      <Line />
      <BubbleChart/>
      <AreaChart/>
      <RadarChart/>
      
        <Dashboard />
      
    </div>
  );
}

export default App;



