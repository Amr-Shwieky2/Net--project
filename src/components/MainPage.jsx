// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext to check if the user is signed in
import useGroups from '../hooks/useGroups'; // Custom hook
import './style/mainPage.css'; // Import styles

const MainPage = () => {
  const { user } = useAuth(); // Get the logged-in user from context
  const {
    groups,
    newGroup,
    editingGroup,
    editGroupData,
    setEditGroupData,
    handleInputChange,
    handleAddGroup,
    handleDeleteGroup,
    handleEditGroup,
    handleUpdateGroup,
  } = useGroups(); // Using the custom hook

  return (
    <div className="group-container">
      <h1>My Groups</h1>

      {/* Show add group form if user is signed in */}
      {user && (
        <form className="add-group-form" onSubmit={handleAddGroup}>
          <input
            type="text"
            name="name"
            placeholder="Group Name"
            value={newGroup.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Group</button>
        </form>
      )}

      <div className="group-list">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <Link to={`/group/${group.id}`}>
              <img src={group.image} alt={group.name} className="group-image" />
              <div className="group-name">{group.name}</div>
            </Link>

            {/* Show edit and delete buttons if user is signed in */}
            {user && (
              <div className="group-actions">
                <button onClick={() => handleEditGroup(group)}>Edit</button>
                <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
              </div>
            )}

            {/* Show update form if editing this group */}
            {editingGroup === group.id && (
              <form className="edit-group-form" onSubmit={handleUpdateGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="New Group Name"
                  value={editGroupData.name}
                  onChange={(e) => setEditGroupData({ ...editGroupData, name: e.target.value })}
                  required
                />
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) => setEditGroupData({ ...editGroupData, imageFile: e.target.files[0] })}
                />
                <button type="submit">Update Group</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
