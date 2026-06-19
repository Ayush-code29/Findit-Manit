import axios from "axios";

const API =
  "http://localhost:5000/api/claims";

export const createClaim =
  async (claimData) => {
    try {
      const res = await axios.post(
        API,
        claimData
      );

      return res.data;
    } catch (error) {
      throw (
        error.response?.data ||
        error
      );
    }
  };

export const getUserClaims =
  async (userId) => {
    try {
      const res = await axios.get(
        `${API}/user/${userId}`
      );

      return res.data;
    } catch (error) {
      throw (
        error.response?.data ||
        error
      );
    }
  };

export const approveClaim =
  async (claimId) => {
    try {
      const res = await axios.patch(
        `${API}/${claimId}/approve`
      );

      return res.data;
    } catch (error) {
      throw (
        error.response?.data ||
        error
      );
    }
  };

export const rejectClaim =
  async (claimId) => {
    try {
      const res = await axios.patch(
        `${API}/${claimId}/reject`
      );

      return res.data;
    } catch (error) {
      throw (
        error.response?.data ||
        error
      );
    }
  };