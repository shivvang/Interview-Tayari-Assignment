import { useState } from "react";
import interviewImage from "../assets/austin-distel-L3OV19xVi8Q-unsplash.jpg";
import { useMutation } from "@tanstack/react-query";
import {useNavigate} from "react-router-dom"

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
  });
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch("http://localhost:7000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      return response.json();
    },
    onSuccess: (data) => {
      alert("User registered successfully!");

      setFormData({
        username: "",
        email: "",
        password: "",
        country: "",
      })

      navigate("/login");
      console.log("Response:", data);
    },
    onError: (error) => {
      alert(error.message || "Failed to register user, try again");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

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
          <h2 className="text-2xl font-bold text-gray-800">Create An Account</h2>
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Username</label>
              <input
                type="text"
                required
                placeholder="username"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
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
                placeholder="*******"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Country</label>
              <input
                type="text"
                required
                placeholder="India"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={formData.country}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, country: e.target.value }))
                }
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {isLoading ? "Creating..." : "Create An Account"}
            </button>
          </form>
          <h3 className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Register;
