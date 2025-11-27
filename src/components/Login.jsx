import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message);

      if (data.message === "Login successful" && data.user) {
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("username", data.user.username);
        // notify same-tab listeners
        window.dispatchEvent(new Event("authChange"));
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="fakeusernameremembered"
          style={{ display: "none" }}
        />
        <input
          type="password"
          name="fakepasswordremembered"
          style={{ display: "none" }}
        />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
