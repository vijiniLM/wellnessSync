import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userData, setUserData, backendUrl, setIsLoggedIn } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success("OTP sent successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      {/* <img className="w-28 sm:w-32" src={assets.SLIIT} alt="" /> */}
      {userData ? (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify email
                </li>
              )}
              <li
                onClick={() => navigate("/foodList")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Items
              </li>
              <li
                onClick={() => navigate("/cart")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Cart
              </li>
              <li
                onClick={() => navigate("/orders")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Orders
              </li>
              <li
                onClick={() => navigate("/profile")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Profile
              </li>
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
