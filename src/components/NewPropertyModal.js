import { useState } from "react";

export default function NewPropertyModal({ getProperties, isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    street_adderss: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("login_token"));

    await fetch(`${process.env.REACT_APP_API_URL}/properties`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({
      street_adderss: "",
    });
    setIsOpen(false);
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } justify-center items-center w-screen h-full min-h-screen bg-black absolute top-0 left-0 z-50 bg-opacity-70`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full m-4 max-w-xl bg-white rounded-md p-4"
      >
        <h3 className="text-2xl font-bold">New Property</h3>
        <p>Add a new property just fill out the street address and press add</p>
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Street Address"
          name="street_adderss"
          value={formData.street_adderss}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-16 py-2 mt-4 ml-auto rounded-md max-w-xs"
        >
          Add
        </button>
      </form>
    </div>
  );
}
