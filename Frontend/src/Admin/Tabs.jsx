import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pending from "/src/Admin/Pending/MainPending.jsx";
import History from "/src/Admin/History/MainHistory.jsx";
import Header from "/src/Components/AdminHeader.jsx";
import { auth } from "../config";
import { signOut } from "firebase/auth";

const Tabs = () => {

  const [activeTab, setActiveTab] = useState("pending");

  const navigate = useNavigate();

  // const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <>
      <Header />

      <div className="flex items-center justify-between p-8 space-y-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-inter font-medium">Vendor Requests</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-xl border-[2px] border-pink-500 text-pink-500 ${
                activeTab === "pending" ? "bg-pink-500 text-white" : "bg-white"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-xl border-[2px] border-pink-500 text-pink-500 ${
                activeTab === "history" ? "bg-pink-500 text-white" : "bg-white"
              }`}
            >
              History
            </button>

          </div>
        </div>

        <div className="flex flex-col items-end w-96 flex-wrap gap-4">
          <button 
            onClick={() => navigate("/payout")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-3xl">
            Proceed to Payout
          </button>
          <input
            type="text"
            placeholder="Search by Name, Ref ID, Mobile, UPI Id..."
            className="border p-2 rounded w-full xl:w-full md:w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "pending" ? <Pending /> : <History />}
    </>
  );
};

export default Tabs;