import React, { useState } from 'react';
import IbrarForm from './IbrarForm';
import AhmedForm from "./AhmedForm";
import AliForm from "./AliForm";
import TransferForm from "./TransferForm";

const AdminPanel = () => {
  const [activeForm, setActiveForm] = useState('');

  const handleBack = () => setActiveForm(''); // Reset to show admin panel again

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex items-start justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        {activeForm === '' ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

            <div className="flex justify-center flex-wrap gap-4 mb-6">
              {['ibrar', 'ahmed', 'ali', 'transfer'].map((name) => (
                <button
                  key={name}
                  onClick={() => setActiveForm(name)}
                  className={`px-4 py-2 rounded text-white font-semibold transition ${
                    activeForm === name ? 'bg-green-600' : 'bg-green-600 hover:bg-green-600'
                  }`}
                >
                  {name === 'transfer' ? 'Transfer Amount' : name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              ))}
            </div>
          </>
        ) : (
          <button
            onClick={handleBack}
            className="mb-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            ← Back to Admin Panel
          </button>
        )}

        {activeForm === 'ibrar' && <IbrarForm />}
        {activeForm === 'ahmed' && <AhmedForm />}
        {activeForm === 'ali' && <AliForm />}
        {activeForm === 'transfer' && <TransferForm />}
      </div>
    </div>
  );
};

export default AdminPanel;
