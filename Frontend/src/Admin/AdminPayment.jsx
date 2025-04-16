import { useEffect, useState } from "react";
import { vendorData } from "../Data/Data";
import Header from "../Components/AdminHeader.jsx";
import axios from "axios"

export default function AdminPayment() {
  const [approvedCount, setApprovedCount] = useState(25);
  const [userData,setUserData]=useState([])
  
  useEffect(() => {
    axios.get("http://localhost:5000/fetchapprove")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

   return (
    <>
    <Header/>
    <div className="p-6 md:p-10 flex flex-col md:flex-row gap-6">
      {/* Table Section */}
      <div className="w-full md:w-2/3 overflow-auto">
        <h2 className="text-2xl font-semibold mb-4">Review & Confirmation</h2>
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">S.no</th>
              <th className="text-left px-4 py-2">Username</th>
              <th className="text-left px-4 py-2">Ref ID</th>
              <th className="text-left px-4 py-2">UPI ID</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 text-blue-600 cursor-pointer">{user.referenceid}</td>
                <td className="px-4 py-2">{user.upiid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payout Section */}
      <div className=" w-full md:w-1/3 border rounded-xl p-6 flex flex-col gap-6 bg-white shadow-xl ">
        <div>
          <h3 className="text-lg font-semibold mb-2">Payout details</h3>
          <div className="flex justify-between mb-1">
            <span>Confirmation Cashback</span>
            <span>₹ 50</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Approved Quantity</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={approvedCount}
                onChange={(e) => setApprovedCount(Number(e.target.value))}
                className="w-16 border px-2 py-1 rounded-md text-center"
              />
              <span>₹ {approvedCount * 50}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Pay using</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" defaultChecked />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Razorpay_logo.svg" alt="Razorpay" className="h-5" />
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Snapmint_Logo_2023.svg/2560px-Snapmint_Logo_2023.svg.png" alt="Snapmint" className="h-5" />
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button className="flex-1 border border-gray-400 text-gray-600 py-2 rounded-md">Back</button>
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Pay on Razorpay</button>
        </div>
      </div>
    </div>
    </>
  );
}
