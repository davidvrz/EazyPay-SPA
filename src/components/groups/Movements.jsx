import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/components/Movements.css"; 
import { useTranslation } from "react-i18next";

const Movements = () => {
  const { groupId } = useParams(); 
  const [movements, setMovements] = useState([]);
  const [group, setGroup] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {t} = useTranslation();

  
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await api.get(`/group/${groupId}/movements`);
        const group_info = await api.get(`/group/${groupId}`);

        setMovements(response.data); 
        setGroup(group_info.data);
      } catch (err) {
        setError(t('error-load-movements'));
      } finally {
        setLoading(false); 
      }
    };

    fetchMovements();
  }, [groupId]);

  if (loading) {
    return <div className="loading-message">{t('loading')}</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main">
      <div className="top-icon">
          <img src="/images/isotype.png" alt="Groups Icon" />
      </div>

      <h1 className="main-title">{t('form-suggested-movements')}: {group.name}</h1>

      {movements.length > 0 ? (
        <ul className="movements-list">
          {movements.map((movement, index) => (
            <li key={index} className="movement-item">
              <span class="movement-payer">{movement.from}</span>
              <span class="movement-action">{t('movement_debts')}</span>
              <span class="movement-receiver">{movement.to}</span>
              <span class="movement-amount">{movement.amount} €</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t('error-movements-info')}</p>
      )}

      <div class="back-button">
        <button onClick={() => navigate(`/group/${groupId}`)}>{t('back-button')}</button>
      </div>
    </div>
  );
};

export default Movements;
