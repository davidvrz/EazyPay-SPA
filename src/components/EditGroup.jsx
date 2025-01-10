import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api"; // Asegúrate de que la ruta es correcta
import "../styles/components/AddGroup.css";

const EditGroup = () => {
  const { id } = useParams(); // Obtén el ID del grupo desde la URL
  const navigate = useNavigate(); // Para redirigir después de la actualización

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});

  // Cargar los detalles del grupo al montar el componente
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await api.get(`/group/${id}`);
        setName(response.data.name);
        setDescription(response.data.description);

        // Mapear solo los usernames de los miembros
        setMembers(response.data.members.map((member) => member.username));
      } catch (err) {
        setErrors({ general: "Failed to load group data." });
      }
    };

    fetchGroupData();
  }, [id]);

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = { name, description, members };

    try {
      const response = await api.put(`/group/${id}`, data); // Usamos PUT para actualizar el grupo

      if (response.errors) {
        setErrors(response.errors);
      } else {
        alert("Group updated successfully!");
        //navigate(`/group/${id}`); 
        navigate("/home");
      }
    } catch (err) {
      setErrors({ general: "An error occurred while updating the group." });
    }
  };

  return (
    <div className="main">
      <div className="top-icon">
        <img src="/images/isotype.png" alt="Groups Icon" />
      </div>

      <h1 className="main-title">Edit Group</h1>

      <form onSubmit={handleSubmit} id="group-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="error-message">{errors.name}</div>

        <label>
          Description:
          <textarea
            name="description"
            rows="4"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <div className="error-message">{errors.description}</div>

        <div id="members-container">
          <label>Participants:</label>
          {members.map((member, index) => (
            <div className="member-input" key={index}>
              <input
                type="text"
                name="members[]"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                readOnly={index === 0} // No permitir editar el primer miembro
              />
              {index > 0 && (
                <button
                  type="button"
                  className="remove-participant"
                  onClick={() => handleRemoveMember(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="button" id="add-participant" onClick={handleAddMember}>
          Add Participant
        </button>
        <div className="error-message">{errors.members}</div>

        <button type="submit">Update Group</button>
        {errors.general && <div className="error-message">{errors.general}</div>}
      </form>
    </div>
  );
};

export default EditGroup;
