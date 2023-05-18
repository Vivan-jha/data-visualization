import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

function DonutChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        // Process the fetched data to extract the likelihood values
        const likelihoodData = data.slice(0, 20).map(item => item.likelihood);

        // Define an array of 20 different colors
        const colors = [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8E6E95',
          '#FF1493',
          '#FF4500',
          '#FFCE98',
          '#800080',
          '#000080',
          '#2F4F4F',
          '#7FFFD4',
          '#9ACD32',
          '#00FF7F',
          '#00FF00',
          '#A52A2A',
          '#008000',
          '#66CDAA',
          '#000000',
          '#FFCE51',
          '#FFCE50',
          '#FFCE78',
          // Add more colors here...
        ];

        // Create the chart dataset
        const chartDataset = {
          labels: likelihoodData.map(item => `Likelihood ${item}`),
          datasets: [
            {
              data: likelihoodData,
              backgroundColor: colors.slice(0, likelihoodData.length),
              hoverBackgroundColor: colors.slice(0, likelihoodData.length),
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
      <h2>Donut Chart - Likelihood</h2>
      {chartData ? (
        <Doughnut
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

export default DonutChart;
