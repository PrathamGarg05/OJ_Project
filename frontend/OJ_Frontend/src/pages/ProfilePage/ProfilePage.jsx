import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavBar from "../../components/NavBar/NavBar";
import { getUserStats } from "../../services/submit";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  const [userStats, setUserStats] = useState({});

  const formattedDate = (date) => new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function stats(userId) {
    const response = await getUserStats(userId);
    setUserStats(response.data.data);
  }

  useEffect(() => {
    stats(user.id);
  }, [user]);

  return (
    <>
        <NavBar />

        <div className="min-h-screen dark:bg-black  bg-white  text-black  px-4 md:px-10 py-10  dark:text-white">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-cyan-500 text-transparent bg-clip-text mb-10">
          Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <div className="md:w-1/3 dark:bg-gray-900 bg-gray-100 border border-gray-700 rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-4xl font-bold dark:text-white text-black shadow-md mb-4">
                  {user?.username?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold">
                  {user?.username}
              </h2>
              <p className="dark:text-gray-400 text-gray-800">
                  {user?.email}
              </p>
              <p className="dark:text-gray-400 text-gray-800 text-sm mt-2">
                  Joined on {formattedDate(user?.joined)}
              </p>
          </div>

          <div className="md:w-2/3 dark:bg-gray-900 bg-gray-100 border border-gray-700 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold dark:text-cyan-400 text-cyan-800 mb-4">
                  Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div className="dark:bg-gray-800 bg-gray-100 rounded-lg p-4 border border-gray-700">
                      <p className="dark:text-gray-400 text-gray-800 text-sm">
                          Problems Solved
                      </p>
                      <p className="text-2xl font-bold dark:text-green-400 text-green-800">
                          {userStats.problemsSolved ? userStats.problemsSolved.length : "--"}
                      </p>
                  </div>
                  <div className="dark:bg-gray-800 bg-gray-100 rounded-lg p-4 border border-gray-700">
                      <p className="dark:text-gray-400 text-gray-800 text-sm">
                          Submission Count
                      </p>
                      <p className="text-2xl font-bold dark:text-blue-400 text-blue-800">
                          {userStats.totalSubmissions ? userStats.totalSubmissions : "--"}
                      </p>
                  </div>
                  <div className="dark:bg-gray-800 bg-gray-100 rounded-lg p-4 border border-gray-700">
                      <p className="dark:text-gray-400 text-gray-800 text-sm">
                          Accuracy
                      </p>
                      <p className="text-2xl font-bold dark:text-yellow-400 text-yellow-800">
                          {(userStats.problemsSolved && userStats.totalSubmissions) ? `${(userStats.problemsSolved.length / userStats.totalSubmissions * 100).toFixed(2)}%` : "-- %"}
                      </p>
                  </div>
                  <div className="dark:bg-gray-800 bg-gray-100 rounded-lg p-4 border border-gray-700">
                      <p className="dark:text-gray-400 text-gray-800 text-sm">
                          Last Submission
                      </p>
                      <p className="text-md font-medium dark:text-white text-black">
                          {userStats.lastSubmission ? formattedDate(userStats.lastSubmission.createdAt) : "--"}
                      </p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
