import axios from "axios";
import { baseUrl } from "../helper";
import { useEffect, useState } from "react";
import useCookie from "../hook/useCookie";
import { toast } from "react-hot-toast";
import TableItems from "../components/TableItems";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Home = () => {
    const [dataBuku, setDataBuku] = useState([]);
    const [token, setToken] = useCookie("token", null);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    console.log(format(new Date(), "yyyy-MM-dd"));

    useEffect(() => {
        const url = baseUrl + `/api/books?page=${currentPage}`;
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };

        axios
            .get(url, { headers })
            .then((res) => {
                setDataBuku(res.data.data);
                setMaxPage(res.data.last_page);
            })
            .catch(({ response: res }) => {
                if (res.status === 401) {
                    return toast.error("User is unauthenticated!");
                }
                if (res.status === 500) {
                    return toast.error("Server Error!");
                }
                return toast.error("Something went wrong!");
            });
    }, [currentPage, token]);

    return (
        <div className="px-3 py-2 w-full">
            <div className="mb-3 flex items-center justify-between">
                <h1 className="text-4xl font-bold">Books</h1>
                <Link to={"/add"} className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white">
                    Add book
                </Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                author
                            </th>
                            <th scope="col" className="px-6 py-3">
                                published
                            </th>
                            <th scope="col" className="px-6 py-3">
                                publisher
                            </th>
                            <th scope="col" className="px-6 py-3">
                                pages
                            </th>
                            <th scope="col" className="px-6 py-3">
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBuku.map((item) => (
                            <TableItems key={item.id} id={item.id} title={item.title} author={item.author} published={format(new Date(item.published), "P")} publisher={item.publisher} pages={item.pages} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-3 flex justify-center">
                <ReactPaginate
                    nextLabel="next"
                    onPageChange={(i) => setCurrentPage(i)}
                    pageRangeDisplayed={3}
                    pageCount={maxPage}
                    previousLabel="prev"
                    renderOnZeroPageCount={null}
                    pageLinkClassName="px-3 py-2 text-gray-900 bg-gray-50 flex items-center"
                    activeLinkClassName="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center"
                    previousLinkClassName="px-3 py-2 text-gray-900 bg-gray-50 hover:bg-gray-100 flex items-center"
                    nextLinkClassName="px-3 py-2 text-gray-900 bg-gray-50 hover:bg-gray-100 flex items-center"
                    className="flex items-center rounded-md overflow-hidden"
                />
            </div>
        </div>
    );
};

export default Home;
