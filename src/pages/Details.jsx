import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        setProduct(result);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, product]);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="mb-4">No product selected.</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600">
        <Link to="/" className="hover:text-orange-500 transition">
          Home
        </Link>{" "}
        /{" "}
        <Link
          to={`/category/${encodeURIComponent(product.category || "category")}`}
          className="hover:text-orange-500 transition"
        >
          {product.category || "Category"}
        </Link>{" "}
        / {product.title}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <div className="bg-white rounded shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="border rounded p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-80 object-contain"
                />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`thumb-${index}`}
                    className="border rounded p-2 bg-gray-50"
                  >
                    <img
                      src={product.image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-16 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Brand: {product.category || "Brand"}
              </p>

              <div className="mt-3">
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500 line-through">$199.99</p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="bg-green-600 text-white px-2 py-1 rounded">
                  {product.rating?.rate || "4.1"} / 5
                </span>
                <span className="text-gray-500">
                  ({product.rating?.count || "0"} verified ratings)
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-700">
                {product.description}
              </p>

              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-5 w-full bg-orange-500 text-white py-3 rounded font-semibold hover:bg-orange-600 transition"
              >
                Add to cart
              </button>

              <div className="mt-4 border-t pt-4 text-sm">
                <p className="font-semibold text-gray-700">Promotions</p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>Call 0700-600-0000 to place your order</li>
                  <li>Enjoy cheaper shipping fees with Pickup Station</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg">Product details</h2>
            <p className="mt-3 text-sm text-gray-700">
              {product.description}
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold">Delivery & Returns</h3>
            <p className="text-sm text-gray-600 mt-2">
              Delivery fees shown at checkout. Free returns within 7 days for
              eligible items.
            </p>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold">Seller Information</h3>
            <p className="text-sm text-gray-600 mt-2">Fake Store Official</p>
            <button
              type="button"
              className="mt-3 w-full border border-orange-500 text-orange-500 py-2 rounded hover:bg-orange-50 transition"
            >
              Follow
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
