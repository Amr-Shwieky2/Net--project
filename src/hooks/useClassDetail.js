import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, storage } from '../config/firebase-config'; // Added storage for Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase storage methods

const useClassDetail = (groupId) => {
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupInfo, setGroupInfo] = useState({ name: '', description: '', image: '' });
  const [championshipOpen, setChampionshipOpen] = useState(false);
  const [currentChampion, setCurrentChampion] = useState(null);
  const [championshipName, setChampionshipName] = useState('');
  const [championOfChampions, setChampionOfChampions] = useState(null); // Champion of Champions

  // Fetch group data from Firestore
  useEffect(() => {
    const fetchGroup = async () => {
      setLoading(true);
      try {
        const groupRef = doc(db, 'groups', groupId);
        const groupSnap = await getDoc(groupRef);
        if (groupSnap.exists()) {
          const data = groupSnap.data();
          setGroupData(data);
          setGroupInfo({ name: data.name, description: data.description, image: data.image });
          setChampionshipOpen(data.currentChampionship?.isOpen || false);
          setChampionshipName(data.currentChampionship?.name || '');

          // Set the most recent champion (if exists)
          if (data.championships && data.championships.length > 0) {
            const lastChampionship = data.championships[data.championships.length - 1];
            setCurrentChampion(lastChampionship.champion);
          }
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  // Helper function to update Firestore and local state
  const updateGroupState = async (updates) => {
    const groupRef = doc(db, 'groups', groupId);
    try {
      await updateDoc(groupRef, updates);
      setGroupData({ ...groupData, ...updates });
    } catch (error) {
      console.error('Error updating Firestore:', error);
    }
  };

  // Function to upload student photos to Firebase Storage
  const uploadPhoto = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `students/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef); // Get the image URL after upload
  };

  // Add new student with photo and birthday to Firestore
  const handleAddStudent = async (newStudent) => {
    if (!newStudent.photoFile) {
      throw new Error('No photo file provided');
    }

    // Upload the photo and get the URL
    const photoURL = await uploadPhoto(newStudent.photoFile);

    const studentData = {
      name: newStudent.name,
      photo: photoURL,
      marks: newStudent.marks,
      birthday: newStudent.birthday, // Store the birthday in Firestore
    };

    // Add student to Firestore
    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, {
      students: arrayUnion(studentData),
    });

    // Update local state with the new student
    setGroupData((prevData) => ({
      ...prevData,
      students: [...prevData.students, studentData],
    }));
  };

  // Handle updating student points during an active championship
  const handleUpdateStudentPoints = async (student, newPoints) => {
    const updatedStudents = groupData.students.map((s) =>
      s.name === student.name ? { ...s, marks: newPoints } : s
    );

    await updateGroupState({ students: updatedStudents });
  };

  // Open or close the championship
  const toggleChampionship = async () => {
    if (championshipOpen) {
      // Close the championship and calculate the winner
      const topStudent = groupData.students.reduce((prev, current) =>
        prev.marks > current.marks ? prev : current
      );

      // Update total points for all students based on their performance
      const updatedStudents = groupData.students.map((student) => ({
        ...student,
        totalPoints: (student.totalPoints || 0) + student.marks,
        marks: 0, // Reset current championship points after it ends
      }));

      await updateGroupState({
        championships: arrayUnion({
          championshipName: championshipName,
          champion: topStudent.name,
          participants: updatedStudents.map((student) => ({
            name: student.name,
            points: student.totalPoints,
          })),
        }),
        students: updatedStudents,
        'currentChampionship.isOpen': false,
        'currentChampionship.name': '',
      });

      setCurrentChampion(topStudent.name);
      setChampionshipOpen(false);
      setChampionshipName(''); // Clear the championship name
    } else {
      // Open a new championship with the given name
      await updateGroupState({
        'currentChampionship.isOpen': true,
        'currentChampionship.name': championshipName,
      });

      setChampionshipOpen(true);
    }
  };

  // Calculate and set the Champion of Champions based on total points
  const calculateChampionOfChampions = () => {
    const champion = groupData.students.reduce((prev, current) =>
      (prev.totalPoints || 0) > (current.totalPoints || 0) ? prev : current
    );

    setChampionOfChampions(champion); // Set the Champion of Champions
  };

  // Update group info
  const handleUpdateGroupInfo = async (groupInfo) => {
    await updateGroupState({
      name: groupInfo.name,
      description: groupInfo.description,
    });
  };

  // Remove a student
  const handleRemoveStudent = async (studentToRemove) => {
    const updatedStudents = groupData.students.filter(
      (student) => student.name !== studentToRemove.name
    );
    await updateGroupState({ students: updatedStudents });
  };

  return {
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
    currentChampion, // This will contain the name of the last champion
    calculateChampionOfChampions, // Function to calculate the Champion of Champions
    championOfChampions, // This will contain the name of the Champion of Champions
  };
};

export default useClassDetail;
