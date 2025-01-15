import { useState } from "react";
import interviewImage from "../assets/austin-distel-L3OV19xVi8Q-unsplash.jpg";
import {useMutation,useQueryClient} from "@tanstack/react-query"
import {useNavigate} from "react-router-dom"

function Login() {
      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

      const navigate = useNavigate();

      const queryClient = useQueryClient();

      const { mutate, isLoading } = useMutation({
        mutationFn: async (user) => {
          console.log("yo new user",user)
          const response = await fetch("http://localhost:7000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Failed to login user");
          }
          return response.json();
        },
        onSuccess: (data) => {
          alert("User logged in successfully!");

          queryClient.setQueryData(["user"], { id: data.user.id });
          
          setFormData({
            email: "",
            password: "",
          })
    
          navigate("/dashboard");
          console.log("Response:", data);
        },
        onError: (error) => {
          alert(error.message || "Failed to register user, try again");
        },
      });

      const handleSubmit = (e)=>{
        e.preventDefault();
        mutate(formData);
      }

    return (
        <div className="flex justify-center items-center h-screen w-screen p-5 bg-gray-50">
          <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl bg-white shadow-lg rounded-3xl overflow-hidden">
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <img
                className="rounded-none lg:rounded-l-3xl object-cover h-full w-full"
                src={interviewImage}
                alt="interview"
              />
            </div>
      
            {/* Form Section */}
            <div className="w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center items-center gap-6 border-black border-t lg:border-t-0 lg:border-l">
              <h2 className="text-2xl font-bold text-gray-800">Log in</h2>
              <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="something@email.com"
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={formData.email}
                    onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="something strong"
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={formData.password}
                    onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                   {isLoading ? "Logging..." : "Login"}
                </button>
              </form>
              <h3 className="text-gray-600">
                don&apos;t have an account?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Register
                </a>
              </h3>
            </div>
          </div>
        </div>
      );
      
}

export default Login