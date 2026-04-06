import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Category() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function formatCategoryName(category) {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        setProducts(result);
      } catch (err) {
        setError(err.message || "Failed to load category products");
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600">
        Home / Categories / {formatCategoryName(categoryName)}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-6 py-8">
            <p className="text-sm uppercase tracking-wide">Shop By Category</p>
            <h1 className="text-3xl font-bold mt-2">
              {formatCategoryName(categoryName)}
            </h1>
            <p className="text-sm mt-2 text-orange-50">
              Explore items picked from this category.
            </p>
          </div>

          <div className="px-4 py-4 border-b flex items-center justify-between">
            <p className="font-semibold text-lg">
              {formatCategoryName(categoryName)}
            </p>
            <p className="text-sm text-gray-500">
              {products.length} item{products.length === 1 ? "" : "s"}
            </p>
          </div>

          {loading && (
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`category-skeleton-${index}`}
                  className="bg-gray-100 p-4 rounded"
                >
                  <div className="h-40 bg-gray-200 rounded" />
                  <div className="mt-3 h-3 bg-gray-200 rounded" />
                  <div className="mt-2 h-3 w-20 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="p-6">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    navigate(`/details/${product.id}`, { state: { product } })
                  }
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-left"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-contain rounded"
                  />

                  <h2 className="mt-3 font-semibold line-clamp-2">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 mt-2">${product.price}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
