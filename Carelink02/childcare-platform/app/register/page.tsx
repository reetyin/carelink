
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">注册 CareLink</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input type="password" className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input type="password" className="w-full px-3 py-2 border rounded" required />
          </div>
          <button type="submit" className="w-full py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">Sign up</button>
        </form>
        <div className="my-6">
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-sm font-medium">Or continue with</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>
          <div className="flex justify-center gap-4 mb-2">
            <button className="p-3 rounded-full border hover:bg-gray-100 shadow-sm" aria-label="Sign up with Google">
              <FcGoogle size={28} />
            </button>
            <button className="p-3 rounded-full border hover:bg-gray-100 text-blue-600 shadow-sm" aria-label="Sign up with Facebook">
              <FaFacebook size={26} />
            </button>
            <button className="p-3 rounded-full border hover:bg-gray-100 text-black shadow-sm" aria-label="Sign up with Apple">
              <FaApple size={26} />
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
