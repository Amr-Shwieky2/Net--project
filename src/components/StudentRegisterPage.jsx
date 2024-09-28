// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link to create navigation
import { db, storage } from '../config/firebase-config';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './style/studentregister.css'; // Assuming you have a CSS file for styling

const StudentRegisterPage = () => {
  const { id } = useParams(); // Group ID from URL
  const [student, setStudent] = useState({ name: '', photoFile: null, birthday: '', email: '' });
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false); // Track upload state

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photoFile') {
      setStudent({ ...student, photoFile: files[0] }); // Set the selected file
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student.name || !student.photoFile) {
      alert("Please provide both name and photo.");
      return;
    }

    setUploading(true); // Start uploading state

    try {
      // Upload the photo to Firebase Storage
      const photoRef = ref(storage, `students/${student.photoFile.name}`);
      await uploadBytes(photoRef, student.photoFile);
      const photoURL = await getDownloadURL(photoRef); // Get the download URL for the photo

      // Add student to Firestore
      const groupRef = doc(db, 'groups', id);
      const newStudent = {
        name: student.name,
        photo: photoURL, // Uploaded photo URL
        birthday: student.birthday,
        email: student.email,
        marks: 0, // Marks start at 0
      };

      // Add the new student to the group's student array
      await updateDoc(groupRef, {
        students: arrayUnion(newStudent),
      });

      setSuccess(true); // Show success message
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to register the student.");
    } finally {
      setUploading(false); // End uploading state
    }
  };

  return (
    <div className="student-register-container">
      <h1>Register as a Student</h1>
      {!success ? (
        <form className="student-register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
          />
          <input
            type="date"
            name="birthday"
            value={student.birthday}
            onChange={handleInputChange}
            placeholder="Your Birthday"
            required
          />
          <input
            type="file"
            name="photoFile"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={uploading}>
            {uploading ? "Registering..." : "Register"}
          </button>
        </form>
      ) : (
        <div className="success-message">
          <p>Registration successful! You have been added to the group.</p>
          <Link to={`/group/${id}`} className="back-to-group-button">
            Back to Group Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default StudentRegisterPage;
