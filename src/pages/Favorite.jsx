import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';
import FavoriteTable from '../components/FavoriteTable';

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const productsPerPage = 4;

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${email}`)) || [];
      setFavorites(storedFavorites);
    } else {
      setFavorites([]);
    }
  }, []);

  const removeFavorite = (id) => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    if (window.confirm('Bạn có chắc muốn xóa sản phẩm khỏi danh sách yêu thích?')) {
      const updated = favorites.filter(item => item.id !== id);
      setFavorites(updated);
      localStorage.setItem(`favorites_${email}`, JSON.stringify(updated));
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
    }
  };

  const removeSelected = () => {
    if(selectedIds.length == 0){
      toast.info('Hãy chọn tối thiểu 1 sản phẩm');
      return;
    }
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    if (window.confirm('Bạn có chắc muốn xóa sản phẩm khỏi danh sách yêu thích?')) {
      const updated = favorites.filter(item => !selectedIds.includes(item.id));
      setFavorites(updated);
      localStorage.setItem(`favorites_${email}`, JSON.stringify(updated));
      setSelectedIds([]);
      toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
    }
  };

  return (
    <>
      <div className="favorite-box">
        <div className="favorite-container" >
          <h1>Danh sách yêu thích của bạn</h1>

          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm yêu thích..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <FavoriteTable
            favorites={favorites}
            productsPerPage={productsPerPage}
            searchTerm={searchTerm}
            onDetail={(item) => {
              setSelectedItem(item);
              setShowModal(true);
            }}
            onRemove={removeFavorite}
            onSelectionChange={setSelectedIds}
          />


          <button
            className='bulk-remove-btn'
            onClick={removeSelected}
          >
            <span>Xóa mục đã chọn ({selectedIds.length})</span>
          </button>
        </div>
      </div >
      {showModal && (
        <ProductModal
          product={selectedItem}
          onClose={() => setShowModal(false)}
          favorites={favorites}
          onFavoriteChange={setFavorites}
        />
      )}
    </>
  );
}

export default Favorite;
