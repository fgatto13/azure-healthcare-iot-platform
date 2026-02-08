// Authentication logic hook
import { useMsal } from "@azure/msal-react";

export const useMsalAuth = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = instance.getActiveAccount() ?? accounts[0] ?? null;

  return {
    instance,
    account,
    isAuthenticated: !!account,
    claims: account?.idTokenClaims,
    inProgress
  };
};
