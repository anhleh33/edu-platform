function CartItem({ item, isSelected, onToggleSelect, onRemove }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(item.id)}
        style={{ marginRight: '10px' }}
      />
      <img
        src={item.image}
        alt={item.title}
        style={{ width: 60, height: 60, objectFit: 'cover', marginRight: '10px' }}
      />
      <div style={{ flexGrow: 1 }}>
        <strong>{item.title}</strong>
        <p><b>Số lượng:</b> {item.quantity}</p>
        <p><b>Giá:</b> {item.price.toLocaleString()}₫</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="btn-delete"
        style={{
          color: 'red',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '20px',
          marginRight: '20px',
        }}
        title="Xoá sản phẩm"
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
}

export default CartItem;
