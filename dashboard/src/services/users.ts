import axios from "axios";

const API_BASE_URL = "http://localhost:8000/users";

interface IRegister {
  username: string;
  email: string;
  password: string;
}
interface ILogin {
  email: string;
  password: string;
}

// Get all users
export const getAllUsers = async (page: number, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`, {
      params: { page, limit },
    });

    // Ensure the response data exists
    if (!response || !response.data) {
      console.warn("No response data received from the API.");
      return null;
    }

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching users get all users method:", errorMessage);
    return { success: false, msg: errorMessage };
  }
};

// create new user
export const register = async (data: IRegister) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/register`, data);
    return res.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching users get all users method:", errorMessage);
    return { success: false, msg: errorMessage };
  }
};

// login
// export const login = async (data: ILogin) => {
//   try {
//     const res = await axios.post(`${API_BASE_URL}/login`, data);

//     return res.data;
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     return { success: false, msg: errorMessage };
//   }
// };
// login function to handle the login request
export const login = async (data: ILogin) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, data);

    // If the response is successful, return the data
    return res.data;
  } catch (error) {
    // If the request fails, check if it's an error from the server
    if (axios.isAxiosError(error) && error.response) {
      // Return the error message from the backend
      return error.response.data;
    } else {
      // If the error is not from the backend, return a generic message
      return { success: false, msg: "An unexpected error occurred" };
    }
  }
};

// delete user
export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);

    if (!response) {
      console.error("there's no response !!");
      return null;
    }
  } catch (error) {
    const responseError =
      error instanceof Error ? error.message : String(error);

    console.log("method delete catch error =>", responseError);
    return null;
  }
};
