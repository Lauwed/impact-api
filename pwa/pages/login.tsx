import LoginForm from "../components/auth/LoginForm";
import Heading from "../components/common/Heading";
import Main from "../components/common/Main";

export default function Login() {
  return (
    <Main>
      <Heading>Login</Heading>
      <LoginForm />
    </Main>
  );
}
