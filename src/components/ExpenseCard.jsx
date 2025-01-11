import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/ExpenseCard.css";

const ExpenseCard = ({ expense, group, onDelete }) => {
  return (
    <Link to={`/group/${group.id}/expense/${expense.id}`} className="expense-info-btn">
      <div className="expense-card">
        <div className="expense-info">
          <h3>{expense.description}</h3>
          <p>
            {expense.payer} paid {expense.total_amount}
          </p>
        </div>
        <div className="expense-actions">
          {(
            <>
              <Link to={`/editexpense/${group.id}/expense/${expense.id}`} className="edit-btn">
                Edit
              </Link>
              <button className="delete-btn" onClick={() => onDelete(expense.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ExpenseCard;
