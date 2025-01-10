import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import GroupCard from "./GroupCard"; 
import "../styles/components/GroupList.css";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get("/group");
        
        if (response.data && Array.isArray(response.data)) {
          setGroups(response.data);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (err) {
        setError("Error fetching groups. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleDelete = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      await api.delete(`/group/${groupId}`);
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
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
        {Array.isArray(groups) && groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            isAdmin={currentUser === group.admin}
            onDelete={handleDelete}
          />
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
