import React from "react";
import "../styles/components/GroupCard.css";

const GroupCard = ({ group, isAdmin, onDelete }) => {
  return (
    <div className="group-card">
      <div className="group-info">
        <h3>{group.name}</h3>
        {group.description && <p>{group.description}</p>}
      </div>
      <div className="group-actions">
        {isAdmin && (
          <>
            <button className="edit-btn">Edit</button>
            <button className="delete-btn" onClick={() => onDelete(group.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
