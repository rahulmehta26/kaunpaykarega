import { Badge } from "@/components/ui/badge"
import { STEPS } from "@/content/landingData"

const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className=" md:py-12 py-4 "
        >
            <div
                className=" container mx-auto space-y-10 px-4 md:px-6 text-center  "
            >

                <div className=" space-y-4 " >

                    <Badge
                        variant='outline'
                        className=" bg-orange-50 text-primary rounded-full border-[0.05rem] border-orange-100 py-1 px-2 "
                    >
                        How It Works
                    </Badge>

                    <h1
                        className=" mx-auto text-neutral-800 text-3xl font-extrabold tracking-tight md:text-6xl "
                    >
                        <span className=" gradient-text" ><br />Splitting expenses</span> has never been easier
                    </h1>

                </div>

                <p
                    className=" mx-auto md:mx-0 text-neutral-600 md:text-lg/relaxed tracking-tight "
                >
                    Follow these simple steps to start tracking and splitting expenses with friends.
                </p>

                <div
                    className=" grid lg:grid-cols-3 mx-auto gap-10 md:grid-cols-2  "
                >
                    {
                        STEPS.map(({ description, label, title }) => (
                            <div
                                key={title}
                                className=" flex flex-col items-center space-y-2  "
                            >

                                <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-primary " >
                                    {
                                        label
                                    }
                                </div>

                                <h3 className=" text-xl font-bold " >{title}</h3>

                                <p className=" text-neutral-500 text-center " > {description} </p>

                            </div>
                        ))
                    }
                </div>

            </div>

        </section>
    )
}

export default HowItWorks