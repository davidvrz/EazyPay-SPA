import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/ExpenseCard.css";

const ExpenseCard = ({ expense, group, onDelete }) => {
  return (
    <div className="expense-card-container">
      <div className="expense-card">
        <Link to={`/group/${group.id}/expense/${expense.id}`} className="expense-info-btn">
          <div className="expense-info">
            <h3>{expense.description}</h3>
            <p>
              {expense.payer} paid {expense.total_amount}
            </p>
          </div>
        </Link>
        <div className="expense-actions">
          <Link to={`/group/${group.id}/editexpense/${expense.id}`} className="edit-btn">
            Edit
          </Link>
          <button className="delete-btn" onClick={() => onDelete(expense.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
