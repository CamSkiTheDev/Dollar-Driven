import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EditPropertyModal from "../components/EditPropertyModal";

export default function Property({
  match: {
    params: { id },
  },
}) {
  const token = JSON.parse(localStorage.getItem("login_token"));
  const history = useHistory();
  const [property, setProperty] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const deleteProperty = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/properties/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    history.push("/dashboard");
  };

  const fetchProperty = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/properties/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    setProperty(data);
  };

  useEffect(() => {
    if (!property) fetchProperty();
  }, []);

  return (
    <div className="bg-green-500 w-full min-h-screen flex flex-col items-center px-4">
      <EditPropertyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        property={property}
        setProperty={setProperty}
      />
      <div className="w-full max-w-5xl bg-white rounded-md my-4 p-4 flex flex-col">
        <h3>{property?.street_adderss}</h3>
        <img />
        <div className="flex justify-between">
          <span>{property?.street_adderss}</span>
          <div className="flex">
            <button
              onClick={() => setIsOpen((prevState) => !prevState)}
              className="py-2 px-8 m-2 bg-green-400 rounded-md text-white"
            >
              Edit
            </button>
            <button
              onClick={deleteProperty}
              className="py-2 px-8 m-2 bg-red-400 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </div>
        <span>
          Estimated Value: $
          {property?.estimated_value.toLocaleString({
            currency: "usd",
            style: "currency",
          })}
        </span>
        <span>
          Estimated ARV: $
          {property?.after_repair_value.toLocaleString({
            currency: "usd",
            style: "currency",
          })}
        </span>
        <span>
          Estimated Rent: $
          {property?.estimated_rent.toLocaleString({
            currency: "usd",
            style: "currency",
          })}
        </span>
      </div>
    </div>
  );
}
