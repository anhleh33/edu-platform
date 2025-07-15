import { toast } from 'react-toastify';

function ProductModal({ product, onClose, favorites, onFavoriteChange }) {
    if (!product) return null;

    const isFavorite = favorites.some(item => item.id === product.id);

    const toggleFavorite = () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                toast.error("Vui lòng đăng nhập để sử dụng chức năng yêu thích.");
                return;
            }

            const storageKey = `favorites_${userEmail}`;
            let currentFavorites = JSON.parse(localStorage.getItem(storageKey)) || [];

            let updatedFavorites;

            if (isFavorite) {
                if (window.confirm('Bạn có chắc muốn gỡ sản phẩm khỏi danh sách?')) {
                    updatedFavorites = currentFavorites.filter(item => item.id !== product.id);
                    toast.info("Đã gỡ khỏi danh sách yêu thích!");
                }
            } else {
                updatedFavorites = [...currentFavorites, product];
                toast.success("Đã thêm vào danh sách yêu thích!");
            }

            localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
            onFavoriteChange(updatedFavorites);
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    const addToCart = () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng.");
                return;
            }

            const cartKey = `cart_${userEmail}`;
            let currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];

            const isAlreadyInCart = currentCart.some(item => item.id === product.id);
            if (isAlreadyInCart) {
                toast.info("Sản phẩm đã có trong giỏ hàng.");
                return;
            }

            const updatedCart = [...currentCart, { ...product, quantity: 1 }];
            localStorage.setItem(cartKey, JSON.stringify(updatedCart));
            toast.success("Đã thêm vào giỏ hàng!");
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error(error);
            toast.error("Không thể thêm vào giỏ hàng.");
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
                <p><strong>Loại:</strong> {product.category}</p>
                <p><strong>Chi tiết:</strong> {product.fullDesc}</p>
                <p><strong>Giá:</strong> {product.price.toLocaleString()}₫</p>

                <div className="modal-actions">
                    <button
                        className={`btn-primary btn-favor ${isFavorite ? 'favorited' : ''}`}
                        onClick={toggleFavorite}
                    >
                        <span>
                            <i className={`fa-heart ${isFavorite ? 'fa-solid' : 'fa-regular'}`}></i>
                            {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
                        </span>
                    </button>

                    <button
                        className="btn-primary btn-cart"
                        onClick={addToCart}
                    >
                        <i className="fa-solid fa-cart-plus"></i> <span>Thêm vào giỏ</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
