import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { tokenRequest } from "../utils/authConfig";

export const useMsalAuth = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = instance.getActiveAccount() ?? accounts[0] ?? null;

  const getAccessToken = async () => {
    if (!account) return null;

    try {
      const response = await instance.acquireTokenSilent({
        ...tokenRequest,
        account,
      });
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        instance.acquireTokenRedirect(tokenRequest);
        return null;
      }
      throw error;
    }
  };

  const getRoles = async () => {
    const token = await getAccessToken();
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.roles || [];
    } catch (err) {
      console.error("Failed to decode access token", err);
      return [];
    }
  };

  return {
    instance,
    account,
    isAuthenticated: accounts.length > 0,
    inProgress,
    getAccessToken,
    getRoles, // for UI authorization
  };
};
