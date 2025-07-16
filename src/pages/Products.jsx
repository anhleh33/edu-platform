import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ProductModal from '../components/ProductModal';
import ProductCard from '../components/ProductCard';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/Pagination';
import loadingTree from '../assets/loadingtree.png'

function Products() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('Tất cả');
    const [priceFilter, setPriceFilter] = useState('Tất cả');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const categories = ['Tất cả', 'Khóa học', 'Tài liệu', 'Lịch sử xem'];
    const priceRanges = ['Tất cả', 'Dưới 500K', '500K–1 triệu', 'Trên 1 triệu'];

    const filteredProducts = products.filter(p => {
        const isViewingHistory = filter === 'Lịch sử xem';
        const matchesCategory = isViewingHistory || filter === 'Tất cả' || p.category === filter;
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesPrice = true;
        if (priceFilter === 'Dưới 500K') {
            matchesPrice = p.price < 500000;
        } else if (priceFilter === '500K–1 triệu') {
            matchesPrice = p.price >= 500000 && p.price <= 1000000;
        } else if (priceFilter === 'Trên 1 triệu') {
            matchesPrice = p.price > 1000000;
        }

        return matchesCategory && matchesSearch && matchesPrice;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem('userEmail');
            if (filter === 'Lịch sử xem') {
                const history = JSON.parse(localStorage.getItem(`history_${email}`)) || [];
                setProducts(history);
            } else {
                try {
                    setLoading(true);
                    await new Promise(res => setTimeout(res, 1000));
                    const response = await fetch('https://edu-platform-3qfk.onrender.com/api/products');
                    if (!response.ok) {
                        toast.error('Lỗi tải dữ liệu sản phẩm');
                        throw new Error('Lỗi khi lấy dữ liệu sản phẩm');
                    }
                    const data = await response.json();
                    setProducts(data);
                } catch (error) {
                    toast.error('Lỗi tải dữ liệu sản phẩm');
                    console.error(error);
                }
                finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [filter]);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${email}`)) || [];
            setFavorites(storedFavorites);
        }
    }, []);

    return (
        <>
            <div className="product-part">
                <div className="products-container">
                    <div className="search-bar">
                        <h1>Sản Phẩm</h1>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="products-content">
                        <div className="tags">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setFilter(cat); setCurrentPage(1); }}
                                    className={`tag-btn ${filter === cat ? 'active' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <FilterDropdown
                            priceFilter={priceFilter}
                            setPriceFilter={setPriceFilter}
                            priceRanges={priceRanges}
                        />
                        {loading ? (
                            <div className="loading-spinner" style={{marginLeft: '100%', marginTop: '30px'}}>
                                <img src={loadingTree} alt="" />
                            </div>
                        ) : (
                            <>
                                <div className="product-list">
                                    {currentProducts.map((item) => (
                                        <ProductCard
                                            key={item.id}
                                            product={item}
                                            onViewDetail={(product) => {
                                                setSelectedProduct(product);
                                                setShowModal(true);

                                                const email = localStorage.getItem('userEmail');
                                                if (email) {
                                                    const historyKey = `history_${email}`;
                                                    const currentHistory = JSON.parse(localStorage.getItem(historyKey)) || [];

                                                    const alreadyExists = currentHistory.find(i => i.id === product.id);
                                                    let updatedHistory;

                                                    if (alreadyExists) {
                                                        updatedHistory = [product, ...currentHistory.filter(i => i.id !== product.id)];
                                                    } else {
                                                        updatedHistory = [product, ...currentHistory];
                                                        console.log("Đã lưu vào lịch sử:", product.title);
                                                    }

                                                    const limitedHistory = updatedHistory.slice(0, 10);
                                                    localStorage.setItem(historyKey, JSON.stringify(limitedHistory));
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))}
                                />
                            </>
                        )}


                    </div>
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
        </>
    );
}

export default Products;
