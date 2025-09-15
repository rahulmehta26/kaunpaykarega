import { IconArrowRight } from "@tabler/icons-react"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Link } from "react-router-dom"
import HeroBanner from "../../../assets/hero-3d-banner.png"
import Features from "./Features"
import HowItWorks from "./HowItWorks"
import Testimonials from "./Testimonials"
import CTA from "./CTA"

const Home = () => {

    return (
        <section
            className=" flex flex-col wrapper "
        >

            <div
                className=" mt-10 lg:mt-16 md:pb-10 grid lg:grid-cols-2 items-center md:gap-12 "
            >

                <div
                    className="text-center lg:w-[28rem] xl:w-[50rem] lg:text-start mx-auto space-y-10 "
                >
                    <div className=" space-y-4 " >

                        <Badge
                            variant="outline"
                            className=" text-primary border-[0.05rem] border-orange-100 text-xs lg:text-sm font-medium bg-orange-50 rounded-4xl py-1 px-2 "
                        >
                            Never argue over who pays again
                        </Badge>

                        <h1
                            className=" mx-auto text-neutral-800 md:max-w-4xl font-extrabold tracking-tight text-4xl md:text-7xl "
                        >
                            The smartest way to <span className=" gradient-text" >split expenses</span> with friends
                        </h1>

                    </div>


                    <p
                        className=" mx-auto md:mx-0 max-w-[45rem] text-neutral-600 md:text-lg/relaxed tracking-tight "
                    >
                        Add expenses, see who owes what, and settle up in seconds — no spreadsheets, no reminders, no drama.
                    </p>

                    <div
                        className=" flex flex-col md:flex-row items-center gap-4 justify-center lg:justify-start "
                    >

                        <Button
                            asChild
                            size={"lg"}
                            className=" hover:bg-orange-600 bg-primary rounded-full cursor-pointer shadow-md text-shadow-md "

                        >
                            <Link to={"/dashboard"} >

                                Get Started

                                <IconArrowRight size={24} stroke={3} />

                            </Link>
                        </Button>

                        <Button
                            asChild
                            size={"lg"}
                            className=" border-primary border-2 text-primary bg-white hover:bg-orange-50/50 rounded-full cursor-pointer shadow-md text-shadow-sm "

                        >
                            <p >

                                See How It Works

                            </p>
                        </Button>
                    </div>

                </div>

                < div
                    className="flex justify-center lg:justify-end "
                >

                    <img
                        src={HeroBanner}
                        alt="JebCheck logo and illustration for splitting expenses with friends in orange theme"
                        className=" w-fit h-[34rem] object-contain "
                    />

                </div >

            </div>

            <Features />

            <HowItWorks />

            <Testimonials />

            <CTA />
        </section>
    )
}

export default Home
