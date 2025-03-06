// import React from'react';
// import axios from 'axios';
// import { useEffect } from 'react';

// function MyComponent() {
//     useEffect(() => {
//         // Define a function to fetch data
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/getStudents');
//                 console.log('Data:', response.data);
//                 // Handle the data, set state, etc.
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 // Handle error, show message, etc.
//             }
//         };

//         // Call the fetchData function
//         fetchData();

//         // If you need to cleanup, return a function from useEffect
//         // This function will be called when the component unmounts
//         return () => {
//             // Cleanup code here, if needed
//         };
//     }, []); // Pass an empty array as the second argument to useEffect for componentDidMount behavior

//     return (
//         <div>
//             {/* Your component JSX goes here */}
//         </div>
//     );
// }

// export default MyComponent;



import React, { useState, useEffect } from 'react';



function Sample(props) {
    return (
        <div className="card">
            <a style={{ textDecoration: 'none', fontSize: '20px', }} href={props.location}>
                {/* <img className="projects-image" src={props.img} alt="project" /> */}
                <h3 className="toFro"> FROM:{props.from}  AIRPOT {props.airpotFROM}</h3>
                <h3 className="toFro"> TO:{props.to} AIRPOT {props.airpotTo}</h3>



                <p className="project-description">{props.arrivalTime}</p>
            </a>
        </div>
    );
}


function Response() {
    const [datum, setDatum] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/data/6753ab7c1ae9a605d2540413 ');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                const students = data; // Assuming 'students' is the correct property
                setDatum(students);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(datum);
    }, [datum]);



    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    if (!datum) {
        return <div>Loading...</div>;
    }

    // Assuming the API returns an array of items
    return (<div className='props'>
        {error && <p>Error: {error.message}</p>}
        {datum.length > 0 && (
            <ul className='props-list'>
                {datum.map((datum) => (
                    <Sample
                        // img={flightDataRes}
                        from={datum.name}
                        // airpotFROM={flightDataRes.legs[0].origin.name}
                        // airpotTo={flightDataRes.legs[0].destination.name}

                        // to={flightDataRes.legs[0].destination.country}

                        // arrivalTime={flightDataRes.legs[0].arrival}
                    // location={flightDataRes.location}
                    />))}
            </ul>
        )}
        {/* {flights.length === 0 && !isLoading && <p>No flights found.</p>} */}
    </div>



    );
}

export default Response;