import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/components/GroupList.css';

const GroupList = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const currentUser = "currentuser"; // Sustituir con el usuario autenticado real

    useEffect(() => {
        // Obtener grupos desde el endpoint
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
                                {/* <a href={`index.php?controller=groups&action=view&id=${group.id}`}>
                                    {group.name}
                                </a> */}
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
                                <form
                                    method="POST"
                                    action="index.php?controller=groups&action=delete"
                                    id={`delete_group_${group.id}`}
                                    style={{ display: "inline" }}
                                >
                                    <input type="hidden" name="id" value={group.id} />
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (window.confirm("Are you sure?")) {
                                                document.getElementById(`delete_group_${group.id}`).submit();
                                            }
                                        }}
                                    >
                                        Delete
                                    </a>
                                </form>
                                <a
                                    href={`index.php?controller=groups&action=edit&id=${group.id}`}
                                >
                                    Edit
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {currentUser && (
                < Link className="add-group-btn" to={'/addgroup'}>
                    Create group
                </Link>
            )}
        </div>
    );
};

export default GroupList;
