import React, { useEffect, useState } from 'react';
import axios from 'axios';



function SendAPi() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        class: '',
        subjects: {
            Mathematics: ["", "", ""],
            English: ["", "", ""],
            BasicScience: ["", "", ""],
            GeneralPaper: ["", "", ""],
            ChristianReligionStudies: ["", "", ""],
            Computer: ["", "", ""]



        }
    });


    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //       // Send POST request to the server
    //       const response = await axios.post('/api/submit-form', formData);
    //       console.log('Response:', response.data);
    //     } catch (error) {
    //       console.error('Error submitting form:', error);
    //     }
    //   };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Log the state data before sending the request
            console.log('Data to be sent:', formData);

            // Send POST request to your server endpoint
            const response = await axios.post('http://localhost:5000/addStudents', formData); 

            // Log the response from the server
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };


    return (
        <div>

            <form onSubmit={handleSubmit}>


                <div class="input-table-div">


                    <label for="name">Name:</label>
                    <input type="text" id="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                        required /><br /><br />

                    <label for="age">Age:</label>
                    <input type="number" id="age" value={formData.age} onChange={(event) => setFormData({ ...formData, age: event.target.value })}
                        required /><br /><br />

                    <label for="class">Class:</label>
                    <input type="text'" id="class" value={formData.class} onChange={(event) => setFormData({ ...formData, class: event.target.value })}
                        required /><br /><br />
                    <table>
                        <tr>
                            <th>Subject Name</th>
                            <th>First C.A</th>
                            <th>Second C.A</th>
                            <th>Exam</th>

                        </tr>
                        <tr>
                            <td>English</td>

                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.English[0]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            English: [event.target.value, ...prevState.subjects.English.slice(1)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.English[1]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            English: [...prevState.subjects.English.slice(0, 1), event.target.value, ...prevState.subjects.English.slice(2)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.English[2]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            English: [...prevState.subjects.English.slice(0, 2), event.target.value]
                                        }
                                    }))}
                                />
                            </td>



                        </tr>
                        <tr>
                            <td>Mathematics</td>                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.Mathematics[0]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            Mathematics: [event.target.value, ...prevState.subjects.Mathematics.slice(1)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.Mathematics[1]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            Mathematics: [...prevState.subjects.Mathematics.slice(0, 1), event.target.value, ...prevState.subjects.Mathematics.slice(2)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.Mathematics[2]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            Mathematics: [...prevState.subjects.Mathematics.slice(0, 2), event.target.value]
                                        }
                                    }))}
                                />
                            </td>

                        </tr>
                        <tr>
                            <td>BasicScience</td>                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.BasicScience[0]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            BasicScience: [event.target.value, ...prevState.subjects.BasicScience.slice(1)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.BasicScience[1]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            BasicScience: [...prevState.subjects.BasicScience.slice(0, 1), event.target.value, ...prevState.subjects.BasicScience.slice(2)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.BasicScience[2]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            BasicScience: [...prevState.subjects.BasicScience.slice(0, 2), event.target.value]
                                        }
                                    }))}
                                />
                            </td>


                        </tr>
                        <tr>
                            <td>GeneralPaper</td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.GeneralPaper[0]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            GeneralPaper: [event.target.value, ...prevState.subjects.GeneralPaper.slice(1)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.GeneralPaper[1]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            GeneralPaper: [...prevState.subjects.GeneralPaper.slice(0, 1), event.target.value, ...prevState.subjects.GeneralPaper.slice(2)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.GeneralPaper[2]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            GeneralPaper: [...prevState.subjects.GeneralPaper.slice(0, 2), event.target.value]
                                        }
                                    }))}
                                />
                            </td>

                        </tr>
                        <tr>
                            <td>Christian Religion Studies</td><td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.ChristianReligionStudies[0]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            ChristianReligionStudies: [event.target.value, ...prevState.subjects.ChristianReligionStudies.slice(1)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.ChristianReligionStudies[1]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            ChristianReligionStudies: [...prevState.subjects.ChristianReligionStudies.slice(0, 1), event.target.value, ...prevState.subjects.ChristianReligionStudies.slice(2)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.ChristianReligionStudies[2]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            ChristianReligionStudies: [...prevState.subjects.ChristianReligionStudies.slice(0, 2), event.target.value]
                                        }
                                    }))}
                                />
                            </td>



                        </tr>
                        <tr>
                            <td>Computer</td><td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.Computer[0]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            Computer: [event.target.value, ...prevState.subjects.Computer.slice(1)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.Computer[1]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            Computer: [...prevState.subjects.Computer.slice(0, 1), event.target.value, ...prevState.subjects.Computer.slice(2)]
                                        }
                                    }))}
                                />
                            </td>
                            <td>
                                <input
                                    className="table-input"
                                    type="number"
                                    value={formData.subjects.Computer[2]}
                                    onChange={(event) => setFormData(prevState => ({
                                        ...prevState,
                                        subjects: {
                                            ...prevState.subjects,
                                            Computer: [...prevState.subjects.Computer.slice(0, 2), event.target.value]
                                        }
                                    }))}
                                />
                            </td>


                        </tr>
                    </table>


                    <br />
                    <br />


                    <button type="submit">Submit</button>

                </div>
            </form>
        </div>
    )
}












export default SendAPi