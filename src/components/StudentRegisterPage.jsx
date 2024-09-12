// StudentRegisterPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../config/firebase-config';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const StudentRegisterPage = () => {
  const { id } = useParams(); // Group ID from URL
  const [student, setStudent] = useState({ name: '', photoFile: null });
  const [success, setSuccess] = useState(false);

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

    // Upload the photo to Firebase Storage
    const photoRef = ref(storage, `students/${student.photoFile.name}`);
    await uploadBytes(photoRef, student.photoFile);
    const photoURL = await getDownloadURL(photoRef); // Get the download URL for the photo

    // Add student to Firestore
    const groupRef = doc(db, 'groups', id);
    const newStudent = {
      name: student.name,
      photo: photoURL, // Uploaded photo URL
      marks: 0, // Marks start at 0
    };

    // Add the new student to the group's student array
    await updateDoc(groupRef, {
      students: arrayUnion(newStudent),
    });

    // Success message
    setSuccess(true);
  };

  return (
    <div className="student-register-container">
      <h1>Register as a Student</h1>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
          />
          <input
            type="file"
            name="photoFile"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      ) : (
        <p>Registration successful! You have been added to the group.</p>
      )}
    </div>
  );
};

export default StudentRegisterPage;
