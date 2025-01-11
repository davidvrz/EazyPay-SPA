import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api"; // Asegúrate de que la ruta de la API sea correcta
import '../styles/components/AddExpense.css';

const AddExpense = () => {
  const { id } = useParams(); // Obtén el ID del grupo desde la URL
  const navigate = useNavigate(); // Para redirigir después de agregar el gasto

  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [participantAmounts, setParticipantAmounts] = useState({});
  const [splitMethod, setSplitMethod] = useState("equitable");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await api.get(`/group/${id}`);
        setMembers(response.data.members);
        setSelectedMembers(response.data.members.map(member => member.username)); // Todos seleccionados por defecto
        setPayer(response.data.members[0].username);
      } catch (err) {
        setError("Failed to load group data.");
      }
    };

    fetchGroupMembers();
  }, [id]);

  // Calcular el monto de cada participante si se elige "Equitativo"
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

  // Manejar la selección de miembros
  const handleMemberChange = (username) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter((member) => member !== username)
        : [...prevSelected, username]
    );
  };

  // Manejar el cambio en el monto de un participante (solo en el caso de "manual")
  const handleAmountChange = (username, value) => {
    if (splitMethod === "manual") {
      const amount = Math.max(0, parseFloat(value) || 0); // Aseguramos que el monto no sea negativo
      setParticipantAmounts((prevAmounts) => ({
        ...prevAmounts,
        [username]: amount,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Preparamos el objeto participants en el formato correcto
    const participantsData = {};
    selectedMembers.forEach((username) => {
      participantsData[username] = participantAmounts[username] || "0.00"; // Aseguramos que todos los participantes tengan un monto
    });

    const expenseData = {
      description,
      totalAmount: totalAmount.toFixed(2), // Asegúrate de que el totalAmount esté en formato string con dos decimales
      payer,
      participants: participantsData, // Aquí enviamos los participantes en el formato correcto
    };

    try {
      const response = await api.post(`/group/${id}/expense`, expenseData);
      alert("Expense created successfully!");
      navigate(`/group/${id}`);
    } catch (err) {
      setError("Error creating the expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1>Add Expense to Group</h1>
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

        <button id="add-expense-button" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
