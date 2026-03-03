import { useState } from "react";
import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";
import useProductStore from "../store/useProductStore";

const CreatePage = () => {
  const categories = ["kids", "women", "men", "bags"];

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  const { createProducts, loading } = useProductStore();

  // ✅ Clean single submit handler
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createProducts(newProduct);

      setNewProduct({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.log("Failed to create", error);
    }
  };

  const handleOnchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      className="create-con"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2>Create Product</h2>

      {/* ✅ Proper form submission */}
      <form onSubmit={handleCreate}>
        <div className="create-detail">
          <label className="create-label" htmlFor="name">
            Product Name
          </label>
          <input
            value={newProduct.name}
            required
            id="name"
            type="text"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>

        <div className="create-detail">
          <label className="create-label" htmlFor="description">
            Description
          </label>
          <textarea
            value={newProduct.description}
            required
            id="description"
            rows="3"
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </div>

        <div className="create-detail">
          <label className="create-label" htmlFor="price">
            Price
          </label>
          <input
            value={newProduct.price}
            required
            id="price"
            type="number"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>

        <div className="create-detail">
          <label className="create-label" htmlFor="category">
            Category
          </label>
          <select
            value={newProduct.category}
            required
            id="category"
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="image-detail">
          <input
            required
            accept="image/*"
            id="image"
            type="file"
            onChange={handleOnchange}
          />

          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="image-label"
            htmlFor="image"
          >
            <Upload size={15} /> Upload Image
          </motion.label>

          {/* ✅ Animated Image Preview */}
          {newProduct.image && (
            <motion.div
              className="preview-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.img
                key={newProduct.image}
                src={newProduct.image}
                alt="Preview"
                className="preview-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn">
          {loading ? (
            <>
              <Loader className="create-spin" size={15} />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle size={15} />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreatePage;
