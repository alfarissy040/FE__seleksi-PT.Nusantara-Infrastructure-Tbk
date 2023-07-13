/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../helper";
import useCookie from "../../hook/useCookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { HiArrowUpRight } from "react-icons/hi2";
import ViewLoading from "./ViewLoading";

const View = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [props, setProps] = useState([]);
    const { isbn, title, subtitle, author, published, publisher, pages, description, website } = props;
    const [token] = useCookie("token", null);
    const navigation = useNavigate();

    useEffect(() => {
        const url = baseUrl + `/api/books/${params.bookId}`;
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };

        setIsLoading(true);

        axios
            .get(url, { headers })
            .then((res) => setProps(res.data))
            .catch(({ response: res }) => {
                if (res.status === 401) {
                    navigation("/login");
                    return toast.error("User is unauthenticated!");
                }
                if (res.status === 403) {
                    return toast.error("User doesn't have right to do the request!");
                }
                if (res.status === 404) {
                    return toast.error("Book ID not found!");
                }
                if (res.status === 500) {
                    return toast.error("Server Error!");
                }
                return toast.error("Something went wrong!");
            })
            .finally(() => setIsLoading(false));
    }, [params.bookId, token]);

    return isLoading ? (
        <ViewLoading />
    ) : (
        <div className="w-full h-screen z-50 bg-zinc-900 bg-opacity-60 absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-3xl rounded-lg shadow-md bg-white px-4 py-2 relative">
                {/* close button */}
                <Link to="/" className="absolute top-2 right-3">
                    <HiXMark className="w-5 h-5 text-gray-600" />{" "}
                </Link>
                {/* content */}
                <div className="mb-2">
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <subtitle className="text-neutral-500">{subtitle}</subtitle>
                </div>
                <div className="grid grid-cols-6 gap-y-2">
                    <p className="flex-1 w-full col-span-6">{description}</p>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <h3 className="col-span-1">ISBN:</h3>
                        <p className="col-span-2 flex-1">{isbn}</p>
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <h3 className="col-span-1">Author</h3>
                        <p className="col-span-2 flex-1">{author}</p>
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <h3 className="col-span-1">Published:</h3>
                        <p className="col-span-2 flex-1">{new Date(published).toLocaleString("id", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <h3 className="col-span-1">Publisher:</h3>
                        <p className="col-span-2 flex-1">{publisher}</p>
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <h3 className="col-span-1">Pages:</h3>
                        <p className="col-span-2 flex-1">{pages}</p>
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <h3 className="col-span-1">Website</h3>
                        <a href={website} target="_blank" rel="noreferrer" className="col-span-2 flex-1 group inline">
                            {website}{" "}
                            <span className="group-hover:inline-block hidden">
                                <HiArrowUpRight className="w-4 h-4 text-gray-500" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;
