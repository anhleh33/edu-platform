import ProductCard from './ProductCard';

function SuggestionModal({ suggestions, onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2><i class="fa-solid fa-circle-check" style={{marginRight: '10px'}}></i>Gợi ý sản phẩm</h2>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>
                <div className="modal-body">
                    {suggestions.length === 0 ? (
                        <p>Không có sản phẩm gợi ý.</p>
                    ) : (
                        <div className="product-grid">
                            {suggestions.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SuggestionModal;
