import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api"; 
import "../../styles/components/AddGroup.css";
import { useTranslation } from "react-i18next";

const EditGroup = () => {
  const { id } = useParams(); // Obtén el ID del grupo desde la URL
  const navigate = useNavigate(); // Para redirigir después de la actualización
  const {t} = useTranslation();

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
        setErrors({ general: t('error-load-group') });
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
        alert(t('msg-update-group'));
        navigate(`/group/${id}`); 
      }
    } catch (err) {
      setErrors({ general: t('error-update-group')});
    }
  };

  return (
    <div className="main">
      <div className="top-icon">
        <img src="/images/isotype.png" alt="Groups Icon" />
      </div>

      <h1 className="main-title">{t('form-edit-group')}</h1>

      <form onSubmit={handleSubmit} id="group-form">
        <label>
          {t('form-group-name')}
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="error-message">{errors.name}</div>

        <label>
          {t('form-group-description')}
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
          <label>{t('form-group-participants')}</label>
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
                  {t('delete-button')}
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="button" id="add-participant" onClick={handleAddMember}>
          {t('form-add-participants')}
        </button>
        <div className="error-message">{errors.members}</div>

        <button type="submit">{t('form-update-group')}</button>
        {errors.general && <div className="error-message">{errors.general}</div>}
      </form>
    </div>
  );
};

export default EditGroup;
