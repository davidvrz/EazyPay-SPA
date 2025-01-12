import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import ExpenseCard from "./ExpenseCard";
import '../styles/components/Group.css';
import { useTranslation } from "react-i18next";

const Group = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {t} = useTranslation();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await api.get(`/group/${id}`); 
                
                setGroup(response.data);
                
            } catch (err) {
                setError(t('error-load-group'));
            } finally {
                setLoading(false);
            }
        };

        fetchGroup();
    }, [id]);

    const handleDelete = async (groupId, expenseId) => {
        if (!window.confirm(t('msg-delete-expense'))) return;
    
        try {
          await api.delete(`/group/${groupId}/expense/${expenseId}`);
          setGroup((prevGroup) => ({
            ...prevGroup,
            expenses: prevGroup.expenses.filter(expense => expense.id !== expenseId)
          }));
        } catch (err) {
          console.error(err);
          alert(t('error-delete-expense'));
        }
      };

    const [activeTab, setActiveTab] = useState("expenses");

    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    if (loading) return <p>{t('loading')}</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="main">
            <div className="top-icon">
                <img src="/images/isotype.png" alt="Groups Icon" />
            </div>

            <h1 className="main-title">{t('form-group')} {group.name}</h1>
            <em>{t('msg-group-creator')} {group.admin}</em>
            <p>{group.description}</p>

            {/* Pestañas para Expenses y Balances */}
            <div className="tab-container">
                <button
                    className={`tab-button ${activeTab === "expenses" ? "active" : ""}`}
                    onClick={() => showTab("expenses")}
                >
                    {t('form-expenses')}
                </button>
                <button
                    className={`tab-button ${activeTab === "balances" ? "active" : ""}`}
                    onClick={() => showTab("balances")}
                >
                    {t('form-balances')}
                </button>
            </div>

            {/* Contenido de la pestaña de Expenses */}
            {activeTab === "expenses" && (
                <div id="expenses" className="tab-content active">
                    <h2 className="tab-content-title">{t('form-expenses')}</h2>
                    
                    {Array.isArray(group.expenses) && group.expenses.map((expense) => (
                        <ExpenseCard
                            key={expense.id}
                            expense={expense}
                            group={group}
                            onDelete={() => handleDelete(group.id, expense.id)}
                        />
                    ))}

                    <div className="add-expense">
                        <Link to={`/group/${group.id}/addExpense`} className="add-expense-button">
                            {t('form-add-expense')}
                        </Link>
                    </div>
                </div>
            )}

            {/* Contenido de la pestaña de Balances */}
            {activeTab === "balances" && (
                <div id="balances" className="tab-content active">
                    <h2 className="tab-content-title">{t('form-members-balances')}</h2>

                    {group.members.length > 0 ? (
                        <ul>
                            {group.members.map((member, index) => (
                                <li key={index}>
                                    {member.username}: {parseFloat(member.balance).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{t('error-balance-info')}</p>
                    )}

                    <div className="suggested-movements">
                        <Link to={`/group/${group.id}/movements`} className="suggested-movements-button">
                            {t('movements-button')}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Group;
