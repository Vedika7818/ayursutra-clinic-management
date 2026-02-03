import axios from "axios";

export const login = async (data) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    {
      username: data.username,
      password: data.password
    }
  );
  return response.data;
};
