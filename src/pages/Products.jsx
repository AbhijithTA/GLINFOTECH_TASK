// src/pages/Products.jsx
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch products + categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Filter products by search + category
  useEffect(() => {
    let data = [...products];
    if (search) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "all") {
      data = data.filter((p) => p.category === category);
    }
    setFiltered(data);
  }, [search, category, products]);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 border px-3 py-2 rounded-lg"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/4 border px-3 py-2 rounded-lg"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mb-4"
              />
              <h2 className="text-sm font-semibold mb-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-blue-600 font-bold text-lg">
                ${product.price}
              </p>
              <p className="text-xs text-gray-500 mt-1 capitalize">
                {product.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
