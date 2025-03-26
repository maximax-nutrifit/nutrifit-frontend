import { FaBell } from "react-icons/fa";

function Header() {
  return ( 
    <div className="flex justify-between items-center pb-4 bg-gray-600">
      <div className="flex items-center gap-3">
        <img src="/assets/avatar.png" alt="User Avatar" className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold">John Doe</h2>
          <p className="text-sm text-gray-400">GOAL: "Lose weight 🔥"</p>
        </div>
      </div>
      <div className="relative">
        <FaBell className="text-2xl cursor-pointer" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 py-1 rounded-full">3</span>
      </div>
    </div>
  );
}

export default Header;
