import Header from "@/components/header/Header"
import Navbar from "@/components/header/Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <section className="min-h-screen flex flex-col">

            <Header>

                <Navbar />

            </Header>

            <main className=" flex-1 " >

                <Outlet />

            </main>

        </section>
    )
}

export default Layout