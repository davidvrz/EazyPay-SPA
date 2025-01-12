import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../../styles/components/AddExpense.css";
import { useTranslation } from "react-i18next";

const EditExpense = () => {
  const { id, expenseId } = useParams(); 
  const navigate = useNavigate();
  const {t} = useTranslation();

  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [participantAmounts, setParticipantAmounts] = useState({});
  const [splitMethod, setSplitMethod] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await api.get(`/group/${id}`);
        setMembers(response.data.members);
      } catch {
        setError(t('error-load-group'));
      }
    };

    const fetchExpenseDetails = async () => {
      try {
        const response = await api.get(`/group/${id}/expense/${expenseId}`);
        const expense = response.data;

        setDescription(expense.description);
        setTotalAmount(expense.totalAmount);
        setPayer(expense.payer);

        // Transformar array de participantes a un objeto
        const participantAmountsObj = expense.participants.reduce((acc, participant) => {
          acc[participant.username] = participant.amount;
          return acc;
        }, {});

        setParticipantAmounts(participantAmountsObj);
        console.log(participantAmounts);
        setSelectedMembers(expense.participants.map(participant => participant.username));
        console.log(selectedMembers);
        setSplitMethod("manual");
      } catch {
        setError(t('error-load-expense'));
      }
    };

    fetchGroupMembers();
    fetchExpenseDetails();
  }, [id, expenseId]);

  useEffect(() => {
    if (splitMethod === "equitable" && totalAmount) {
      const numParticipants = selectedMembers.length;
      const amountPerParticipant = (parseFloat(totalAmount) / numParticipants).toFixed(2);
      setParticipantAmounts(
        selectedMembers.reduce((acc, username) => {
          acc[username] = amountPerParticipant;
          return acc;
        }, {})
      );
    }
  }, [splitMethod, selectedMembers, totalAmount]);

  const handleMemberChange = (username) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter((member) => member !== username)
        : [...prevSelected, username]
    );
  };

  const handleAmountChange = (username, value) => {
    if (splitMethod === "manual") {
      const amount = Math.max(0, parseFloat(value) || 0);
      setParticipantAmounts((prevAmounts) => ({
        ...prevAmounts,
        [username]: amount,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const participantsData = selectedMembers.reduce((acc, username) => {
      acc[username] = participantAmounts[username] || "0.00";
      return acc;
    }, {});

    const expenseData = {
      description,
      totalAmount: parseFloat(totalAmount).toFixed(2),
      payer,
      participants: participantsData,
    };

    try {
      await api.put(`/group/${id}/expense/${expenseId}`, expenseData);
      alert(t('msg-update-expense'));
      navigate(`/group/${id}`);
    } catch {
      setError(t('error-update-expense'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1>{t('form-edit-expense')}</h1>
      {error && <p className="error">{error}</p>}

      <form id="expense-form" onSubmit={handleSubmit}>
        <label>
          {t('form-expense-description')}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          {t('form-expense-total-amount')}
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Math.max(0, e.target.value))}
            required
          />
        </label>

        <label>
          {t('form-expense-payer')}
          <select
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
            required
          >
            {members.map((member) => (
              <option key={member.username} value={member.username}>
                {member.username}
              </option>
            ))}
          </select>
        </label>

        <label>{t('form-expense-split-mode')}</label>
        <div>
          <label>
            <input
              type="radio"
              name="splitMethod"
              value="equitable"
              checked={splitMethod === "equitable"}
              onChange={() => setSplitMethod("equitable")}
            />
            {t('split-mode-equitable')}
          </label>
          <label>
            <input
              type="radio"
              name="splitMethod"
              value="manual"
              checked={splitMethod === "manual"}
              onChange={() => setSplitMethod("manual")}
            />
            {t('split-mode-manual')}
          </label>
        </div>

        <div className="participants">
          <h3>{t('form-expense-participants')}</h3>
          {members.map((member) => (
            <div key={member.username} className="participant">
              <label>
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(member.username)}
                  onChange={() => handleMemberChange(member.username)}
                />
                {member.username}
              </label>
              {selectedMembers.includes(member.username) && (
                <input
                  type="number"
                  value={participantAmounts[member.username] || ""}
                  onChange={(e) => handleAmountChange(member.username, e.target.value)}
                  disabled={splitMethod === "equitable"}
                  required
                />
              )}
            </div>
          ))}
        </div>

        <button id="edit-expense-button" type="submit" disabled={loading}>
          {loading ? t('updating...') : t('form-update-expense')}
        </button>
      </form>

      <div className="back-button">
        <button onClick={() => navigate(`/group/${id}`)}>{t('back-button')}</button>
      </div>
    </div>
  );
};

export default EditExpense;
