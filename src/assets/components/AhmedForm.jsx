import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

const AhmedForm = () => {
  const [data, setData] = useState([]);
  const ahmedUID = 'UCxgO331MbfDmoE9ycN3GHrhsmI3';

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const userRef = ref(db, `users/${ahmedUID}/data`);

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          const formattedData = Object.values(rawData);
          setData(formattedData);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Ahmed's Submitted Data</h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No entries found for Ahmed.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-blue-700">Title</th>
                <th className="px-4 py-2 border border-gray-300 text-blue-700">Amount</th>
                <th className="px-4 py-2 border border-gray-300 text-blue-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border border-gray-300">
                    {entry.title || `${entry.from} → ${entry.to}`}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{entry.amount}</td>
                  <td className="px-4 py-2 border border-gray-300">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AhmedForm;
