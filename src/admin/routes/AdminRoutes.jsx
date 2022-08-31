import { Navigate, Route, Routes } from "react-router-dom"

import { AdminPage } from "../pages/AdminPage"
import { Store } from "../pages/Store"
import { WareHouse } from "../pages/WareHouse"
import { Worker } from "../pages/Workers"

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminPage />} />
            <Route path="/warehouse" element={<WareHouse />} />
            <Route path="/store" element={<Store />} />
            <Route path="/worker" element={<Worker />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}