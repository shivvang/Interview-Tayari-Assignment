
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleCreateSubmission = () => {
    navigate("/createSubmission"); // Navigate to the create submission page
  };

  const handleLogout = () => {
    fetch("http://localhost:7000/api/auth/logout",{
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          alert("Logged out successfully");
          navigate("/login"); // Redirect to login page
        } else {
          alert("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert("An error occurred while logging out");
      });
  };
  

  return (
    <nav className="bg-blue-600 p-4 shadow-md top-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo or Title */}
        <h1 className="text-white text-xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
          Dashboard
        </h1>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCreateSubmission}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow-sm hover:bg-blue-100 transition"
          >
            Create Submission
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
