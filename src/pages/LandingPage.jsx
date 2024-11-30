import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>

      <Link to="/login">Login</Link>
    </div>
  );
}

export default LandingPage;
