// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the authentication context
import useClassDetail from '../hooks/useClassDetail'; // Import the custom hook for group data
import './style/groupdetail.css'; // Import the CSS file for styling

const ClassDetailPage = () => {
  const { id } = useParams(); // Retrieve the group ID from the URL
  const { user } = useAuth(); // Get the authenticated user details from context
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
    showLink,
    setShowLink,
    registrationURL,
    showChampionships,
    toggleShowChampionships,
    newStudent,
    setNewStudent,
    uploading,
    setUploading,
  } = useClassDetail(id); // Custom hook for handling group data and states

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while data is being fetched
  }

  if (!groupData) {
    return <div>Group not found!</div>; // Display message if group data is not found
  }

  // Handle form input changes for adding new students
  const handleNewStudentChange = (e) => {
    const { name, value, files } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission to add a new student
  const handleNewStudentSubmit = async (e) => {
    e.preventDefault();
    if (!newStudent.photoFile) {
      alert('Please select a photo for the student');
      return;
    }
    setUploading(true);
    try {
      await handleAddStudent(newStudent);
      setNewStudent({ name: '', photoFile: null, birthday: '', marks: 0 });
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="class-detail-container">
      {/* Group Title and Description */}
      <h1>{groupData.name}</h1>
      <p>{groupData.description}</p>

      {/* Display the group image or champion's image if present */}
      <div className="image-display">
        {currentChampion ? (
          <div className="champion-display">
            <h3>Student of the month: {currentChampion}</h3>
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

      {/* Display Champion of Champions if available */}
      {championOfChampions && (
        <div className="champion-display">
          <h3>Champion of Champions: {championOfChampions.name}</h3>
          <img
            src={championOfChampions.photo}
            alt={championOfChampions.name}
            className="champion-photo"
          />
        </div>
      )}

      {/* Group Info Update Form (Only for Logged-In Users) */}
      {user && (
        <form
          className="group-info-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateGroupInfo(groupInfo);
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

      {/* Championship Controls (Only for Logged-In Users) */}
      {user && (
        <div className="championship-controls">
          <input
            type="text"
            value={championshipName}
            onChange={(e) => setChampionshipName(e.target.value)}
            placeholder="Championship Name"
            required
            disabled={championshipOpen}
          />
          <button onClick={toggleChampionship}>
            {championshipOpen ? 'Close Championship' : 'Open Championship'}
          </button>
          <button onClick={calculateChampionOfChampions}>Calculate Champion of Champions</button>
        </div>
      )}

      {/* Registration Link Generation and Display */}
      {user && (
        <div className="student-registration">
          <button onClick={() => setShowLink(!showLink)}>
            {showLink ? 'Hide Registration Link' : 'Generate Registration Link'}
          </button>
          {showLink && (
            <div className="registration-link">
              <p>Share this link with your students:</p>
              <input
                type="text"
                value={registrationURL}
                readOnly
                onClick={(e) => e.target.select()}
              />
              <Link to={`/group/${id}/register`} target="_blank">
                Open Registration Page
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Toggle to Show Previous Championships */}
      <div className="championship-history">
        <button onClick={toggleShowChampionships}>
          {showChampionships ? 'Hide Championships' : 'Show Championships'}
        </button>
        {showChampionships && (
          <div className="championship-list">
            <h4>Previous Championships:</h4>
            <ul>
              {groupData.championships &&
                groupData.championships.map((champ, index) => (
                  <li key={index}>
                    <strong>{champ.championshipName}</strong> - Champion: {champ.champion}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* Student List Display */}
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
                  {championshipOpen && (
                    <div className="points-control">
                      <button onClick={() => handleUpdateStudentPoints(student, student.marks + 1)}>
                        +1 Point
                      </button>
                      <button onClick={() => handleUpdateStudentPoints(student, student.marks - 1)}>
                        -1 Point
                      </button>
                    </div>
                  )}
                  <button onClick={() => handleRemoveStudent(student)}>Remove</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to Add a New Student (Only for Logged-In Users) */}
      {user && (
        <form className="add-student-form" onSubmit={handleNewStudentSubmit}>
          <h4>Add New Student</h4>
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleNewStudentChange}
            placeholder="Student Name"
            required
          />
          <input
            type="file"
            name="photoFile"
            accept="image/*"
            onChange={handleNewStudentChange}
            required
          />
          <input
            type="date"
            name="birthday"
            value={newStudent.birthday}
            onChange={handleNewStudentChange}
            required
          />
          <input
            type="number"
            name="marks"
            value={newStudent.marks}
            onChange={handleNewStudentChange}
            required
          />
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add Student'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ClassDetailPage;
