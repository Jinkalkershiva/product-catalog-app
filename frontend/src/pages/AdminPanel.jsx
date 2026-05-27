import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { apiService } from "../services/apiService";
import "./AdminPanel.css";

function AdminPanel() {
  const { isAdmin, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Tab State: 'products' | 'categories'
  const [activeTab, setActiveTab] = useState("products");

  // Dynamic Lists
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form States (Products)
  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    categoryId: "",
  });
  const [showProductModal, setShowProductModal] = useState(false);

  // Form States (Categories)
  const [categoryForm, setCategoryForm] = useState({
    id: null,
    name: "",
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Guarding admin route access
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);

  // Fetch all products & categories
  const fetchData = async () => {
    try {
      const prodData = await apiService.get("/products");
      const catData = await apiService.get("/categories");
      setProducts(prodData || []);
      setCategories(catData || []);
      if (catData && catData.length > 0 && !productForm.categoryId) {
        setProductForm((prev) => ({ ...prev, categoryId: catData[0].id }));
      }
    } catch (err) {
      showToast("Failed to fetch data: " + err.message, "danger");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  // Product actions: Create/Update
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.categoryId) {
      showToast("Please select a category first.", "warning");
      return;
    }

    try {
      const payload = {
        name: productForm.name,
        description: productForm.description,
        imageUrl: productForm.imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600",
        price: parseFloat(productForm.price),
        categoryId: parseInt(productForm.categoryId),
      };

      if (productForm.id) {
        await apiService.put(`/products/${productForm.id}`, payload);
        showToast(`✏️ Product "${productForm.name}" updated successfully!`, "success");
      } else {
        await apiService.post("/products", payload);
        showToast(`🎉 Product "${productForm.name}" added successfully!`, "success");
      }

      resetProductForm();
      fetchData();
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  // Product Delete
  const handleProductDelete = async (p) => {
    if (!window.confirm(`Are you sure you want to delete "${p.name}"?`)) return;
    try {
      await apiService.delete(`/products/${p.id}`);
      showToast(`🗑️ Product "${p.name}" deleted successfully!`, "info");
      fetchData();
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  const handleEditProduct = (prod) => {
    setProductForm({
      id: prod.id,
      name: prod.name,
      description: prod.description,
      imageUrl: prod.imageUrl,
      price: prod.price,
      categoryId: prod.categoryId,
    });
    setShowProductModal(true);
  };

  const resetProductForm = () => {
    setProductForm({
      id: null,
      name: "",
      description: "",
      imageUrl: "",
      price: "",
      categoryId: categories[0]?.id || "",
    });
    setShowProductModal(false);
  };

  // Category actions: Create/Update
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: categoryForm.name };
      if (categoryForm.id) {
        await apiService.put(`/categories/${categoryForm.id}`, payload);
        showToast(`✏️ Category renamed to "${categoryForm.name}"!`, "success");
      } else {
        await apiService.post("/categories", payload);
        showToast(`🎉 Category "${categoryForm.name}" created!`, "success");
      }

      resetCategoryForm();
      fetchData();
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  // Category Delete
  const handleCategoryDelete = async (cat) => {
    if (!window.confirm(`Deleting category "${cat.name}" will clear associated items. Continue?`)) return;
    try {
      await apiService.delete(`/categories/${cat.id}`);
      showToast(`🗑️ Category "${cat.name}" deleted successfully!`, "info");
      fetchData();
    } catch (err) {
      showToast(err.message, "danger");
    }
  };

  const handleEditCategory = (cat) => {
    setCategoryForm({
      id: cat.id,
      name: cat.name,
    });
    setShowCategoryModal(true);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      id: null,
      name: "",
    });
    setShowCategoryModal(false);
  };

  if (loading) return <div className="loader">Loading admin credentials...</div>;
  if (!isAdmin) return null;

  return (
    <div className="admin-page container">
      <div className="admin-header">
        <h1>Admin Control Dashboard</h1>
        <p>Modify and scale the e-commerce inventory database in real-time</p>
      </div>

      {/* Tabs Menu */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Manage Products ({products.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "categories" ? "active" : ""}`}
          onClick={() => setActiveTab("categories")}
        >
          Manage Categories ({categories.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="tab-content animate-fade-in">
          <div className="tab-actions">
            <button
              className="btn-primary add-item-btn"
              onClick={() => setShowProductModal(true)}
            >
              ➕ Add New Product
            </button>
          </div>

          {/* PRODUCT FORM MODAL */}
          {showProductModal && (
            <div className="modal-overlay" onClick={resetProductForm}>
              <form onSubmit={handleProductSubmit} className="admin-form modal-content glass" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>{productForm.id ? "✏️ Edit Product Details" : "📦 Register New Product"}</h3>
                  <button type="button" className="close-modal-btn" onClick={resetProductForm}>&times;</button>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={productForm.imageUrl}
                      onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category Mapping</label>
                    <select
                      value={productForm.categoryId}
                      onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                      required
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      rows="3"
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-save">
                    {productForm.id ? "Apply Changes" : "Save Product"}
                  </button>
                  <button type="button" className="btn-cancel" onClick={resetProductForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="table-responsive glass">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.imageUrl} alt={p.name} className="table-thumbnail" />
                    </td>
                    <td className="fw-semibold">{p.name}</td>
                    <td>
                      <span className="badge-cat">{p.categoryName}</span>
                    </td>
                    <td className="fw-semibold text-emerald">₹{p.price}</td>
                    <td className="table-desc">{p.description}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEditProduct(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleProductDelete(p)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CATEGORIES TAB */}
      {activeTab === "categories" && (
        <div className="tab-content animate-fade-in">
          <div className="tab-actions">
            <button
              className="btn-primary add-item-btn"
              onClick={() => setShowCategoryModal(true)}
            >
              ➕ Create New Category
            </button>
          </div>

          {/* CATEGORY FORM MODAL */}
          {showCategoryModal && (
            <div className="modal-overlay" onClick={resetCategoryForm}>
              <form onSubmit={handleCategorySubmit} className="admin-form modal-content glass small-form" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>{categoryForm.id ? "✏️ Rename Category" : "📁 Create Category"}</h3>
                  <button type="button" className="close-modal-btn" onClick={resetCategoryForm}>&times;</button>
                </div>
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-save">
                    {categoryForm.id ? "Apply Change" : "Create Category"}
                  </button>
                  <button type="button" className="btn-cancel" onClick={resetCategoryForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="table-responsive glass">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Category ID</th>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id}>
                    <td>#{c.id}</td>
                    <td className="fw-semibold">{c.name}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEditCategory(c)}
                        >
                          Rename
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleCategoryDelete(c)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
