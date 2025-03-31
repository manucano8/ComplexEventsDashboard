const express = require('express');
const router = express.Router();
const Event = require('../models/ComplexEvent');

// Route to get filtered and paginated events
router.get('/', async (req, res) => {
  try {
    // Obtains query parameters (filters and pagination)
    const { startDate, endDate, eventId, type, page = 1, limit = 10 } = req.query;
    const filters = {};
    startDateParsed = new Date(startDate).getTime();
    endDateParsed = parseInt(new Date(endDate).getTime());

    // Applies date filters if provided
    if (startDate && endDate) {
      filters.dateOfOccurrence = { $gte: startDateParsed, $lte: endDateParsed};
    }

    // Filter by event ID
    if (eventId) {
      filters._id = eventId; 
    }

    // Apply type filter if provided
    if (type) {
      filters.typeOfEvent = type;
    }

    // Performs database query with filters and pagination
    const events = await Event.find(filters)
      .limit(limit * 1) // Limita el número de resultados por página
      .skip((page - 1) * limit) // Salta los resultados de las páginas anteriores
      .exec();

    // Gets the total number of events matching the filters
    const totalEvents = await Event.countDocuments(filters);

    // Sends the response with the events, the total number of pages and the current page.
    res.json({
      events,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: page,
    });
  } catch (error) {
    // Handles errors and sends an error response
    res.status(500).json({ message: error.message });
  }
});

//Route to obtain the different existing event types
router.get('/types', async (req, res) => {
  try {
    const types = await Event.distinct('typeOfEvent');
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;