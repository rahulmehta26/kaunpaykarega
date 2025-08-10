import { IconLayoutDashboard } from "@tabler/icons-react"
import JebCheck from "../../assets/jebcheck.svg"
import { useNavigate } from "react-router-dom"
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <nav
            className=" flex justify-between items-center "
        >

            <div>
                <img
                    src={JebCheck}
                    className="w-40 cursor-pointer h-fit"
                    alt="JebCheck svg"
                    onClick={() => navigate("/")}
                />
            </div>

            <div className=" flex items-center gap-x-8 " >

                <p className=" text-sm font-medium hover:text-primary transition cursor-pointer " > Features </p>
                <p className=" text-sm font-medium hover:text-primary transition cursor-pointer " > How it Works </p>

            </div>

            <div
                className=" flex items-center gap-4 "
            >

                <Authenticated>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className=" items-center gap-x-3 bg-white border-[0.1rem] cursor-pointer hidden md:inline-flex hover:text-primary hover:border-primary transition border-black px-3 rounded-lg py-0.5"
                    >

                        <IconLayoutDashboard size={18} />

                        <p>Dashboard</p>
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-white border-[0.1rem] cursor-pointer md:hidden transition border-black p-2 rounded-full"
                    >

                        <IconLayoutDashboard size={18} />

                    </button>

                    <UserButton />

                </Authenticated>

                <Unauthenticated>

                    <SignInButton>

                        <Button variant={"ghost"} className=" cursor-pointer rounded-full " >
                            Sign In
                        </Button>
                    </SignInButton>

                    <SignUpButton>

                        <Button
                            className=" bg-primary cursor-pointer hover:bg-orange-50 border-none rounded-full "
                        >
                            Get Started
                        </Button>
                    </SignUpButton>

                </Unauthenticated>



            </div>
        </nav>
    )
}

export default Navbar