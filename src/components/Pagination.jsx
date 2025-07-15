function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="page-btn btn-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`page-btn ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="page-btn btn-prev"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
