import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/components/Movements.css"; 
import { useTranslation } from "react-i18next";

const Movements = () => {
  const { groupId } = useParams(); 
  const [movements, setMovements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();

  
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await api.get(`/group/${groupId}/movements`);
        setMovements(response.data); 
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
    <div className="movements-main">
      <h1 className="movements-title">{t('form-suggested-movements')}</h1>

      {movements.length > 0 ? (
        <ul className="movements-list">
          {movements.map((movement, index) => (
            <li key={index} className="movement-item">
              <strong>{movement.from}</strong> {t('movement_debts')} <strong>{movement.to}</strong>:
              {movement.amount} €
            </li>
          ))}
        </ul>
      ) : (
        <p>{t('error-movements-info')}</p>
      )}
    </div>
  );
};

export default Movements;
