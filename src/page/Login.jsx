import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { baseUrl } from "../helper";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSignIn } from "react-auth-kit";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const signIn = useSignIn();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        setIsLoading(true);
        const url = baseUrl + "/api/login";
        const headers = {
            Accept: "application/json",
        };

        axios
            .post(url, data, { headers })
            .then((res) => {
                if (
                    signIn({
                        token: res.data.token,
                        expiresIn: 1440,
                        tokenType: "Bearer",
                    })
                ) {
                    toast.success("Login");
                    navigate("/");
                }
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
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to Your Account</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                                    autoComplete="current-password"
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
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-500 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                Log in
                            </button>
                        </div>

                        <div className="flex items-center justify-center">
                            <Link to="/register" className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline">
                                Don't have an account? Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
