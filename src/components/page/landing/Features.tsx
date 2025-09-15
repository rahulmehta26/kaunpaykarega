import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { FEATURES } from "@/content/landingData"

const Features = () => {
    return (
        <section
            id="features"
            className=" bg-gray-50 md:py-12 py-4 "
        >

            <div
                className=" container mx-auto space-y-10 px-4 md:px-6 text-center  "
            >

                <div className=" space-y-4 " >

                    <Badge
                        variant='outline'
                        className=" bg-orange-50 text-primary rounded-full border-[0.05rem] border-orange-100 py-1 px-2 "
                    >
                        Features
                    </Badge>

                    <h1
                        className=" mx-auto text-neutral-800 text-3xl font-extrabold tracking-tight md:text-6xl "
                    >
                        Everything you need to <span className=" gradient-text" ><br />split expenses</span>
                    </h1>
                </div>

                <p
                    className=" mx-auto md:mx-0 text-neutral-600 md:text-lg/relaxed tracking-tight "
                >
                    Our platform provides all the tools you need to handle shared expenses with ease.
                </p>

                <div
                    className=" grid lg:grid-cols-3 mx-auto gap-6 md:grid-cols-2 "
                >
                    {
                        FEATURES.map(({ Icon, bg, color, description, title }) => (
                            <Card
                                key={title}
                                className=" flex flex-col items-center space-y-4 p-6 text-center "
                            >

                                <div className={` rounded-full ${bg} p-2 `} >
                                    <Icon className={` h-6 w-6 ${color} `} />
                                </div>

                                <h3 className=" text-xl font-bold " >{title}</h3>

                                <p className=" text-neutral-500 " > {description} </p>

                            </Card>
                        ))
                    }
                </div>

            </div>

        </section>
    )
}

export default Features