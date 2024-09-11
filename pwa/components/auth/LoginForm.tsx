import { FormEvent, useState } from "react";
import Button from "../Button";
import { useAuth } from "../context/auth";
import FormControl from "../form/FormControl";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        name="username"
        id="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <FormControl
        type="password"
        name="password"
        id="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Login</Button>

      {error ? <p className="p-2 w-fit bg-red-200 mt-4">{error}</p> : <></>}
    </form>
  );
};

export default LoginForm;
