import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import './globals.css';

export default function AuthSection() {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl w-fit mx-auto mt-8 transition-all hover:shadow-purple-500/20 hover:border-purple-500/30">
      <SignedOut>
        <span className="text-sm font-medium text-gray-300">Welcome to Vendor Portal</span>
        <SignInButton mode="modal">
          <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/30">
            Get Started
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-300">Your Account</span>
          <div className="border-l border-gray-700 h-6"></div>
          <div className="p-1 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full shadow-lg">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border-2 border-gray-900",
                  userButtonPopoverCard: "bg-gray-800 border border-gray-700"
                }
              }}
            />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}