import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const AreaChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        // Process the fetched data to extract the country and sector values
        const countryData = data.slice(0, 20).map(item => item.country);
        const sectorData = data.slice(0, 20).map(item => item.sector);

        // Create the chart dataset
        const chartDataset = {
          labels: countryData,
          datasets: [
            {
              label: 'Sector',
              data: sectorData,
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.4,
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
      <h2>Area Chart - Country vs Sector</h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Country',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Sector',
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default AreaChart;
