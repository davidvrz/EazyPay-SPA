import React, { useState } from "react";
import '../styles/components/AddGroup.css';

const AddGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState(["currentuser"]); // Incluye el usuario actual por defecto
  const [errors, setErrors] = useState({});

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
    setErrors({}); // Limpiar errores previos

    const data = { name, description, members };

    try {
      const response = await fetch("http://localhost:80/rest/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
      } else {
        alert("Group created successfully!");
        // Redirigir o limpiar formulario
        setName("");
        setDescription("");
        setMembers(["currentuser"]);
      }
    } catch (err) {
      setErrors({ general: "An error occurred while creating the group." });
    }
  };

  return (
    <div className="main">
      <div className="top-icon">
        <img src="images/isotype.png" alt="Groups Icon" />
      </div>

      <h1 className="main-title">Create Group</h1>

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
                readOnly={index === 0} // El primer miembro (usuario actual) es de solo lectura
              />
              {index > 0 && (
                <button
                  type="button"
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

        <button type="submit">Create Group</button>
        {errors.general && <div className="error-message">{errors.general}</div>}
      </form>
    </div>
  );
};

export default AddGroup;
