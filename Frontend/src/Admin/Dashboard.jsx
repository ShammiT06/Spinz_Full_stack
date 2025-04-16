import React, { use, useEffect, useState } from 'react';
import logo from "../assets/SpinzPink.png"
import axios from 'axios';
const Dashboard = () => {


    const [dashboard, setdashboard] = useState([])
    const [count,setcount]=useState([])
    const [pending,setpending]=useState([])
    const [approved,setapproved]=useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/bord").then((data) => {
            setdashboard(data.data)
        }).catch(() => {
            console.log("Error")
        })
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:5000/total").then((response)=>{
          setcount(response.data)
        }).catch((err)=>{
          console.log("error:",err)
        })
    
      },[])

      useEffect(()=>{
        axios.get("http://localhost:5000/approved").then((data)=>{
            setapproved(data.data)
        }).catch((err)=>{
            console.log("Error:",err)
        })
      },[])

      useEffect(()=>{
        axios.get("http://localhost:5000/pending").then((data)=>{
            setpending(data.data)
        }).catch(()=>{
            console.log("Error")
        })
      })


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className='mb-5'>
                <img src={logo}></img>
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white shadow p-4 rounded-xl">
                    <h2 className="text-lg font-semibold">Total Vendors</h2>
                    <p className="text-2xl font-bold text-blue-600">{count}</p>
                </div>
                <div className="bg-white shadow p-4 rounded-xl">
                    <h2 className="text-lg font-semibold">Pending Requests</h2>
                    <p className="text-2xl font-bold text-yellow-500">{pending}</p>
                </div>
                <div className="bg-white shadow p-4 rounded-xl">
                    <h2 className="text-lg font-semibold">Cashback Paid</h2>
                    <p className="text-2xl font-bold text-green-600">₹1,20,000</p>
                </div>
                <div className="bg-white shadow p-4 rounded-xl">
                    <h2 className="text-lg font-semibold">Approved Request</h2>
                    <p className="text-2xl font-bold text-purple-600">{approved}</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow p-4 rounded-xl mb-6 overflow-x-auto">
                <h2 className="text-xl font-semibold mb-3">Latest Vendor Submissions</h2>
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-2">Vendor</th>
                            {/* <th className="p-2">Phone</th> */}
                            <th className="p-2">UPI Id</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dashboard.map((response, index) => {
                                return (<>
                                    <tr key={index} className='border-t hover:bg-slate-200'>
                                        <td>{response.name}</td>
                                        {/* <td>{response.mobile}</td> */}
                                        <td>{response.upiid}</td>
                                        <td>{response.status}</td>
                                    </tr>
                                </>)
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* Chart Placeholder */}
            {/* <div className="bg-white shadow p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-3">Submission Trends</h2>
                <div className="h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    [ Chart Goes Here ]
                </div>
            </div> */}
        </div>
    );
};

export default Dashboard;
