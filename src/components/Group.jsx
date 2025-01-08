import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/components/Group.css';

const Group = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await fetch(`http://localhost:80/rest/group/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password")), // Basic Auth
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch group data.");
                }
                const data = await response.json();
                setGroup(data);
            } catch (err) {
                setError("Error loading group data.");
            } finally {
                setLoading(false);
            }
        };

        fetchGroup();
    }, [id]);

    const [activeTab, setActiveTab] = useState("expenses");

    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="main">
            <div className="top-icon">
                <img src="/images/isotype.png" alt="Groups Icon" />
            </div>

            <h1 className="main-title">Group: {group.name}</h1>
            <em>Created by {group.admin.username}</em>
            <p>{group.description}</p>

            {/* Pestañas para Expenses y Balances */}
            <div className="tab-container">
                <button
                    className={`tab-button ${activeTab === "expenses" ? "active" : ""}`}
                    data-tab="expenses"
                    onClick={() => showTab("expenses")}
                >
                    Expenses
                </button>
                <button
                    className={`tab-button ${activeTab === "balances" ? "active" : ""}`}
                    data-tab="balances"
                    onClick={() => showTab("balances")}
                >
                    Balances
                </button>
            </div>

            {/* Contenido de la pestaña de Expenses */}
            {activeTab === "expenses" && (
                <div id="expenses" className="tab-content active">
                    <h2 className="tab-content-title">Expenses</h2>

                    {group.expenses.length > 0 ? (
                        group.expenses.map((expense) => (
                            <div className="expense" key={expense.id}>
                                <strong>{expense.description}</strong>
                                <p>
                                    {expense.payer.username} paid {expense.totalAmount.toFixed(2)}
                                </p>
                                <a href={`index.php?controller=expenses&action=view&id=${expense.id}`}>
                                    View Details
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No expenses recorded for this group.</p>
                    )}

                    <div className="add-expense">
                        <a href={`index.php?controller=expenses&action=add&group_id=${group.id}`}>
                            Add Expense
                        </a>
                    </div>
                </div>
            )}

            {/* Contenido de la pestaña de Balances */}
            {activeTab === "balances" && (
                <div id="balances" className="tab-content active">
                    <h2 className="tab-content-title">Members Balances</h2>

                    {group.members.length > 0 ? (
                        <ul>
                            {group.members.map((member) => (
                                <li key={member.member.username}>
                                    {member.member.username}: {member.balance.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No balance information available.</p>
                    )}

                    <div className="suggested-movements">
                        <a
                            href={`index.php?controller=groups&action=movements&id=${group.id}`}
                            className="suggested-movements-button"
                        >
                            View Suggested Movements
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Group;
