import { Link } from "react-router-dom";
function SMSForm() {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Fill the form with issue</h2>
        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Ajay"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
  
        {/* Mobile Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile number
          </label>
          <input
            type="tel"
            placeholder="+91 9565478999"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
  
        {/* Describe */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Describe
          </label>
          <textarea
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>
  
        {/* Media Upload */}
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Media Upload
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Add your documents here, and you can upload up...
          </p>
  
          <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center bg-pink-50">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-pink-500 text-3xl">📁</div>
              <p className="text-sm text-gray-600">
                Drag your file(s) to start uploading
              </p>
              <span className="text-xs text-gray-400">OR</span>
              <button className="px-4 py-1 text-sm text-white bg-pink-500 rounded-md hover:bg-pink-600 transition">
                Browse files
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 flex gap-3 p-5">
            <button className="w-full h-[52px] font-inter font-semibold text-[#ED174FCC] text-sm bg-[#F4F1F5] rounded-full border border-[#ED174FCC]">
              <Link to={""}>Clear</Link>
            </button>
            <button className="w-full h-[52px] font-inter font-semibold rounded-full bg-[#ED174FCC] text-white ">
              <Link to={""}>Submit</Link>
            </button>
          </div>
      </div>
    );
  }
  
  export default SMSForm;
  