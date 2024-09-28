/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useClassDetail from '../hooks/useClassDetail';
import './style/groupdetail.css'; // Assuming you have a CSS file for styling

const ClassDetailPage = () => {
  const { id } = useParams(); // Get the group ID from the URL
  const { user } = useAuth(); // Get user data from the authentication context
  const {
    groupData,
    loading,
    groupInfo,
    setGroupInfo,
    handleUpdateGroupInfo,
    handleUpdateStudentPoints,
    toggleChampionship,
    championshipOpen,
    championshipName,
    setChampionshipName,
    handleAddStudent,
    handleRemoveStudent,
    currentChampion,
    calculateChampionOfChampions,
    championOfChampions,
  } = useClassDetail(id);

  const [showLink, setShowLink] = useState(false); // State to toggle visibility of the registration link
  const [newStudent, setNewStudent] = useState({ name: '', photoFile: null, birthday: '', marks: 0 });
  const [uploading, setUploading] = useState(false);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while data is being fetched
  }

  if (!groupData) {
    return <div>Group not found!</div>; // Show message if the group data doesn't exist
  }

  // Generate the correct registration URL for students using the group ID
  const registrationURL = `${window.location.origin}/group/${id}/register`;

  // Handle form input for new students
  const handleNewStudentChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photoFile') {
      setNewStudent({ ...newStudent, photoFile: files[0] });
    } else {
      setNewStudent({ ...newStudent, [name]: value });
    }
  };

  // Form submission to add a new student
  const handleNewStudentSubmit = async (e) => {
    e.preventDefault();
    if (!newStudent.photoFile) {
      alert('Please select a photo for the student');
      return;
    }

    setUploading(true); // Set uploading state

    try {
      // Add the student with the photo file and birthday
      await handleAddStudent(newStudent);
      setNewStudent({ name: '', photoFile: null, birthday: '', marks: 0 });
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student.');
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <div className="class-detail-container">
      {/* Group Title and Description */}
      <h1>{groupData.name}</h1>
      <p>{groupData.description}</p>

      {/* Display the group image if there is no champion, or the champion's image if there is one */}
      <div className="image-display">
        {currentChampion ? (
          <div className="champion-display">
            <h3>Last Champion: {currentChampion}</h3>
            {groupData.students
              .filter((student) => student.name === currentChampion)
              .map((champion) => (
                <img
                  key={champion.name}
                  src={champion.photo}
                  alt={champion.name}
                  className="champion-photo"
                />
              ))}
          </div>
        ) : (
          <img src={groupInfo.image} alt={groupData.name} className="group-image" />
        )}
      </div>

      {/* Champion of Champions Display */}
      {championOfChampions && (
        <div className="champion-display">
          <h3>Champion of Champions: {championOfChampions.name}</h3>
          <img src={championOfChampions.photo} alt={championOfChampions.name} className="champion-photo" />
        </div>
      )}

      {/* Group Info Form for logged in users */}
      {user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateGroupInfo(groupInfo); // Update group info (name, description)
          }}
        >
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

      {/* Championship Controls for authenticated users */}
      {user && (
        <div className="championship-controls">
          <input
            type="text"
            value={championshipName}
            onChange={(e) => setChampionshipName(e.target.value)}
            placeholder="Championship Name"
            required
            disabled={championshipOpen} // Disable input if championship is already open
          />
          <button onClick={toggleChampionship}>{championshipOpen ? 'Close Championship' : 'Open Championship'}</button>
          <button onClick={calculateChampionOfChampions}>Calculate Champion of Champions</button>

          {/* Display the current champion when the championship ends */}
          {currentChampion && (
            <div>
              <h3>Champion: {currentChampion}</h3>
            </div>
          )}
        </div>
      )}

      {/* Student Registration Link (only for authenticated users) */}
      {user && (
        <div className="student-registration">
          <button onClick={() => setShowLink(!showLink)}>{showLink ? 'Hide Registration Link' : 'Generate Registration Link'}</button>
          {showLink && (
            <div className="registration-link">
              <p>Share this link with your students:</p>
              <input type="text" value={registrationURL} readOnly onClick={(e) => e.target.select()} />
              <Link to={`/group/${id}/register`} target="_blank">
                Open Registration Page
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Student List displayed as a table */}
      <h3>Students</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Current Points</th>
            <th>Total Points</th>
            {user && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {groupData.students.map((student) => (
            <tr key={student.name}>
              <td>
                <img src={student.photo} alt={student.name} className="student-photo" />
              </td>
              <td>{student.name}</td>
              <td>{student.marks}</td>
              <td>{student.totalPoints || 0}</td>
              {user && (
                <td>
                  {/* Points control for authenticated users during an active championship */}
                  {championshipOpen && (
                    <div className="points-control">
                      <button onClick={() => handleUpdateStudentPoints(student, student.marks + 1)}>+1 Point</button>
                      <button onClick={() => handleUpdateStudentPoints(student, student.marks - 1)}>-1 Point</button>
                    </div>
                  )}
                  <button onClick={() => handleRemoveStudent(student)}>Remove</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassDetailPage;
