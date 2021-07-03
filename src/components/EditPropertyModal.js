import { useState, useEffect } from "react";

export default function EditPropertyModal({
  isOpen,
  setIsOpen,
  property,
  setProperty,
}) {
  const [formData, setFormData] = useState({
    street_adderss: "",
    estimated_value: "",
    after_repair_value: "",
    estimated_rent: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("login_token"));

    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/properties/${property.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    ).then((res) => res.json());

    setFormData({
      street_adderss: "",
      estimated_value: "",
      after_repair_value: "",
      estimated_rent: "",
    });
    setIsOpen(false);

    setProperty(data);
  };

  const handleChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  useEffect(() => {
    setFormData({ ...property });
  }, [property]);

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
        <h3>Edit Property</h3>
        <label htmlFor="street_adderss">Street Address</label>
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Street Address"
          name="street_adderss"
          id="street_adderss"
          value={formData.street_adderss}
          onChange={handleChange}
          required
        />
        <label htmlFor="estimated_value">Estimated Value</label>
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Estimated Value"
          name="estimated_value"
          id="estimated_value"
          value={formData.estimated_value}
          onChange={handleChange}
          required
        />
        <label htmlFor="after_repair_value">Estimated ARV</label>
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Estimated ARV"
          name="after_repair_value"
          id="after_repair_value"
          value={formData.after_repair_value}
          onChange={handleChange}
          required
        />
        <label htmlFor="estimated_rent">Rstimated Rent</label>
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Estimated Rent"
          name="estimated_rent"
          id="estimated_rent"
          value={formData.estimated_rent}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-16 py-2 mt-4 ml-auto rounded-md max-w-xs"
        >
          Save
        </button>
      </form>
    </div>
  );
}
