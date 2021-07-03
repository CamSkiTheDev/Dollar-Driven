import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import useValidateUser from "../hooks/useValidateUser";
import NewPropertyModal from "../components/NewPropertyModal";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const { isLoading } = useValidateUser();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const getProperties = async (token) => {
    const properties = await fetch(
      `${process.env.REACT_APP_API_URL}/properties`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    setProperties(properties);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("login_token"));

    if (token) getProperties(token);
  }, [properties]);

  if (!properties) return null;

  return (
    <div className="bg-green-500 w-full min-h-screen flex flex-col items-center">
      <NewPropertyModal
        getProperties={getProperties}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="w-full max-w-5xl min-h-screen relative">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white m-4 p-4 flex drop-shadow rounded-md cursor-pointer"
            onClick={() => history.push(`/property/${property.id}`)}
          >
            <img />
            <div className="flex flex-col">
              <span>
                <b>Street Address:</b> {property.street_adderss}
              </span>
              <span>
                <b>Estimated Value:</b> $
                {property.estimated_value.toLocaleString({
                  style: "currency",
                  currency: "usd",
                })}
              </span>
              <span>
                <b>Estimated ARV:</b> $
                {property.after_repair_value.toLocaleString({
                  style: "currency",
                  currency: "usd",
                })}
              </span>
              <span>
                <b>Estimated Rent:</b> $
                {property.estimated_rent.toLocaleString({
                  style: "currency",
                  currency: "usd",
                })}
                /mo
              </span>
            </div>
          </div>
        ))}
        <button
          onClick={() => setIsOpen((prevState) => !prevState)}
          className="absolute bottom-8 right-8 w-12 h-12 bg-green-300 rounded-full text-white drop-shadow"
        >
          +
        </button>
      </div>
    </div>
  );
}
