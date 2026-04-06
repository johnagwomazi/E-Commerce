function CartItem({ item, onRemove, onUpdateQuantity }) {
  function handleDecrease() {
    onUpdateQuantity?.(item.id, item.quantity - 1);
  }

  function handleIncrease() {
    onUpdateQuantity?.(item.id, item.quantity + 1);
  }

  return (
    <div className="bg-white rounded shadow p-4 flex gap-4">
      <div className="w-24 h-24 border rounded p-2 bg-gray-50">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1">
        <p className="font-semibold">{item.title}</p>
        <p className="text-sm text-gray-500 mt-1">Sold by Fake store</p>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={handleDecrease}
            className="w-8 h-8 border rounded hover:bg-gray-100 transition"
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button
            type="button"
            onClick={handleIncrease}
            className="w-8 h-8 border rounded hover:bg-gray-100 transition"
            aria-label="Increase quantity"
          >
            +
          </button>

          <button
            type="button"
            onClick={() => onRemove?.(item.id)}
            className="ml-4 text-sm text-red-600 hover:text-red-700 transition"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">${item.price}</p>
        <p className="text-sm text-gray-500">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CartItem;
