// Authentication logic hook
import { useMsal } from "@azure/msal-react";

export const useMsalAuth = () => {
  const { instance, accounts, inProgress } = useMsal();

  const account = instance.getActiveAccount() ?? accounts[0] ?? null;

  return {
    instance,
    account,
    isAuthenticated: accounts.length > 0,
    claims: account?.idTokenClaims,
    inProgress,
  };
};