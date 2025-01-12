import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/components/Expense.css";
import { useTranslation } from "react-i18next";

const Expense = () => {
  const { id, expenseId } = useParams();
  const [expense, setExpense] = useState(null);
  const [error, setError] = useState("");
  const {t} = useTranslation();

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await api.get(`/group/${id}/expense/${expenseId}`);
        setExpense(response.data); 
      } catch (err) {
        setError(t('error-load-expense'));
      }
    };

    fetchExpenseDetails();
  }, [id, expenseId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!expense) {
    return <div className="loading-message">{t('loading')}</div>;
  }

  return (
    <div className="main">
      <div className="top-icon">
        <img src="/images/isotype.png" alt="Groups Icon" />
      </div>

      <h1 className="main-title">{t('form-expense-details')}</h1>

      <div className="expense-container">
        <div className="expense-card-body">
          <p>
            <strong>{t('form-expense-description')}:</strong> {expense.description}
          </p>
          <p>
            <strong>{t('form-expense-total-amount')}:</strong> {expense.totalAmount} €
          </p>
          <p>
            <strong>{t('form-expense-payer')}:</strong> {expense.payer}
          </p>
        </div>

        <div className="expense-card-header">
          <h3>{t('form-expense-participants')}</h3>
        </div>
        <div className="expense-card-body">
          <ul className="expense-participant-list">
            {expense.participants.map(({ username, amount }) => (
              <li key={username} className="expense-participant-item">
                {username}: {amount} €
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Expense;
