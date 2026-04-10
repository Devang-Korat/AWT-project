import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import CategoryCircle from "../../components/CategoryCircle";
import ProductCardAdmin from "../../components/ProductCardAdmin";

export default function AdminProducts() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // ✅ Fetch Categories
    const fetchCategories = async () => {
    try {
        const res = await API.get("/categories");

        const updatedCategories = res.data.map((cat) => ({
            ...cat,
            image: cat.image
                ? `http://localhost:5000${cat.image}`
                : "/no-image.png"   // ✅ fallback image
        }));

        setCategories(updatedCategories);

        if (updatedCategories.length > 0) {
            setSelectedCategory(updatedCategories[0]._id);
        }

    } catch (error) {
        console.log(error);
    }
};

    // ✅ Fetch Products
    const fetchProducts = async () => {
        try {
            const res = await API.get("/products");
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    // ✅ Filter Products
    const filteredProducts = products.filter(
        (p) =>
            p.categoryId?._id === selectedCategory ||
            p.categoryId === selectedCategory
    );

    // ✅ Delete Product
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;

        try {
            await API.delete(`/products/${id}`);

            setProducts((prev) =>
                prev.filter((p) => p._id !== id)
            );

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-light min-vh-100 pt-3">

            {/* CATEGORY BAR */}
            <div className="bg-dark py-4 mt-3">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center gap-4 flex-wrap">

                        {categories.map((cat) => (
                            <CategoryCircle
                                key={cat._id}
                                category={cat}   // ✅ FIXED (no double URL)
                                active={selectedCategory === cat._id}
                                onClick={() => setSelectedCategory(cat._id)}
                            />
                        ))}

                    </div>
                </div>
            </div>

            {/* HEADER */}
            <div className="container mt-4">

                <div className="d-flex justify-content-between mb-3">

                    <div>
                        <h3 className="fw-bold mb-0">Product Management</h3>
                        <small className="text-muted">
                            Manage shop products, pricing and stock
                        </small>
                    </div>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-outline-dark"
                            onClick={() => navigate("/admin/AddCategory")}
                        >
                            Add Category
                        </button>

                        <button
                            className="btn btn-dark"
                            onClick={() => navigate("/admin/AddProductForm")}
                        >
                            Add Product
                        </button>

                    </div>

                </div>

                {/* PRODUCT GRID */}
                <div className="row g-4">

                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCardAdmin
                                key={product._id}
                                product={product}
                                onDelete={() => deleteProduct(product._id)}
                                refreshProducts={fetchProducts}
                            />
                        ))
                    ) : (
                        <p className="text-center text-muted">
                            No products found
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}