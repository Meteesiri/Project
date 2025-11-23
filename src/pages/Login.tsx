import { useGoogleLogin } from "@react-oauth/google";
import logo from "../assets/dpu-logo.png";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const SCOPES = [
  "https://www.googleapis.com/auth/classroom.courses.readonly",
  "https://www.googleapis.com/auth/classroom.rosters.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
].join(" ");

export default function Login() {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    flow: "auth-code",
    scope: SCOPES,
    onSuccess: (response) => {
      fetch(`https://oauth2.googleapis.com/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code: response.code,
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:3000",
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          localStorage.setItem("googleToken", data.access_token);
          navigate("/");
        });
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("googleToken");

    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gradient-to-r from-violet-300 to-indigo-500">
      <div className="flex w-[800px] h-[500px] rounded-xl overflow-hidden shadow-xl bg-white">
        {/* Left Login Card */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-indigo-600">
          <h1 className="text-2xl font-semibold mb-6 text-center text-white">
            Sign in with DPU Account
          </h1>

          <button
            onClick={login}
            className="w-3/4 flex items-center justify-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 active:scale-[0.98] transition cursor-pointer"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-bold text-lg">
              Sign in with Google
            </span>
          </button>
        </div>

        {/* Right Background Panel */}
        <div className="w-1/2 bg-indigo-50 flex justify-center items-center">
          <img src={logo} alt="" width={300} />
        </div>
      </div>
    </div>
  );
}
