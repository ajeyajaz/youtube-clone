function Register() {
  return (
    <div className="min-h-screen flex flex-col gap-y-10 items-center justify-center bg-white text-black">
      <h1 className="text-3xl font-semibold mb-2">Register</h1>

      <div className="w-full max-w-md px-6 flex flex-col gap-4">
        {/* Username */}
        <input
          type="username"
          placeholder="Username"
          className="w-full px-5 py-3 rounded-full border border-gray-300"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-5 py-3 rounded-full border border-gray-300"
        />

        {/* Password */}
        <input
          placeholder="Password"
          className="w-full px-5 py-3 rounded-full border border-gray-300 focus:border-black"
        />

        {/* Continue */}
        <button className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition cursor-pointer">
          Continue
        </button>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Login */}
        <button className="w-full py-3 rounded-full border border-gray-300 font-medium hover:bg-gray-50 transition cursor-pointer">
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
