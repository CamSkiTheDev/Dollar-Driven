import { Link, useHistory } from "react-router-dom";

import { useState, useEffect } from "react";
import useValidateUser from "../hooks/useValidateUser";

export default function Login() {
  const history = useHistory();
  const { user, isLoading } = useValidateUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
        <h3 className="text-2xl font-bold">Dollar-Driven Login</h3>
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
          <Link className="text-blue-600 underline">
            Don't have an account?
          </Link>
          <button
            type="submit"
            className="flex justify-center py-2 mt-4 w-24 rounded bg-indigo-500 text-white self-end"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
