import Button from "../Button"
import { useAuth } from "../context/auth";

const LogoutButton = () => {
    const { logout } = useAuth();

    return (
        <Button onClick={logout}>Logout</Button>
    )
}

export default LogoutButton