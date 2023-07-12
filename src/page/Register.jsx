import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../helper";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const url = baseUrl + "/api/register";
        const headers = {
            Accept: "application/json",
        };

        axios
            .post(url, data, { headers })
            .then(() => {
                toast.success("Success register, please login!");
                navigate("/login");
            })
            .catch(({ response: res }) => {
                if (res.status === 422) {
                    setErrorMessage(res.data.errors);
                    return toast.error("Request body error!");
                }
                if (res.status === 500) {
                    return toast.error("Server Error!");
                }
                return toast.error("Something went wrong!");
            })
            .finally(() => setIsLoading(false));
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a New Account</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Fullname
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    {...register("name")}
                                />
                                {errorMessage.name &&
                                    errorMessage.name.map((error) => (
                                        <p className="mt-2 text-sm text-red-600" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    {...register("email")}
                                />
                                {errorMessage.email &&
                                    errorMessage.email.map((error) => (
                                        <p className="mt-2 text-sm text-red-600" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    {...register("password")}
                                />
                                {errorMessage.password &&
                                    errorMessage.password.map((error) => (
                                        <p className="mt-2 text-sm text-red-600" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Password Confirmation
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    autoComplete="password_confirmation"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    {...register("password_confirmation")}
                                />
                                {errorMessage.password &&
                                    errorMessage.password.map((error) => (
                                        <p className="mt-2 text-sm text-red-600" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-500 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="flex items-center justify-center">
                            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
