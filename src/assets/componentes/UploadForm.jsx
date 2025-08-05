import React, { useState, useRef } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    file: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("User not authenticated");
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}/data`);

    try {
      await push(userRef, {
        date: formData.date,
        title: formData.title,
        amount: parseFloat(formData.amount),
      });

      alert("✅ Data stored successfully in Realtime Database!");

      // Reset form
      setFormData({
        date: "",
        title: "",
        amount: "",
        file: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error("❌ Error storing data:", err);
      alert("❌ Failed to store data.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Choose File (optional)</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full"
            ref={fileInputRef}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
