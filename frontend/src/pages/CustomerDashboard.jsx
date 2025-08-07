// src/pages/CustomerDashboard.jsx
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">LPG Distribution</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Booking & Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Cylinder */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">📦 Book New Cylinder</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Delivery Address"
                className="w-full border px-4 py-2 rounded"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Book Cylinder
              </button>
            </form>
          </div>

          {/* Track Delivery */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">🚚 Track Delivery Status</h2>
            <p>
              Your latest booking is:{' '}
              <span className="font-bold text-yellow-600">Dispatched</span>
            </p>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">📜 Order History</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Booking Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Delivery Date</th>
                <th className="p-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">2025-08-01</td>
                <td className="p-2 text-green-600">Delivered</td>
                <td className="p-2">2025-08-03</td>
                <td className="p-2 text-blue-500 underline cursor-pointer">View</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
