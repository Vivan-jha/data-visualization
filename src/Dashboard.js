import React, { useState, useEffect } from 'react';


function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        // Set the fetched data
        setData(data);

        // Extract filter options based on available data
        const options = Object.keys(data[0] || {});
        setFilterOptions(options);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
  };

  const getFilteredData = () => {
    if (selectedFilter === '') {
      return [];
    }

    // Extract the unique values for the selected filter
    const uniqueValues = [...new Set(data.map(item => item[selectedFilter]))];

    // Create an array of objects with the unique values
    const filteredData = uniqueValues.map(value => {
      return { [selectedFilter]: value };
    });

    return filteredData;
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <label>Filter:</label>
        <select value={selectedFilter} onChange={e => handleFilterChange(e.target.value)}>
          <option value="">-- Select Filter --</option>
          {filterOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {selectedFilter !== '' && (
        <div>
          <h3>Filtered Data:</h3>
          <ul>
            {getFilteredData().map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Render the chart or other components */}
      {/* ... */}
    </div>
  );
}

export default Dashboard;
