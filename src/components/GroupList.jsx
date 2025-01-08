import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/components/GroupList.css';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:80/rest/group", {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password")), // Basic Auth
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError("Error fetching groups. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleDelete = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:80/rest/group/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password")),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete group");
      }
      setGroups(groups.filter(group => group.id !== groupId));
    } catch (err) {
      alert("Error deleting group. Please try again later.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main">
      <div className="top-icon">
        <img src="/images/isotype.png" alt="Groups Icon" />
      </div>

      <h1 className="main-title">Groups</h1>

      <div className="groups-list">
        {groups.map((group) => (
          <div className="group-card" key={group.id}>
            <div className="group-info">
              <h3>
                <Link to={`/group/${group.id}`}>
                  {group.name}
                </Link>
              </h3>
              <p>
                <strong>Admin:</strong> {group.admin}
              </p>
              <p>{group.description}</p>
            </div>
            {currentUser === group.admin && (
              <div className="group-actions">
                <button
                  onClick={() => handleDelete(group.id)}
                >
                  Delete
                </button>
                <a href={`index.php?controller=groups&action=edit&id=${group.id}`}>
                  Edit
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {currentUser && (
        <Link className="add-group-btn" to="/addgroup">
          Create Group
        </Link>
      )}
    </div>
  );
};

export default GroupList;
