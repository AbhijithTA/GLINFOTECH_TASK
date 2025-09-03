import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../fireBaseConfig";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Fetching the user details from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn("No profile data found in Firestore");
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) {
    return <p className="text-center mt-10">No user logged in.</p>;
  }

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>

      {userData ? (
        <div className="space-y-3">
          <div>
            <span className="font-medium">Name:</span>{" "}
            {userData.name || user.displayName}
          </div>
          <div>
            <span className="font-medium">Email:</span> {userData.email}
          </div>
          <div>
            <span className="font-medium">Mobile:</span> {userData.mobile}
          </div>
          <div>
            <span className="font-medium">DOB:</span> {userData.dob}
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </section>
  );
}
