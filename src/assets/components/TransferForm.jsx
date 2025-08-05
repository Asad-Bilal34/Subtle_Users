import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

const userUIDs = {
  ali: "u4JE8PL3BbSiRXllxHBMQ7ERZDJ3",
  ibrar: "1mWfskPTKuNrH20DeUyr2R51K14r",
  ahmed: "UCxgO331MbfDmoE9ycN3GHrhsmI3",
};

const TransferForm = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toUID = userUIDs[formData.to];
    if (!toUID) {
      alert("Invalid recipient");
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${toUID}/data`);

    try {
      await push(userRef, {
        ...formData,
        date: today, // ✅ Save today's date silently
      });

      alert("Transfer submitted successfully!");
      setFormData({ from: "", to: "", amount: "" });
    } catch (error) {
      console.error("Error submitting transfer:", error);
      alert("Transfer failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-center text-blue-700">Transfer Amount</h3>

      <div>
        <label className="block font-medium">From:</label>
        <select
          name="from"
          value={formData.from}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          {/* <option value="">Select sender</option> */}
          <option value="ali">Ali</option>
          {/* <option value="ibrar">Ibrar</option>
          <option value="ahmed">Ahmed</option> */}
        </select>
      </div>

      <div>
        <label className="block font-medium">To:</label>
        <select
          name="to"
          value={formData.to}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select recipient</option>
          {/* <option value="ali">Ali</option> */}
          <option value="ibrar">Ibrar</option>
          <option value="ahmed">Ahmed</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Submit Transfer
      </button>
    </form>
  );
};

export default TransferForm;
