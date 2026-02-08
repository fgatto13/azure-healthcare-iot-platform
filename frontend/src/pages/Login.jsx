import { Button, Container } from "react-bootstrap";
import { useMsalAuth } from "../hooks/useMsalAuth";

export const Login = () => {
  const { instance, account, isAuthenticated } = useMsalAuth();

  const login = () => {
    instance.loginRedirect().catch(console.error);
  };

  const logout = () => {
    instance.logoutRedirect().catch(console.error);
  };

  if (!isAuthenticated) {
    return (
      <Container className="App">
        <h2>You are not signed in</h2>
        <Button onClick={login}>Sign in</Button>
      </Container>
    );
  }

  return (
    <Container className="App">
      <h2>Welcome</h2>
      <p>
        Signed in as <strong>{account.username}</strong>
      </p>

      <Button variant="warning" onClick={logout}>
        Sign out
      </Button>
    </Container>
  );
};