import Header from "@/components/header/Header"
import Navbar from "@/components/header/Navbar"
import { useStoreUser } from "@/hooks/useStoreUser"
import { Outlet } from "react-router-dom"

const Layout = () => {

    useStoreUser();

    return (
        <section className="min-h-screen w-full flex flex-col">

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