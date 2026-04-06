import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 5);

  function formatCategoryName(categoryName) {
    return categoryName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);

        if (!productsResponse.ok) {
          throw new Error(`HTTP ${productsResponse.status}`);
        }

        if (!categoriesResponse.ok) {
          throw new Error(`HTTP ${categoriesResponse.status}`);
        }

        const productsResult = await productsResponse.json();
        const categoriesResult = await categoriesResponse.json();

        setProducts(productsResult);
        setCategories(categoriesResult);

        setSelectedProduct((prev) => prev || productsResult[0] || null);
      } catch (err) {
        setError(err.message || "Failed to load Products");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (featuredProducts.length === 0) return;

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 3000);

    return () => clearInterval(slideTimer);
  }, [featuredProducts]);

  function goToNextSlide() {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  }

  function goToPreviousSlide() {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  }

  return (
    <div className="bg-gray-1 00">
      <div className="bg-orange-500 text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <span className="font-semibold">Call to order: 0700-600-0000</span>
          <span>Sell on Fake Store</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading && (
          <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-2 bg-gray-200 rounded h-64" />
              <div className="lg:col-span-7 bg-gray-200 rounded h-64" />
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-gray-200 rounded h-28" />
                <div className="bg-gray-200 rounded h-28" />
              </div>
            </div>

            <div className="bg-white rounded shadow">
              <div className="px-4 py-3 border-b">
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`flash-skeleton-${index}`}
                    className="bg-gray-100 p-3 rounded"
                  >
                    <div className="h-24 bg-gray-200 rounded" />
                    <div className="mt-2 h-3 bg-gray-200 rounded" />
                    <div className="mt-2 h-3 w-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded shadow">
              <div className="px-4 py-3 border-b">
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`top-skeleton-${index}`}
                    className="bg-gray-100 p-3 rounded"
                  >
                    <div className="h-24 bg-gray-200 rounded" />
                    <div className="mt-2 h-3 bg-gray-200 rounded" />
                    <div className="mt-2 h-3 w-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded shadow">
              <div className="px-4 py-3 border-b">
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`more-skeleton-${index}`}
                    className="bg-gray-100 p-4 rounded"
                  >
                    <div className="h-40 bg-gray-200 rounded" />
                    <div className="mt-3 h-3 bg-gray-200 rounded" />
                    <div className="mt-2 h-3 w-20 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-2 bg-white rounded shadow p-3 text-sm">
                <p className="font-semibold mb-2">Categories</p>
                <ul className="space-y-2 text-gray-700">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        to={`/category/${encodeURIComponent(category)}`}
                        className="block hover:text-orange-500 transition"
                      >
                        {formatCategoryName(category)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7 bg-white rounded shadow overflow-hidden">
                {featuredProducts.length > 0 && (
                  <div className="relative h-64 md:h-72 bg-gradient-to-r from-orange-100 via-white to-orange-50">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.18),_transparent_35%)]" />

                    <div className="relative h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-10">
                      <div className="pr-0 md:pr-6 text-center md:text-left">
                        <p className="text-xs font-semibold tracking-[0.3em] text-orange-500 uppercase">
                          Featured Product
                        </p>
                        <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900 line-clamp-2">
                          {featuredProducts[currentSlide].title}
                        </h2>
                        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                          {featuredProducts[currentSlide].description}
                        </p>
                        <div className="mt-5 flex items-center justify-center md:justify-start gap-3">
                          <p className="text-2xl font-bold text-orange-600">
                            ${featuredProducts[currentSlide].price}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProduct(featuredProducts[currentSlide]);
                              navigate(
                                `/details/${featuredProducts[currentSlide].id}`,
                                { state: { product: featuredProducts[currentSlide] } }
                              );
                            }}
                            className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded hover:bg-orange-600 transition"
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center justify-center">
                        <img
                          src={featuredProducts[currentSlide].image}
                          alt={featuredProducts[currentSlide].title}
                          className="h-52 w-full object-contain transition duration-500"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={goToPreviousSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow hover:bg-white transition"
                    >
                      {"<"}
                    </button>

                    <button
                      type="button"
                      onClick={goToNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow hover:bg-white transition"
                    >
                      {">"}
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {featuredProducts.map((product, index) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2.5 rounded-full transition ${
                            currentSlide === index
                              ? "w-6 bg-orange-500"
                              : "w-2.5 bg-orange-200 hover:bg-orange-300"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white rounded shadow p-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Exclusive Catalog Offers
                  </p>
                  <p className="text-orange-600 text-lg font-bold">Up to 80% Off</p>
                </div>
                <div className="bg-white rounded shadow p-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Awoof Deals
                  </p>
                  <p className="text-orange-600 text-lg font-bold">
                    Top Picks For You
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded shadow">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="font-semibold text-lg">Flash Sales</h2>
                <button type="button" className="text-orange-600 text-sm">
                  {/* See All */}
                </button>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.slice(0, 6).map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(product);
                      navigate(`/details/${product.id}`, { state: { product } });
                    }}
                    className="text-left"
                  >
                    <div className="bg-gray-50 p-3 rounded hover:shadow transition">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-24 object-contain"
                      />
                      <p className="mt-2 text-sm line-clamp-2">
                        {product.title}
                      </p>
                      <p className="text-orange-600 font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-white rounded shadow">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="font-semibold text-lg">Top Sellers</h2>
                <button type="button" className="text-orange-600 text-sm">
                  {/* See All */}
                </button>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.slice(6, 12).map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(product);
                      navigate(`/details/${product.id}`, { state: { product } });
                    }}
                    className="text-left"
                  >
                    <div className="bg-gray-50 p-3 rounded hover:shadow transition">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-24 object-contain"
                      />
                      <p className="mt-2 text-sm line-clamp-2">
                        {product.title}
                      </p>
                      <p className="text-orange-600 font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-white rounded shadow">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="font-semibold text-lg">More Products</h2>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(product);
                      navigate(`/details/${product.id}`, { state: { product } });
                    }}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 object-contain rounded"
                    />

                    <h2 className="mt-3 font-semibold">{product.title}</h2>

                    <p className="text-gray-500">${product.price}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
