import { useForm } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../helper";
import Input from "../Input";
import { useState } from "react";
import axios from "axios";
import useCookie from "../../hook/useCookie";
import { toast } from "react-hot-toast";
import clsx from "clsx";

const Add = () => {
    const [token, setToken] = useCookie("token", null);
    const [errorMessage, setErrorMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit } = useForm();
    const navigation = useNavigate();

    const onSubmit = (data) => {
        const url = baseUrl + "/api/books/add";
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };
        axios
            .post(url, data, { headers })
            .then(() => {
                toast.success("success adding book");
                navigation("/");
            })
            .catch(({ response: res }) => {
                if (res.status === 401) {
                    return toast.error("User is unauthenticated!");
                }
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
        <div className="px-3 py-2 w-full">
            <div className="mb-4 flex items-center gap-3">
                <Link to="/">
                    <HiArrowLeft className="w-5 h-5 text-gray-900" />
                </Link>
                <h1 className="text-2xl font-bold">Add new book</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="md:grid md:grid-cols-2 md:gap-3">
                    {/* isbn */}
                    <Input type="number" label="ISBN" name="isbn" id="isbn" required register={register} errorMessage={errorMessage.isbn} disabled={isLoading} />
                    {/* title */}
                    <Input type="text" label="Title" name="title" id="title" required register={register} errorMessage={errorMessage.title} disabled={isLoading} />
                    {/* subtitle */}
                    <Input type="text" label="Subtitle" name="subtitle" id="subtitle" required register={register} errorMessage={errorMessage.subtitle} disabled={isLoading} />
                    {/* author */}
                    <Input type="text" label="Author" name="author" id="author" required register={register} errorMessage={errorMessage.author} disabled={isLoading} />
                    {/* published */}
                    <Input type="date" label="Published" name="published" id="published" required register={register} errorMessage={errorMessage.published} disabled={isLoading} />
                    {/* publisher */}
                    <Input type="text" label="Publisher" name="publisher" id="publisher" required register={register} errorMessage={errorMessage.publisher} disabled={isLoading} />
                    {/* pages */}
                    <Input type="number" label="Pages" name="pages" id="pages" required register={register} errorMessage={errorMessage.pages} disabled={isLoading} />
                    {/* website */}
                    <Input type="text" label="Website" name="website" id="website" required register={register} errorMessage={errorMessage.website} disabled={isLoading} />
                    {/* description */}
                    <div className="flex flex-col gap-2 flex-1 col-span-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows="6"
                            {...register("description")}
                            className={clsx(
                                "form-input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                errorMessage.description && "border-rose-600"
                            )}
                            disabled={isLoading}
                        ></textarea>
                        <div className="flex flex-col gap-0.5 mt-2">
                            {errorMessage.description &&
                                errorMessage.description.map((error) => (
                                    <p className="text-sm text-red-600" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end mt-3 mb-8">
                    <button type="submit" className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed" disabled={isLoading}>
                        add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
