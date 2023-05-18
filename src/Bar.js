import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        // Process the fetched data to extract the intensity values
        const intensityData = data.slice(0, 20).map(item => item.intensity);
        const sectorData = data.slice(0, 20).map(item => item.sector);

        // Create the chart dataset
        const chartDataset = {
          labels: sectorData,
          datasets: [
            {
              label: 'Intensity',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: intensityData,
            },
          ],
        };

        setChartData(chartDataset);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  return (
    <div>
      <h2>Bar Chart - Intensity</h2>
      {chartData ? (
        <Bar
          data={chartData}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false,
          }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default BarChart;
