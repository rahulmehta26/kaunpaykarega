import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"
import { Link } from "react-router-dom"

const CTA = () => {
    return (
        <section
            className=" gradient-bg w-full py-6 md:py-10 "
            id="how_it_works"
        >
            <div
                className=" mx-auto px-4 md:px-6 text-center space-y-6 "
            >
                <h2 className=" text-3xl font-extrabold tracking-tight md:text-4xl text-white " >
                    Ready to simplify expense sharing?
                </h2>

                <p
                    className=" mx-auto max-w-[38rem] text-orange-100 md:text-xl/relaxed "
                >
                    Join thousands of users who have made splitting expenses stress free.
                </p>

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

            </div>
        </section>
    )
}

export default CTA