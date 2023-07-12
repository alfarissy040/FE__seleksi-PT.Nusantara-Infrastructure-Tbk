import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../helper";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../components/Input";

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
                        <Input label="Fullname" id="name" type="text" required register={register} errorMessage={errorMessage.name} />
                        <Input label="Email" id="email" type="email" required register={register} errorMessage={errorMessage.email} />
                        <Input label="Password" id="password" type="password" required register={register} errorMessage={errorMessage.password} />
                        <Input label="Confirm password" id="confirm_password" type="password" required register={register} errorMessage={errorMessage.confirm_password} />
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
