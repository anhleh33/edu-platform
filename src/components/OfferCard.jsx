function OfferCard({ image, title, description, linkText, onClick }) {
    return (
        <div className="offer-card">
            <img src={image} alt={title} className="offer-img" />
            <h3>{title}</h3>
            <p>{description}</p>
            <a href="#" className="offer-link" onClick={(e) => { e.preventDefault(); onClick(); }}>
                {linkText} <i className="fa-solid fa-chevron-right"></i>
            </a>
        </div>
    );
}

export default OfferCard;
