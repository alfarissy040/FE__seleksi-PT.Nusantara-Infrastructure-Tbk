import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import MainLayout from "./layout/MainLayout";
import Add from "./components/form/Add";
import View from "./components/form/View";
import Edit from "./components/form/Edit";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route Component={MainLayout}>
                    <Route path="/" Component={Home}>
                        <Route path="/:bookId" Component={View} />
                    </Route>
                    <Route path="/add" Component={Add} />
                    <Route path="/:bookId/edit" Component={Edit} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
