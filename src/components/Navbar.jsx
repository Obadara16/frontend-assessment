import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, resetUser, logoutUser } from "../features/user/userSlice";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getUser());
    }
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, token, user]);

  const handleLogout = () => {
    dispatch(logout()); 
    dispatch(logoutUser());
    dispatch(resetUser());
    navigate("/login");
  };

  return (
    <nav className="theme p-4">
      <div className="max-w-5xl mx-auto flex justify-between">
        <div>
          {user ? (
            <Link to="/posts" className="text-white">
              Posts
            </Link>
          ) : (
            <Link to="/" className="text-white">
              Home
            </Link>
          )}
        </div>
        <div>
          {user ? (
            <>
              <span className="text-white mr-4">Welcome, {user?.username}</span>
              <button onClick={handleLogout} className="text-white mr-4">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
