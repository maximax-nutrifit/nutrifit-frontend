import { FaBell } from "react-icons/fa";

function Header() {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white w-full p-4 max-w-screen mx-auto">
      <div className="flex items-center space-x-3">
        <img src="/assets/avatar.png" alt="Profile" className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-400 text-sm">
            GOAL: <span className="text-orange-400">"Lose weight 🔥"</span>
          </p>
        </div>
      </div>
      <div className="relative">
        <FaBell className="text-gray-400 text-2xl cursor-pointer" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          3
        </span>
      </div>
    </div>
  );
}

export default Header;
