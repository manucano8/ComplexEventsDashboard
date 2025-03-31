import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventTable from '../components/EventTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

function EventList({ token }) {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState('');
  const [eventId, setEventId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`, {
          params: { startDate, endDate, eventId, type, page: currentPage },
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    }
    fetchEvents();
  }, [startDate, endDate, eventId,  type, currentPage, token]);

  return (
    <div>
      <Filters startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} eventId={eventId} setEventId={setEventId} type={type} setType={setType} />
      <EventTable data={events} type={type} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default EventList;