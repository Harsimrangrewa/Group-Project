import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {" | "}

      {!token && (
        <>
          <Link to="/register">Register</Link>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
        </>
      )}

      {token && (
        <>
          <Link to="/users">Users</Link>
          {" | "}
          <Link to="/gardens">Gardens</Link>
          {" | "}
          <Link to="/flowers">Flowers</Link>
          {" | "}
          <Link to="/events">Events</Link>
          {" | "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
