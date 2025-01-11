import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/components/Expense.css"; // Asegúrate de importar el CSS

const Expense = () => {
  const { id, expenseId } = useParams();
  const [expense, setExpense] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await api.get(`/group/${id}/expense/${expenseId}`);
        setExpense(response.data); // Suponiendo que los detalles vienen en la clave `data`
      } catch (err) {
        setError("Failed to load expense details.");
      }
    };

    fetchExpenseDetails();
  }, [id, expenseId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!expense) {
    return <div className="loading-message">Loading expense details...</div>;
  }

  return (
    <div className="expense-main">
      <h1 className="expense-title">Expense Details</h1>

      <div className="expense-card">
        <div className="expense-card-header">
          <h2>{expense.description}</h2>
        </div>
        <div className="expense-card-body">
          <p>
            <strong>Total Amount:</strong> {expense.totalAmount} €
          </p>
          <p>
            <strong>Payer:</strong> {expense.payer}
          </p>
        </div>
      </div>

      <div className="expense-card">
        <div className="expense-card-header">
          <h2>Participants</h2>
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
