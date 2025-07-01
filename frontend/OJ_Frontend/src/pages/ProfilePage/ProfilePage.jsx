import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavBar from "../../components/NavBar/NavBar";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  const formattedDate = new Date(user?.joined).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
        <NavBar />
        <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen px-6 py-16">
        <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-600 bg-clip-text text-transparent">
            Profile
            </h1>
            <p className="mt-2 text-gray-400">View your coding journey</p>
        </header>

        <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-8">
            <div>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">User Information</h2>
            <div className="text-gray-300 space-y-2">
                <p><span className="text-gray-500">Username:</span> {user?.username}</p>
                <p><span className="text-gray-500">Email:</span> {user?.email}</p>
                <p><span className="text-gray-500">Member Since:</span> {formattedDate}</p>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}
