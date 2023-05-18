import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        // Process the fetched data to extract the topic and region values
        const topicData = data.slice(0, 20).map(item => item.topic);
        const regionData = data.slice(0, 20).map(item => item.region);

        // Create the chart dataset
        const chartDataset = {
          labels: topicData,
          datasets: [
            {
              label: 'Region',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
              data: regionData,
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
      <h2>Radar Chart - Topic vs Region</h2>
      {chartData ? (
        <Radar
          data={chartData}
          options={{
            scale: {
              ticks: { beginAtZero: true },
            },
          }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RadarChart;
