import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='pagination-container'>
      <button className='pagination-button' disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous Page
      </button>
      <span className='pagination-info'>
        Page {currentPage} of {totalPages}
      </span>
      <button  className='pagination-button'disabled={currentPage === totalPages || totalPages === 0} onClick={() => onPageChange(currentPage + 1)}>
        Next Page
      </button>
    </div>
  );
}

export default Pagination;