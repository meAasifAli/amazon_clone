import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { darkLogo } from "../assets/index";
import { RotatingLines } from "react-loader-spinner";
import {motion} from 'framer-motion'
import { useDispatch } from "react-redux";
import { setuserInfo } from "../redux/amazonSlice";

const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [userEmailErr,setUserEmailErr] = useState("")
  const [userPassErr,setUserPassErr] = useState("")
  // Firebase Error

  // Loading State start here

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your email");
    }
    if (!password) {
      setErrPassword("Enter your password");
    }
    if (email && password) {
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          dispatch(setuserInfo({
            _id : user.uid,
            userName : user.displayName,
            email : user.email,
            image : user.photoURL
          }))
          // ...
          setLoading(false)
          setSuccessMsg("Signed In Successfully!!")
          setTimeout(()=>{
            navigate("/")
          },2000)
         
        })
        .catch((error) => {
          setLoading(false)
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")) {
            setUserEmailErr("Invalid Email")
            
          }
          if (errorCode.includes("auth/wrong-password")) {
            setUserPassErr("wrong password")
           
          }
          
        });
       
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-[90%] md:w-full lg:w-full lgl:w-full sm:w-full xs:w-[360px]">
      <div className="w-full bg-gray-100 pb-10">

        {
          successMsg ? <div className=" flex items-center justify-center h-screen">
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className=" text-green-500 border-b-4 border-b-black text-2xl font-bodyFont"
            >{successMsg}</motion.p>
          </div> : (
            <form className="w-[350px] mx-auto flex flex-col items-center">
              <Link to="/">
                <img className="w-32" src={darkLogo} alt="darkLogo" />
              </Link>
              <div className="w-[90%] md:w-full lg:w-full lgl:w-full border border-zinc-200 p-6">
                <h2 className="font-titleFont text-3xl font-medium mb-4 text-center">
                  Sign in
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">
                      Email or mobile phone number
                    </p>
                    <input
                      onChange={handleEmail}
                      value={email}
                      className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                      type="email"
                    />
                    {errEmail && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                        <span className="italic font-titleFont font-extrabold text-base">
                          !
                        </span>
                        {errEmail}
                      </p>
                    )}
                      {userEmailErr && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                        <span className="italic font-titleFont font-extrabold text-base">
                          !
                        </span>
                        {userEmailErr}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Password</p>
                    <input
                      onChange={handlePassword}
                      value={password}
                      className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                      type="password"
                    />
                    {errPassword && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                        <span className="italic font-titleFont font-extrabold text-base">
                          !
                        </span>
                        {errPassword}
                      </p>
                    )}
                    {userPassErr && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                        <span className="italic font-titleFont font-extrabold text-base">
                          !
                        </span>
                        {userPassErr}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleLogin}
                    className="w-[100%] md:w-full lg:w-full lgl:w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                  >
                    Continue
                  </button>
                </div>
                <p className="text-xs text-black leading-4 mt-4">
                  By Continuing, you agree to Amazon's
                  <span className="text-blue-600">Conditions of Use </span>and{" "}
                  <span className="text-blue-600">Privace Notice.</span>
                </p>
                <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
                  <ArrowRightIcon />{" "}
                  <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                    Need help?
                  </span>
                </p>
              </div>
              <p className="w-[90%] md:w-full lg:w-full lgl:w-full text-xs text-gray-600 mt-4 flex items-center">
                <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
                <span className="w-1/3 text-center">New to Amazon?</span>
                <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
              </p>
              <Link className="w-full" to="/registration">
                <button className="md:w-[90%] sm:ml-4 sm:w-[90%] xs:ml-4 xs:w-[90%] md:ml-4 lg:w-full lg:ml-0 py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
                  Create your Amazon account
                </button>
                {
                  loading && (
                    <div className="flex justify-center">
                      <RotatingLines
                        strokeColor="#febd69"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                      />
                    </div>
                  )
                }

              </Link>
            </form>

          )
        }
        

      </div>
      <div className="w-full lg:w-full lgl:w-full md:w-full  bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-3 ml-6 mx-auto">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Signin;
