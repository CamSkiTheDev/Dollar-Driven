import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import useValidateUser from "../hooks/useValidateUser";

export default function Signup() {
  const history = useHistory();
  const { user, isLoading } = useValidateUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (formData.password !== formData.repassword) return null;

    const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.status >= 400) return setErrorMsg(data.error);

    localStorage.setItem("login_token", JSON.stringify(data.token));

    history.push("/dashboard");
  };

  useEffect(() => {
    if (!isLoading && user) return history.push("/dashboard");
  }, [isLoading, user]);

  return (
    <div className="bg-green-500 w-full min-h-screen flex items-center justify-center">
      <div className="p-4 bg-white rounded">
        <h3 className="text-2xl font-bold">Dollar-Driven Signup</h3>
        {errorMsg ? <p className="mt-4 text-red-600">{errorMsg}</p> : null}
        <form onSubmit={handleSubmit} className="w-72 flex flex-col my-4">
          <input
            className="my-2 rounded w-full"
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="my-2 rounded w-full"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="my-2 rounded w-full"
            type="password"
            name="repassword"
            placeholder="Confirm Password"
            required
            value={formData.repassword}
            onChange={handleChange}
          />
          <Link to="/" className="text-blue-600 underline">
            Already have an account?
          </Link>
          <button
            type="submit"
            className="flex justify-center py-2 mt-4 w-24 rounded bg-indigo-500 text-white self-end"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
