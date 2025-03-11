import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AuthModal({ isOpen, onClose, isLogin, setIsLogin, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate =useNavigate();

  if (!isOpen) return null;

  const login = async (event) => {
    event.preventDefault();
    const loginRequest = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/mega_city_cab_war/user?action=login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(loginRequest),
          credentials: "include", // Ensure cookies/tokens are handled
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.data.jwt);
        localStorage.setItem("email", data.data.name);
        localStorage.setItem("role", data.data.role);
        alert("Login successful!");
        if(data.data.role=='Admin'){
          navigate('/admin')
        }
        //onLoginSuccess({ name: data.data.name }); // Notify parent component of successful login
        onClose(); // Close the modal after successful login
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400"
            onClick={login}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <button
          className="mt-4 text-sm text-gray-600 hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}