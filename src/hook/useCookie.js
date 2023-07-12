import { useState } from "react";
import Cookies from "js-cookie";

const useCookie = (key, initialValue) => {
    const [cookie, setCookie] = useState(() => {
        const cookieValue = Cookies.get(key);
        return cookieValue ? cookieValue : initialValue;
    });
    const updateCookie = (value, options) => {
        setCookie(value);
        Cookies.set(key, value, options);
    };
    return [cookie, updateCookie];
};
export default useCookie;
