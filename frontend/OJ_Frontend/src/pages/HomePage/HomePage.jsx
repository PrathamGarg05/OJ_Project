import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export default function HomePage() {
  return (
    <div className="dark:bg-black bg-white text-black min-h-screen flex flex-col">
        <NavBar />
        <header className="py-20 px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
                Welcome to CodeNest
            </h1>
            <p className="text-xl dark:text-gray-300 text-gray-800 max-w-2xl mx-auto mb-8">
                Practice coding with real-time execution, instant feedback, and a sleek developer experience.
            </p>
            <Link
                to="/problems"
                className="dark:bg-purple-600 bg-purple-100 hover:dark:bg-purple-700 hover:bg-purple-200 px-8 py-3 rounded-full text-lg font-medium transition shadow-lg hover:shadow-purple-700/50"
                >
                Get Started
            </Link>
        </header>
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
            {[
            {
                title: "Blazing Fast Execution",
                desc: "Run code inside Docker containers for secure and instant feedback.",
            },
            {
                title: "Beautiful Code Editor",
                desc: "Supports syntax highlighting, themes, and multiple languages.",
            },
            {
                title: "Submission Tracker",
                desc: "Review your past submissions and improve over time.",
            },
            ].map((item, index) => (
            <div
                key={index}
                className="dark:bg-gray-800 bg-gray-100 border border-gray-700 rounded-xl p-6 shadow-xl hover:shadow-cyan-500/20 transition"
            >
                <h3 className="text-xl font-bold dark:text-cyan-400 text-cyan-800 mb-2">{item.title}</h3>
                <p className="dark:text-gray-300 text-gray-800 text-sm">{item.desc}</p>
            </div>
            ))}
        </section>
        <Footer />
    </div>
  )
}
