import React, { useState, useEffect } from 'react';
import axios from 'axios';



const MyComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your API endpoint
        const response = await fetch('api.openweathermap.org/data/2.5/weather?q=London&appid=05cafd6372c6794fc3af3b1d42bb4ed2&units=metric');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the response as JSON
        const jsonData = await response.json();

        // Log the data to the console
        console.log('Data from API:', jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array means the effect runs once on mount

  return <div>Fetching data...</div>;
};

export default MyComponent;
