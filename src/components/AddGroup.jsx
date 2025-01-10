import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/components/AddGroup.css";

const AddGroup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: [localStorage.getItem("username")],
  });
  const [errors, setErrors] = useState({});

  // Actualizar valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Añadir un nuevo miembro al grupo
  const handleAddMember = () => {
    setFormData({ ...formData, members: [...formData.members, ""] });
  };

  // Cambiar el valor de un miembro específico
  const handleMemberChange = (index, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = value;
    setFormData({ ...formData, members: updatedMembers });
  };

  // Eliminar un miembro del grupo
  const handleRemoveMember = (index) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index),
    });
  };

  // Enviar formulario para crear el grupo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await api.post("/group", formData);
      alert("Group created successfully!");
      navigate("/home"); 
    } catch (err) {
      setErrors(err.response?.data || { general: "An error occurred." });
    }
  };

  return (
    <div className="main">
      <div className="top-icon">
        <img src="/images/isotype.png" alt="Groups Icon" />
      </div>
      <h1 className="main-title">Create Group</h1>

      <form onSubmit={handleSubmit} id="group-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.name && <div className="error-message">{errors.name}</div>}

        <label>
          Description:
          <textarea
            name="description"
            rows="4"
            cols="50"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        {errors.description && (
          <div className="error-message">{errors.description}</div>
        )}

        <div id="members-container">
          <label>Participants:</label>
          {formData.members.map((member, index) => (
            <div className="member-input" key={index}>
              <input
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                readOnly={index === 0}
              />
              {index > 0 && (
                <button type="button" className="remove-participant" onClick={() => handleRemoveMember(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="button" id="add-participant" onClick={handleAddMember}>
          Add Participant
        </button>
        {errors.members && (
          <div className="error-message">{errors.members.join(", ")}</div>
        )}

        <button type="submit" id="create-group">
          Create Group
        </button>
        {errors.general && <div className="error-message">{errors.general}</div>}
      </form>
    </div>
  );
};

export default AddGroup;
