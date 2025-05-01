import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {

  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const inputRefs = React.useRef([]);
  
    const handleInput = (e, index) => {
      if(e.target.value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
        
      }
    }
  
  
    const handleKeyDown =(e, index) => {
      if(e.key === 'Backspace' && e.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
    }
  }
  
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('Text');
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index) => {
        if(inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    }

    const onSubmitEmail = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
       
        data.success ? toast.success(data.message) : toast.error(data.message);

        data.success && setIsEmailSent(true);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }

    const onSubmitOtp = async (e) => {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
     setOtp(otpArray.join(''));

     setIsOtpSubmited(true);
    }

    const onSubmitNewPassword = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl + '/api/auth//reset-password', {email,otp,newPassword})
       
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && navigate('/login')
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.SLIIT}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {!isEmailSent && 

      <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your registered email and we will send you a link to reset your
          password
        </p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <img src={assets.mail_icon} alt="" className="w-3 h-3" />
          <input
            type="email"
            placeholder="email id"
            className="bg-transparent outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3"
          type="submit"
        >
          Submit
        </button>
      </form>
}

      {/* OTP Form */}


      {!isOtpSubmited && isEmailSent && 
      <form 
        onSubmit={onSubmitOtp}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        
      >
        <h1 className="text-white text-2xl font-semibold mb-4 text-center">
          Reset Password OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit OTP sent to your email
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                type="text"
                maxLength="1"
                key={index}
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full hover:from-indigo-600 hover:to-indigo-800 transition duration-300">
         Submit
        </button>
      </form>
}

{isOtpSubmited && isEmailSent && 

      <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold mb-4 text-center">
          New Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter The New Password Below</p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <img src={assets.lock_icon} alt="" className="w-3 h-3" />
          <input
            type="password"
            placeholder="Passwordd"
            className="bg-transparent outline-none text-white"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3"
          type="submit"
        >
          Submit
        </button>
      </form>
}


    </div>
  );
};

export default ResetPassword;
