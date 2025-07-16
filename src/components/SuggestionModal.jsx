import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from '../components/ProductModal';

function SuggestionModal({ suggestions, onClose }) {
    const [showModal, setShowModal] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2><i class="fa-solid fa-circle-check" style={{ marginRight: '10px' }}></i>Gợi ý sản phẩm</h2>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>
                <div className="modal-body">
                    {suggestions.length === 0 ? (
                        <p>Không có sản phẩm gợi ý.</p>
                    ) : (
                        <div className="product-grid">
                            {suggestions.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onViewDetail={(product) => {
                                        setSelectedProduct(product);
                                        setShowModal(true);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <ProductModal
                    product={selectedProduct}
                    favorites={favorites}
                    onFavoriteChange={setFavorites}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default SuggestionModal;
