import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/GroupCard.css";

const GroupCard = ({ group, isAdmin, onDelete }) => {
  return (
    <div className="group-card">
      <div className="group-info">
        <h3>
          <Link to={`/group/${group.id}`}>{group.name}</Link>
        </h3>
        <p>
          <strong>Admin:</strong> {group.admin}
        </p>
        <p>{group.description}</p>
      </div>
      {isAdmin && (
        <div className="group-actions">
          <button onClick={() => onDelete(group.id)}>Delete</button>
          <Link to={`/group/${group.id}/edit`}>Edit</Link>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
