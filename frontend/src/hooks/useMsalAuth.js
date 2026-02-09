import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const tokenRequest = {
  scopes: [`api://${import.meta.env.VITE_API_ID}/access_as_user`],
};

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
      }
      throw error;
    }
  };

  return {
    instance,
    account,
    isAuthenticated: accounts.length > 0,
    claims: account?.idTokenClaims,
    inProgress,
    getAccessToken,
  };
};
