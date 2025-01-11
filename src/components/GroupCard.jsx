import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/GroupCard.css";

const GroupCard = ({ group, isAdmin, onDelete }) => {
  return (
    <Link to={`/group/${group.id}`} className="group-info-btn">
      <div className="group-card">
        <div className="group-info">
          <h3>{group.name}</h3>
          {group.description && <p>{group.description}</p>}
        </div>
        <div className="group-actions">
          {isAdmin && (
            <>
              <Link to={`/editgroup/${group.id}`} className="edit-btn">
                Edit
              </Link>
              <button className="delete-btn" onClick={() => onDelete(group.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
