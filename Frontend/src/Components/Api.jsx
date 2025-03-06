// MyComponent.js

import React, { useEffect } from 'react';

async function fetchData() {
  try {
    const response = await fetch('api.openweathermap.org/data/2.5/weather?q=London&appid=05cafd6372c6794fc3af3b1d42bb4ed2&units=metric');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    console.log('Data from API:', jsonData);

    // You can return the data if needed
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const MyComponent = () => {
  useEffect(() => {
    // Call the fetchData function
    fetchData();
  }, []);

  return <div>Fetching data... </div>;
};

export { fetchData };  // Export the fetchData function
export default MyComponent;
