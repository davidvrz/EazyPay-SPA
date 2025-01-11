import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/components/AddExpense.css";

const EditExpense = () => {
  const { id, expenseId } = useParams(); 
  const navigate = useNavigate();

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
        setError("Failed to load group members.");
      }
    };

    const fetchExpenseDetails = async () => {
      try {
        const response = await api.get(`/group/${id}/expense/${expenseId}`);
        const expense = response.data;

        setDescription(expense.description);
        setTotalAmount(expense.totalAmount);
        setPayer(expense.payer);
        setParticipantAmounts(expense.participants);
        setSelectedMembers(Object.keys(expense.participants));
        setSplitMethod("manual");
      } catch {
        setError("Failed to load expense details.");
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

    const participantsData = {};
    selectedMembers.forEach((username) => {
      participantsData[username] = participantAmounts[username] || "0.00";
    });

    const expenseData = {
      description,
      totalAmount: parseFloat(totalAmount).toFixed(2),
      payer,
      participants: participantsData,
    };

    try {
      await api.put(`/group/${id}/expense/${expenseId}`, expenseData);
      alert("Expense updated successfully!");
      navigate(`/group/${id}`);
    } catch {
      setError("Error updating the expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1>Edit Expense</h1>
      {error && <p className="error">{error}</p>}

      <form id="expense-form" onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Total Amount:
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Math.max(0, e.target.value))}
            required
          />
        </label>

        <label>
          Payer:
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

        <label>Split Method:</label>
        <div>
          <label>
            <input
              type="radio"
              name="splitMethod"
              value="equitable"
              checked={splitMethod === "equitable"}
              onChange={() => setSplitMethod("equitable")}
            />
            Equitable
          </label>
          <label>
            <input
              type="radio"
              name="splitMethod"
              value="manual"
              checked={splitMethod === "manual"}
              onChange={() => setSplitMethod("manual")}
            />
            Manual
          </label>
        </div>

        <div className="participants">
          <h3>Participants</h3>
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
          {loading ? "Updating..." : "Update Expense"}
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
