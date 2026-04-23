import CartItem from "./CartItem";
import { useCart } from "./CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-4">Cart ({cartItems.length})</h1>

        {cartItems.length === 0 && (
          <div className="bg-white rounded shadow p-6 text-center">
            <p className="text-gray-600">Your cart is empty.</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded shadow p-4">
                <h2 className="font-semibold text-lg">Cart Summary</h2>
                <div className="mt-4 space-y-3 text-sm">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between">
                      <div className="mr-2">
                        <p className="font-medium line-clamp-2">{item.title}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="mt-4 p-3 rounded bg-orange-50 border border-orange-200 flex items-center justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-orange-600">
                    ${subTotal.toFixed(2)}
                  </span>
                </div>
               <button
                  type="button"
                  onClick={() => {
                    const phoneNumber = "2349158524386"; // Nigeria format (remove leading 0)

                    if (cartItems.length === 0) {
                      alert("Your cart is empty");
                      return;
                    }

                    const itemsMessage = cartItems
                      .map(
                        (item) =>
                          `${item.title} (x${item.quantity}) - $${(
                            item.price * item.quantity
                          ).toFixed(2)}`
                      )
                      .join("\n");

                    const total = cartItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    );

                    const message = `*New Order* \n\n${itemsMessage}\n\n Total: $${total.toFixed(
                      2
                    )}`;

                    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;

                    window.open(whatsappURL, "_blank");
                  }}
                  className="w-full mt-4 bg-orange-500 text-white py-3 rounded font-semibold hover:bg-orange-600 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
