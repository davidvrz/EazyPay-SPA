import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import GroupCard from "./GroupCard"; 
import "../styles/components/GroupList.css";
import { useTranslation } from "react-i18next";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = localStorage.getItem("username");
  const {t} = useTranslation();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get("/group");
        
        if (response.data && Array.isArray(response.data)) {
          setGroups(response.data);
        } else {
          throw new Error(t('error-unexpected-structure'));
        }
      } catch (err) {
        setError(t('error-fetching-groups'));
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleDelete = async (groupId) => {
    if (!window.confirm(t('msg-delete-group'))) return;

    try {
      await api.delete(`/group/${groupId}`);
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
    } catch (err) {
      console.error(err);
      alert(t('error-delete-group'));
    }
  };

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main">
      <div className="top-icon">
        <img src="/images/isotype.png" alt="Groups Icon" />
      </div>
      <h1 className="main-title">{t('form-groups')}</h1>
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
        <Link to="/addgroup" className="add-group-btn">
          {t('form-create-group')}
        </Link>
      )}
    </div>
  );
};

export default GroupList;
