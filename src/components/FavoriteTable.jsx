import { useEffect, useState } from 'react';
import Pagination from './Pagination';

function FavoriteTable({ favorites, productsPerPage, searchTerm, onDetail, onRemove, onSelectionChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const filtered = favorites.filter(fav =>
    fav.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  useEffect(() => {
    setSelectedIds([]);
    onSelectionChange([]);
    setCurrentPage(1);
  }, [favorites, searchTerm]);

  const toggleSelect = (id) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter(i => i !== id)
      : [...selectedIds, id];
    setSelectedIds(updated);
    onSelectionChange(updated);
  };

  const toggleSelectAll = () => {
    const allSelected = selectedIds.length === filtered.length;
    const updated = allSelected ? [] : filtered.map(item => item.id);
    setSelectedIds(updated);
    onSelectionChange(updated);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedIds.length === filtered.length && filtered.length > 0}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr><td colSpan="5">Không có sản phẩm yêu thích nào.</td></tr>
          ) : (
            currentItems.map(item => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
                <td><img src={item.image} alt={item.title} /></td>
                <td>{item.title}</td>
                <td>{item.price === 0 ? 'Miễn phí' : item.price.toLocaleString('vi-VN') + 'đ'}</td>
                <td>
                  <button className="detail-btn" onClick={() => onDetail(item)}>
                    <i className="fa-solid fa-circle-info"></i> Chi tiết
                  </button>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>
                    <i className="fa-solid fa-trash"></i> Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}

export default FavoriteTable;
