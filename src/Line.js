import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function LineChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        // Process the fetched data to extract the sector and relevance values
        const sectorData = data.slice(0, 20).map(item => item.sector);
        const relevanceData = data.slice(0, 20).map(item => item.relevance);

        // Create the chart dataset
        const chartDataset = {
          labels: sectorData,
          datasets: [
            {
              label: 'Relevance',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: relevanceData,
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
      <h2>Line Chart - Relevance</h2>
      {chartData ? (
        <Line
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

export default LineChart;
