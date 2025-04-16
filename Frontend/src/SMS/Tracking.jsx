import { Link } from "react-router-dom";
// import { CheckCircle, Clock } from 'lucide-react';

function Tracking() {
  return (
    <>
      <div className=" p-5 flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="w-full text-left text-2xl font-semibold">
          Request Tracking
        </div>

        <div className=" mt-20 mb-64 w-full h-auto">
          <div className="max-w-sm w-full mx-auto p-10 rounded-xl border shadow-sm bg-white">
            <div className="flex flex-col gap-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-3 top-6 bottom-6 w-0.5 bg-gray-200 z-0" />

              {/* Step 1 - Requested */}
              <div className="flex items-start gap-4 z-10">
                {/* <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0 bg-white" /> */}
                <div>
                  <h3 className="text-gray-800 font-semibold">Requested</h3>
                  <p className="text-sm text-gray-500">
                    Request submitted successfully
                  </p>
                </div>
              </div>

              {/* Step 2 - Approved */}
              <div className="flex items-start gap-4 z-10">
                {/* <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0 bg-white" /> */}
                <div>
                  <h3 className="text-gray-800 font-semibold">Approved</h3>
                  <div className="flex items-center text-sm text-gray-500 gap-1">
                    {/* <Clock className="w-4 h-4" /> */}
                    <span>Waiting for Payment</span>
                  </div>
                </div>
              </div>

              {/* Step 3 - Cashback */}
              <div className="flex items-start gap-4 z-10 opacity-50">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-800 font-semibold">
                    Cashback Received
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="w-40 bg-pink-500 text-white py-2 rounded-3xl hover:bg-pink-600 transition"
          >
            <Link to={""}>Contact us</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Tracking;
