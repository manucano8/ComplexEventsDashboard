import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Logout from './Logout';
import './Filters.css';

function Filters({ startDate, setStartDate, endDate, setEndDate, type, setType, eventId, setEventId, token }) { // Agrega token como prop
  const [eventTypes, setEventTypes] = useState([]);
  const today = Date();

  useEffect(() => {
    async function fetchEventTypes() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/types`, { // Usa axios.get()
          headers: { Authorization: `Bearer ${token}` }, // Agrega el encabezado de autorización
        });
        setEventTypes(response.data); // Usa response.data para obtener los datos
      } catch (error) {
        console.error('Error fetching event types:', error);
        setEventTypes([]);
      }
    }

    fetchEventTypes();
  }, [token]); // Agrega token como dependencia de useEffect

  return (
    <div className="filters-container">
      <DatePicker popperPlacement="right-start" showYearDropdown scrollableYearDropdown selected={startDate} maxDate={endDate || today} onChange={setStartDate} placeholderText="Start Date" />
      <DatePicker selected={endDate} showYearDropdown scrollableYearDropdown onChange={setEndDate} minDate={startDate} maxDate={today} placeholderText="End Date" />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        {eventTypes.map((eventType) => (
          <option key={eventType} value={eventType}>
            {eventType}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Complex Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <div className="logout-container">
        <Logout /> {}
      </div>
    </div>
  );
}

export default Filters;