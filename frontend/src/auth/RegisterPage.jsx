import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import ErrorToast from "../components/ErrorToast";
import InputField from "./InputField";
import useRegister from "./useRegister";
import { registerSchema } from "./validationSchema";

function Register() {
  const {
    register: registerHandle,
    error,
    setError,
    isLoading,
  } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    await registerHandle(data);
  };

  if (isLoading) return <p>loading....</p>;

  return (
    <div className="min-h-screen flex flex-col gap-y-10 items-center justify-center bg-white text-black">
      <h1 className="text-3xl font-semibold mb-2">Register</h1>

      <form
        className="w-full max-w-md px-6 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Username */}
        <div>
          <InputField
            type="text"
            placeholder="Username"
            {...register("userName")}
          />
          {errors.userName && (
            <ErrorMessage message={errors.userName.message} />
          )}
        </div>

        {/* Email */}
        <div>
          <InputField type="email" placeholder="Email" {...register("email")} />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>

        {/* Password */}
        <div>
          <InputField placeholder="Password" {...register("password")} />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
        </div>

        {/* register*/}
        <button className="black-btn" type="submit">
          Register
        </button>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Login */}
        <Link className="white-btn" to="/users/login">
          Login
        </Link>
      </form>

      {error && <ErrorToast message={error} onClose={() => setError("")} />}
    </div>
  );
}

export default Register;
