import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AddProductForm() {

    const navigate = useNavigate();

    // ✅ Categories from DB
    const [categories, setCategories] = useState([]);

    // ✅ Form State
    const [form, setForm] = useState({
        name: "",
        brand: "",
        modelNumber: "",
        barcode: "",
        price: "",
        costPrice: "",
        stock: "",
        minStockAlert: "",
        description: "",
        categoryId: "",
        image: null
    });

    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ✅ Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await API.get("/categories");
                setCategories(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    // ✅ Handle Change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    // ✅ Handle Image
    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setForm({ ...form, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    // ✅ Validation
    const validate = () => {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Product name is required";
        }

        if (!form.categoryId) {
            newErrors.categoryId = "Category is required";
        }

        if (!form.price) {
            newErrors.price = "Price is required";
        } else if (form.price <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        if (form.description.length > 200) {
            newErrors.description = "Max 200 characters allowed";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Submit
    const submit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            await API.post("/products/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Product Added Successfully");
            navigate("/admin/ManageProducts");

        } catch (error) {
            setErrors({
                api: error.response?.data?.message || "Something went wrong"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow border-0">

                            {/* HEADER */}
                            <div className="card-header bg-dark text-white py-3">
                                <h4 className="mb-0 fw-bold">
                                    Add New Product
                                </h4>
                                <small className="text-light">
                                    Fill product information
                                </small>
                            </div>

                            <div className="card-body p-4">

                                {errors.api && (
                                    <div className="alert alert-danger">
                                        {errors.api}
                                    </div>
                                )}

                                <form onSubmit={submit}>
                                    <div className="row g-3">

                                        {/* IMAGE */}
                                        <div className="col-md-12 text-center">
                                            <label className="form-label fw-semibold">
                                                Product Image
                                            </label>

                                            {preview && (
                                                <div className="mb-2">
                                                    <img
                                                        src={preview}
                                                        alt="preview"
                                                        width="120"
                                                        className="rounded"
                                                    />
                                                </div>
                                            )}

                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={handleImage}
                                            />
                                        </div>

                                        {/* NAME */}
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Product Name
                                            </label>
                                            <input
                                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        </div>

                                        {/* CATEGORY */}
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Category
                                            </label>
                                            <select
                                                className={`form-control ${errors.categoryId ? "is-invalid" : ""}`}
                                                name="categoryId"
                                                value={form.categoryId}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">
                                                {errors.categoryId}
                                            </div>
                                        </div>

                                        {/* BRAND */}
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Brand
                                            </label>
                                            <input
                                                className="form-control"
                                                name="brand"
                                                value={form.brand}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* MODEL */}
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Model Number
                                            </label>
                                            <input
                                                className="form-control"
                                                name="modelNumber"
                                                value={form.modelNumber}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* BARCODE */}
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Barcode
                                            </label>
                                            <input
                                                className="form-control"
                                                name="barcode"
                                                value={form.barcode}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* PRICE */}
                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">
                                                Selling Price
                                            </label>
                                            <input
                                                type="number"
                                                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                                name="price"
                                                value={form.price}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.price}
                                            </div>
                                        </div>

                                        {/* COST */}
                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">
                                                Cost Price
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="costPrice"
                                                value={form.costPrice}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* STOCK */}
                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">
                                                Stock
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="stock"
                                                value={form.stock}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* MIN STOCK */}
                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">
                                                Min Stock Alert
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="minStockAlert"
                                                value={form.minStockAlert}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* DESCRIPTION */}
                                        <div className="col-md-12">
                                            <label className="form-label fw-semibold">
                                                Description
                                            </label>
                                            <textarea
                                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                                rows="3"
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.description}
                                            </div>
                                        </div>

                                    </div>

                                    {/* BUTTONS */}
                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark"
                                            onClick={() => navigate("/admin/products")}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-dark"
                                            disabled={loading}
                                        >
                                            {loading ? "Saving..." : "Save Product"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}