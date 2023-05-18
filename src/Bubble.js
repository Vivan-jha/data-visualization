import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';

const BubbleChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Check the fetched data

        // Process the fetched data to extract start_year and end_year values
        const bubbleData = data.map(item => ({
          x: item.start_year,
          y: item.end_year,
          r: 10, // Radius of the bubble (you can adjust this as needed)
        }));

        console.log('Bubble Data:', bubbleData); // Check the extracted bubble data

        // Create the bubble chart dataset
        const chartDataset = {
          datasets: [
            {
              label: 'Start vs End Year',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              data: bubbleData,
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
      <h2>Bubble Chart - Start Year vs End Year</h2>
      {chartData ? (
        <>
          <Bubble data={chartData} />
          <p>Data received successfully.</p>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default BubbleChart;
