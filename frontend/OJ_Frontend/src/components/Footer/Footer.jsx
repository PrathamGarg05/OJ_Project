import { Link } from "react-router-dom";

function Footer() {
  return (
      <footer className="mt-auto border-t border-gray-800 py-10 text-sm text-gray-500">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-white text-lg font-bold mb-2">CodeNest</h2>
            <p>CodeNest is your futuristic platform to practice coding effectively.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Explore</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-cyan-400">Home</Link>
              </li>
              <li>
                <Link to="/problems" className="hover:text-cyan-400">Problems</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-cyan-400">Profile</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Connect</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-cyan-400">GitHub</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400">Discord</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-600">
          © {new Date().getFullYear()} CodeNest. All rights reserved.
        </div>
      </footer>
  );
}

export default Footer;