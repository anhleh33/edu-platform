import { useEffect, useState } from 'react';
import ProductModal from '../components/ProductModal';
import CartItem from '../components/CartItem';
import '../CartModal.css';
import { toast } from 'react-toastify';

function CartModal({ onClose }) {
    const [cartItems, setCartItems] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            const cartData = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
            setCartItems(cartData);
        }
    }, []);

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === cartItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(cartItems.map(item => item.id));
        }
    };

    const totalPrice = cartItems
        .filter(item => selectedIds.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (selectedIds.length === 0) {
            toast.info("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán.");
            return;
        }
        toast.success(`Thanh toán cho ${selectedIds.length} sản phẩm, tổng cộng: ${totalPrice.toLocaleString()}₫`);
    };

    const handleRemoveItem = (id) => {
        try {
            if (window.confirm('Bạn có muốn xóa sản phẩm khỏi giỏ hàng?')) {
                const updatedCart = cartItems.filter(item => item.id !== id);
                setCartItems(updatedCart);
                setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));

                const email = localStorage.getItem('userEmail');
                if (email) {
                    localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
                }
                toast.success("Đã xoá sản phẩm khỏi giỏ hàng.");
                window.dispatchEvent(new Event('cartUpdated'));
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Không thể xóa khỏi giỏ hàng.");
        }
    };


    return (
        <div className="cart-backdrop" onClick={onClose}>
            <div className="cart-content cart-modal" onClick={e => e.stopPropagation()}>
                <h2><i class="fa-solid fa-cart-shopping" style={{ marginRight: '15px' }}></i>Giỏ hàng của bạn</h2>
                {cartItems.length === 0 ? (
                    <p>Không có sản phẩm trong giỏ hàng.</p>
                ) : (
                    <>
                        <div style={{ marginBottom: '10px', marginLeft: '28px' }}>
                            <input
                                type="checkbox"
                                checked={selectedIds.length === cartItems.length}
                                onChange={toggleSelectAll}
                                id="select-all"
                            />
                            <label htmlFor="select-all" style={{ marginLeft: '8\px', cursor: 'pointer', fontSize: '20px' }}>Chọn tất cả</label>
                        </div>
                        <ul>
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    isSelected={selectedIds.includes(item.id)}
                                    onToggleSelect={toggleSelect}
                                    onRemove={handleRemoveItem}
                                />
                            ))}
                        </ul>
                        <h3>Tổng cộng: {totalPrice.toLocaleString()}₫</h3>
                        <button onClick={handleCheckout} className="btn-primary" style={{ marginBottom: '15px', marginLeft: '78%', fontSize: '17px' }}>
                            <span>Thanh toán</span>
                        </button>
                        {showModal && (
                            <ProductModal
                                product={selectedItem}
                                onClose={() => setShowModal(false)}
                                favorites={favorites}
                                onFavoriteChange={setFavorites}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CartModal;
