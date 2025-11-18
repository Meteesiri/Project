import axios from "axios";
import type { GoogleUserProfile } from "./useGoogle.types";

export const useGoogle = () => {
  const token = localStorage.getItem("googleToken");
  const fetchUserProfile = async (): Promise<GoogleUserProfile | null> => {
    if (!token) {
      return null;
    }

    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return data;
  };

  return {
    fetchUserProfile,
  };
};
