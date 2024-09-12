// src/hooks/useClassDetail.js

import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase-config'; // Firestore and Storage

const useClassDetail = (groupId) => {
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupInfo, setGroupInfo] = useState({ name: '', description: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch the group details from Firestore based on the group ID
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupRef = doc(db, 'groups', groupId); // Reference to the group document
        const groupSnap = await getDoc(groupRef); // Fetch the group document
        if (groupSnap.exists()) {
          const data = groupSnap.data();
          setGroupData(data);
          setGroupInfo({ name: data.name, description: data.description });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  // Handle adding a new student
  const handleAddStudent = async (newStudent) => {
    const groupRef = doc(db, 'groups', groupId); // Reference to the group document

    if (newStudent.photoFile) {
      // Upload photo to Firebase Storage
      const storageRef = ref(storage, `students/${newStudent.photoFile.name}`);
      await uploadBytes(storageRef, newStudent.photoFile);
      const photoURL = await getDownloadURL(storageRef);

      // Add new student to Firestore with the photo URL
      const studentToAdd = {
        name: newStudent.name,
        photo: photoURL, // Store the download URL
        marks: newStudent.marks
      };

      await updateDoc(groupRef, {
        students: arrayUnion(studentToAdd) // Add the new student to the students array
      });

      // Update local state
      setGroupData({ ...groupData, students: [...groupData.students, studentToAdd] });
    }
  };

  // Handle removing a student
  const handleRemoveStudent = async (student) => {
    const groupRef = doc(db, 'groups', groupId);

    // Remove the student from Firestore
    await updateDoc(groupRef, {
      students: arrayRemove(student)
    });

    // Update local state
    setGroupData({
      ...groupData,
      students: groupData.students.filter((s) => s.name !== student.name)
    });
  };

  // Handle updating group info (name, description)
  const handleUpdateGroupInfo = async (groupInfo) => {
    const groupRef = doc(db, 'groups', groupId);

    // Update group info in Firestore
    await updateDoc(groupRef, {
      name: groupInfo.name,
      description: groupInfo.description
    });

    // Update local state
    setGroupData({ ...groupData, name: groupInfo.name, description: groupInfo.description });
  };

  // Handle updating student info
  const handleUpdateStudent = async (updatedStudent) => {
    const updatedStudents = groupData.students.map((student) =>
      student.name === selectedStudent.name ? updatedStudent : student
    );

    const groupRef = doc(db, 'groups', groupId);

    // Update students array in Firestore
    await updateDoc(groupRef, {
      students: updatedStudents
    });

    // Update local state
    setGroupData({ ...groupData, students: updatedStudents });
    setSelectedStudent(null); // Clear selected student for updating
  };

  return {
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
  };
};

export default useClassDetail;
