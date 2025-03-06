import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./Routes/Home";
import TeacherLogin from "./Routes/TeacherLogin";
import StudentLogin from "./Routes/StudentLogin";
import StudentReg from "./Routes/StudentReg";
import AdminReg from "./Routes/AdminReg";
import TeacherReg from "./Routes/TeacherReg";
import AdminLogin from "./Routes/AdminLogin";
import StudentProfile from "./Routes/StudentsProfilePage";
import StudentList from "./Routes/StudentsList";
import SpecificStudent from "./Routes/SearchForSpecificStudent";
import UpdateStudentScore from "./Routes/UpdateStudentScore";



function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/teacherLogin" element={<TeacherLogin />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/adminReg" element={<AdminReg />} />
          <Route path="/teacherReg" element={<TeacherReg />} />
          <Route path="/studentReg" element={<StudentReg />} />
          <Route path="/studentProfile" element={<StudentProfile />} />
          <Route path="/studentsList" element={<StudentList />} />
          <Route path="/specificStudent" element={<SpecificStudent />} />
          <Route path="/updateStudentScore" element={<UpdateStudentScore />} />



        </Routes>
      </Router>
    </>
  )
}

export default App
