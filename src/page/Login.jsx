import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { baseUrl } from "../helper";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useCookie from "../hook/useCookie";
import Input from "../components/Input";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useCookie("token", null);

    const navigate = useNavigate();

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
                setToken(res.data.token, { expires: 365 });
                toast.success("Login");
                navigate("/");
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

    if (token) {
        return navigate("/");
    }
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to Your Account</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Email" id="email" type="email" required register={register} errorMessage={errorMessage.email} />
                        <Input label="Password" id="password" type="password" required register={register} errorMessage={errorMessage.password} />
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
