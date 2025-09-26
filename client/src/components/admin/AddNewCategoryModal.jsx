// src/components/admin/AddNewCategoryModal.jsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "../ui/button";

export default function AddNewCategoryModal({
  open,
  onClose,
  onCategoryAdded,
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Please provide both name and image.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onCategoryAdded(data);
        onClose();
        setName("");
        setImage(null);
      } else {
        alert(data.message || "Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
          <Dialog.Title className="text-xl font-bold mb-4">
            Add New Category
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter category name"
              />
            </div>

            {/* Image Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Preview */}
            {image && (
              <div className="mt-2 flex justify-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded-full border"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Category"}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
