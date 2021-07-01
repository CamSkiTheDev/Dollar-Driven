import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export default function useValidateUser() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const validateUser = async (token) =>
    await fetch(`${process.env.REACT_APP_API_URL}/login/validate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setIsLoading(false);
          return history.push("/dashboard");
        }
      });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("login_token"));

    if (token && !user) {
      return validateUser(token);
    }
  }, []);

  return { isLoading, user };
}
