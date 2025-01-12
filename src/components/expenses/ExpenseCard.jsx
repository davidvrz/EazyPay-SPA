import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/ExpenseCard.css";
import { useTranslation } from "react-i18next";

const ExpenseCard = ({ expense, group, onDelete }) => {
  const {t} = useTranslation();

  return (
    <div className="expense-card-container">
      <div className="expense-card">
        <Link to={`/group/${group.id}/expense/${expense.id}`} className="expense-info-btn">
          <div className="expense-info">
            <h3>{expense.description}</h3>
            <p>
              {expense.payer} {t('expense_payment')} {expense.total_amount}
            </p>
          </div>
        </Link>
        <div className="expense-actions">
          <Link to={`/group/${group.id}/editexpense/${expense.id}`} className="edit-btn">
            {t('edit-button')}
          </Link>
          <button className="delete-btn" onClick={() => onDelete(expense.id)}>
            {t('delete-button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
