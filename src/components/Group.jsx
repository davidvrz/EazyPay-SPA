import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api"; // Usamos el api para manejar las solicitudes
import '../styles/components/Group.css';

const Group = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await api.get(`/group/${id}`); // Usamos api para obtener los datos
                setGroup(response.data);
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
            <em>Created by {group.admin}</em>
            <p>{group.description}</p>

            {/* Pestañas para Expenses y Balances */}
            <div className="tab-container">
                <button
                    className={`tab-button ${activeTab === "expenses" ? "active" : ""}`}
                    onClick={() => showTab("expenses")}
                >
                    Expenses
                </button>
                <button
                    className={`tab-button ${activeTab === "balances" ? "active" : ""}`}
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
                                    {expense.payer.username} paid {expense.total_amount}
                                </p>
                                <a href={`/expenses/${expense.id}`}>
                                    View Details
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No expenses recorded for this group.</p>
                    )}

                    <div className="add-expense">
                        <Link to={`/group/${group.id}/addExpense`} className="add-expense-button">
                            Add Expense
                        </Link>
                    </div>
                </div>
            )}

            {/* Contenido de la pestaña de Balances */}
            {activeTab === "balances" && (
                <div id="balances" className="tab-content active">
                    <h2 className="tab-content-title">Members Balances</h2>

                    {group.members.length > 0 ? (
                        <ul>
                            {group.members.map((member, index) => (
                                <li key={index}>
                                    {member.username}: {parseFloat(member.balance).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No balance information available.</p>
                    )}

                    <div className="suggested-movements">
                        <Link to={`/group/${group.id}/movements`} className="suggested-movements-button">
                            View Suggested Movements
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Group;
