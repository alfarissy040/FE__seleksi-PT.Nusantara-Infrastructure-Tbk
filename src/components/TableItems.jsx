import { HiEye, HiPencilSquare, HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";

const TableItems = ({ id, title, author, published, publisher, pages, onDelete }) => {
    return (
        <tr className="bg-white border-b  hover:bg-gray-50">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {title}
            </th>
            <td className="px-6 py-4">{author}</td>
            <td className="px-6 py-4">{published}</td>
            <td className="px-6 py-4">{publisher}</td>
            <td className="px-6 py-4">{pages}</td>
            <td className="px-6 py-4 text-right flex items-center gap-2">
                {/* view */}
                <Link to={`/${id}`}>
                    <HiEye className="w-5 h-5 text-gray-900" />
                </Link>
                {/* edit */}
                <Link to={`/${id}/edit`}>
                    <HiPencilSquare className="w-5 h-5 text-gray-900" />
                </Link>
                {/* delete */}
                <HiTrash className="w-5 h-5 text-gray-900 hover:text-rose-600 cursor-pointer" onClick={() => onDelete(id)} />
            </td>
        </tr>
    );
};

export default TableItems;
