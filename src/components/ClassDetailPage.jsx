// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Auth context for checking login status
import useClassDetail from '../hooks/useClassDetail'; // Custom hook
import './style/groupDetail.css'; // Add your styles

const ClassDetailPage = () => {
  const { id } = useParams(); // Get the group ID from the URL
  const { user } = useAuth(); // Check if user is logged in
  const {
    groupData,
    loading,
    groupInfo,
    setGroupInfo,
    selectedStudent,
    setSelectedStudent,
    handleAddStudent,
    handleRemoveStudent,
    handleUpdateGroupInfo,
    handleUpdateStudent
  } = useClassDetail(id);

  const [newStudent, setNewStudent] = useState({ name: '', photoFile: null, marks: '' });

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while data is being fetched
  }

  if (!groupData) {
    return <div>Group not found!</div>; // Show message if no group data is found
  }

  return (
    <div className="class-detail-container">
      <h1>{groupData.name}</h1>
      <p>{groupData.description}</p>

      {/* Show form for updating group name and description if logged in */}
      {user && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleUpdateGroupInfo(groupInfo);
        }}>
          <input
            type="text"
            value={groupInfo.name}
            onChange={(e) => setGroupInfo({ ...groupInfo, name: e.target.value })}
            placeholder="Group Name"
            required
          />
          <textarea
            value={groupInfo.description}
            onChange={(e) => setGroupInfo({ ...groupInfo, description: e.target.value })}
            placeholder="Group Description"
            required
          />
          <button type="submit">Update Group Info</button>
        </form>
      )}

      {user && (
        <Link to={`/group/${id}/register`} className="register-link">
            Share this link with your students to register
        </Link>
      )}

      <h3>Students:</h3>
      <ul className="student-list">
        {groupData.students && groupData.students.map((student, index) => (
          <li key={index} className="student-card">
            <img src={student.photo} alt={student.name} className="student-photo" />
            <div className="student-info">
              <h4>{student.name}</h4>
              <p>Evaluation: {student.marks}</p>
            </div>

            {/* Show edit and delete options if logged in */}
            {user && (
              <div>
                <button onClick={() => handleRemoveStudent(student)}>Remove Student</button>
                <button onClick={() => setSelectedStudent(student)}>Edit Student</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Form for adding new students (only if logged in) */}
      {user && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddStudent(newStudent);
        }}>
          <h4>Add Student</h4>
          <input
            type="text"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            placeholder="Student Name"
            required
          />
          <input
            type="file"
            onChange={(e) => setNewStudent({ ...newStudent, photoFile: e.target.files[0] })}
            required
          />
          <input
            type="number"
            value={newStudent.marks}
            onChange={(e) => setNewStudent({ ...newStudent, marks: e.target.value })}
            placeholder="Marks"
            required
          />
          <button type="submit">Add Student</button>
        </form>
      )}

      {/* Form for updating selected student info */}
      {selectedStudent && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleUpdateStudent(selectedStudent);
        }}>
          <h4>Update Student Info</h4>
          <input
            type="text"
            value={selectedStudent.name}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
            placeholder="Student Name"
            required
          />
          <input
            type="text"
            value={selectedStudent.photo}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, photo: e.target.value })}
            placeholder="Photo URL"
            required
          />
          <input
            type="number"
            value={selectedStudent.marks}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, marks: e.target.value })}
            placeholder="Marks"
            required
          />
          <button type="submit">Update Student</button>
        </form>
      )}
    </div>
  );
};

export default ClassDetailPage;
