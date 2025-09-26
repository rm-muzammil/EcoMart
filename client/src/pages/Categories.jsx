// src/pages/admin/Categories.jsx
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import AddNewCategoryModal from "..//components/admin/AddNewCategoryModal";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setOpenModal(true)}
        >
          + Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Card key={cat._id} className="shadow-md">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-24 h-24 object-cover rounded-full border"
                />
                <p className="mt-3 font-semibold text-gray-700">{cat.name}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No categories found.
          </p>
        )}
      </div>

      {/* Modal */}
      <AddNewCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCategoryAdded={(newCategory) =>
          setCategories((prev) => [...prev, newCategory])
        }
      />
    </div>
  );
}
