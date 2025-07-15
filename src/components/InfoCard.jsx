function InfoCard({ icon, title, detail }) {
    return (
        <div className="info-card">
            <i className={icon}></i>
            <h2>{title}</h2>
            <p>{detail}</p>
        </div>
    );
}

export default InfoCard;
