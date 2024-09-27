// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useGroups from '../hooks/useGroups';
import './style/mainPage.css';

const MainPage = () => {
  const { user } = useAuth();
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
  } = useGroups();

  return (
    <div id="group-container">
      <h1 id="page-title">My Groups</h1>

      {user && (
        <form id="add-group-form" onSubmit={handleAddGroup}>
          <input
            type="text"
            id="group-name-input"
            name="name"
            placeholder="Group Name"
            value={newGroup.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            id="group-image-input"
            name="imageFile"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
          <button id="add-group-button" type="submit">Add Group</button>
        </form>
      )}

      <div id="group-list">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <Link to={`/group/${group.id}`}>
              <img src={group.image} alt={group.name} className="group-image" />
              <div className="group-name">{group.name}</div>
            </Link>

            {user && (
              <div className="group-actions">
                <button className="group-edit-button" onClick={() => handleEditGroup(group)}>Edit</button>
                <button className="group-delete-button" onClick={() => handleDeleteGroup(group.id)}>Delete</button>
              </div>
            )}

            {editingGroup === group.id && (
              <form className="edit-group-form" onSubmit={handleUpdateGroup}>
                <input
                  type="text"
                  className="edit-group-name-input"
                  name="name"
                  placeholder="New Group Name"
                  value={editGroupData.name}
                  onChange={(e) => setEditGroupData({ ...editGroupData, name: e.target.value })}
                  required
                />
                <input
                  type="file"
                  className="edit-group-image-input"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) => setEditGroupData({ ...editGroupData, imageFile: e.target.files[0] })}
                />
                <button className="update-group-button" type="submit">Update Group</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
