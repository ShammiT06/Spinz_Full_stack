import { useNavigate } from "react-router-dom";
import Reusablespinz from "../Components/Reusablespinz";
import "../Css/camera.css";

function Camera() {
  const navigate = useNavigate();

  const handleCameraAccess = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Camera permission granted");

        // Optional: stop the camera stream immediately if not using it now
        stream.getTracks().forEach(track => track.stop());

        navigate("/loc"); // navigate to location page
      })
      .catch((err) => {
        console.error("Camera permission denied", err);
        alert("Camera access is required to continue.");
      });
  };

  return (
    <>
      <Reusablespinz />
      <div className="bg-opacity-60 bg-gray-800 flex justify-center items-center" id="cam">
        <div className="w-[270px] h-[168px] bg-[#404040] rounded-2xl text-white">
          <div id="container">
            <h1 className="font-inter font-semibold text-[16px]">
              “Spinz” Would Like to Access <span className="ml-14">to the Camera</span>
            </h1>
            <p className="font-inter text-[13px] p-1 font-medium">
              To take pictures and detect the data
            </p>
          </div>
          <div className="w-full mt-[10px] flex font-inter font-medium">
            <button className="border border-[#787878] w-[260px] h-[44px] text-[#5A91F7] rounded-bl-2xl">
              <a href="/">Don't Allow</a>
            </button>
            <button
              className="border border-[#787878] w-[260px] h-[44px] text-[#5A91F7] rounded-br-2xl"
              onClick={handleCameraAccess}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Camera;
