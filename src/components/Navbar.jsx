import { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaQuestionCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <div className="border-b bg-white">
        <div className="bg-gray-100 text-xs">
          <div className="max-w-6xl mx-auto px-4 py-1 flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-700">
              <span className="font-semibold">Sell on Fake Store</span>
              <span className="hidden sm:inline">Send Your Packages</span>
            </div>
            <div className="text-gray-700 font-semibold">
              CALL TO ORDER 02018883300, 0700-600-0000
            </div>
          </div>
        </div>

        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            FAKE STORE
          </Link>

          <div className="flex-1 hidden md:block">
            <div className="flex items-center border rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search products, brands and categories"
                className="w-full px-3 py-2 text-sm outline-none"
              />
              <button
                type="button"
                className="bg-orange-500 text-white px-4 py-2 text-sm font-semibold hover:bg-orange-600 transition"
              >
                SEARCH
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <button
              type="button"
              className="flex items-center gap-2 hover:text-orange-500 transition"
            >
              <FaUser />
              <span>Account</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 hover:text-orange-500 transition"
            >
              <FaQuestionCircle />
              <span>Help</span>
            </button>
            <Link
              to="/cart"
              className="flex items-center gap-2 hover:text-orange-500 transition"
            >
              <span className="relative">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </span>
              <span>Cart</span>
            </Link>
          </div>

          <div
            className="md:hidden text-2xl cursor-pointer text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </nav>

        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search products, brands and categories"
              className="w-full px-3 py-2 text-sm outline-none"
            />
            <button
              type="button"
              className="bg-orange-500 text-white px-4 py-2 text-sm font-semibold hover:bg-orange-600 transition"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 py-4 border-b bg-white text-gray-700 px-4">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-orange-500"
          >
            <FaUser /> Account
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-orange-500"
          >
            <FaQuestionCircle /> Help
          </button>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-orange-500"
          >
            <span className="relative">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
            Cart
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
