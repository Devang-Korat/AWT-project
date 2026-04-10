import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AddCategory() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        image: null
    });

    const [preview, setPreview] = useState(null); // ✅ FIXED
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ✅ Handle text input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    // ✅ Handle image
    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setForm({
                ...form,
                image: file
            });

            setPreview(URL.createObjectURL(file));
        }
    };

    // ✅ Validation
    const validate = () => {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Category name is required";
        } else if (form.name.length < 2) {
            newErrors.name = "Minimum 2 characters required";
        } else if (form.name.length > 50) {
            newErrors.name = "Maximum 50 characters allowed";
        }

        if (form.description && form.description.length > 200) {
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
            formData.append("name", form.name.trim());
            formData.append("description", form.description.trim());

            if (form.image) {
                formData.append("image", form.image);
            }

            await API.post("/categories/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Category Added Successfully");

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
                    <div className="col-lg-6">
                        <div className="card shadow border-0">

                            {/* HEADER */}
                            <div className="card-header bg-dark text-white py-3">
                                <h4 className="mb-0 fw-bold">Add New Category</h4>
                                <small className="text-light">
                                    Create product category
                                </small>
                            </div>

                            <div className="card-body p-4">

                                {/* API ERROR */}
                                {errors.api && (
                                    <div className="alert alert-danger">
                                        {errors.api}
                                    </div>
                                )}

                                <form onSubmit={submit}>

                                    {/* IMAGE */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Category Image
                                        </label>

                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImage}
                                        />

                                        {preview && (
                                            <div className="mt-3 text-center">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        borderRadius: "50%"
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* NAME */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Category Name
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter category name"
                                        />

                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* DESCRIPTION */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Description
                                        </label>

                                        <textarea
                                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                            rows="3"
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Category description"
                                        />

                                        {errors.description && (
                                            <div className="invalid-feedback">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="d-flex justify-content-end gap-2 mt-4">

                                        <button
                                            type="button"
                                            className="btn btn-outline-dark"
                                            onClick={() => navigate("/admin/ManageProducts")}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-dark"
                                            disabled={loading}
                                        >
                                            {loading ? "Saving..." : "Save Category"}
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