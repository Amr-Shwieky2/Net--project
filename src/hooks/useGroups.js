// src/hooks/useGroups.js

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase-config'; // Firestore and Storage

const useGroups = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: '', imageFile: null });
  const [editingGroup, setEditingGroup] = useState(null); // To store the group being edited
  const [editGroupData, setEditGroupData] = useState({ name: '', imageFile: null }); // For editing

  // Fetch groups from Firestore
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupCollection = collection(db, 'groups');
        const groupSnapshot = await getDocs(groupCollection);
        const groupList = groupSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(groupList);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  // Handle form input change for adding a new group
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setNewGroup({ ...newGroup, imageFile: files[0] }); // Set the selected file
    } else {
      setNewGroup({ ...newGroup, [name]: value });
    }
  };

  // Handle adding a new group
  const handleAddGroup = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage
    const imageRef = ref(storage, `groups/${newGroup.imageFile.name}`);
    await uploadBytes(imageRef, newGroup.imageFile); // Upload the file
    const imageUrl = await getDownloadURL(imageRef); // Get the image URL after upload

    // Add group to Firestore with the image URL
    const newGroupData = {
      name: newGroup.name,
      image: imageUrl,
    };
    await addDoc(collection(db, 'groups'), newGroupData);
    setGroups([...groups, { id: Date.now(), ...newGroupData }]); // Update local state
    setNewGroup({ name: '', imageFile: null }); // Clear the form
  };

  // Handle delete group
  const handleDeleteGroup = async (groupId) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      const groupRef = doc(db, 'groups', groupId);
      await deleteDoc(groupRef);
      setGroups(groups.filter((group) => group.id !== groupId)); // Remove from local state
    }
  };

  // Handle edit group
  const handleEditGroup = (group) => {
    setEditingGroup(group.id); // Set the group being edited
    setEditGroupData({ name: group.name, imageFile: null }); // Pre-fill current name
  };

  // Handle update group
  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    const groupRef = doc(db, 'groups', editingGroup);

    // If a new image file is selected, upload it and get the new URL
    let imageUrl = null;
    if (editGroupData.imageFile) {
      const imageRef = ref(storage, `groups/${editGroupData.imageFile.name}`);
      await uploadBytes(imageRef, editGroupData.imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    // Update the group in Firestore
    const updatedData = {
      name: editGroupData.name,
      ...(imageUrl && { image: imageUrl }), // Only update the image if a new one was uploaded
    };
    await updateDoc(groupRef, updatedData);

    setGroups(groups.map((group) => (group.id === editingGroup ? { ...group, ...updatedData } : group)));
    setEditingGroup(null); // Clear editing state
  };

  return {
    groups,
    newGroup,
    editingGroup,
    editGroupData,
    setNewGroup,
    setEditGroupData,
    handleInputChange,
    handleAddGroup,
    handleDeleteGroup,
    handleEditGroup,
    handleUpdateGroup,
  };
};

export default useGroups;
