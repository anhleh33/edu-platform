function ProductCard({ product, onViewDetail }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.shortDesc}</p>
            <div className="overlay">
                <button onClick={() => onViewDetail(product)}>Xem chi tiết</button>
            </div>
        </div>
    );
}

export default ProductCard;
