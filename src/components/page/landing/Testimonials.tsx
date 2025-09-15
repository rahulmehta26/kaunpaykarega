import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TESTIMONIALS } from "@/content/landingData"

const Testimonials = () => {
    return (
        <section
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
                        Testimonials
                    </Badge>

                    <h1
                        className=" mx-auto text-neutral-800 text-3xl font-extrabold tracking-tight md:text-6xl "
                    >
                        What our users are saying
                    </h1>
                </div>

                <div
                    className=" grid lg:grid-cols-3 mx-auto gap-6 md:grid-cols-2 "
                >
                    {
                        TESTIMONIALS.map(({ image, name, quote, role }) => (
                            <Card
                                key={image}
                                className=" flex flex-col items-center py-6 px-4 text-center "
                            >

                                <CardContent className=" justify-between flex flex-col space-y-5 " >

                                    <p className=" text-neutral-500 text-center " > {quote} </p>

                                    <div className=" flex items-center gap-x-3 " >

                                        <Avatar>
                                            <AvatarImage src={image} alt={name} />
                                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                        </Avatar>

                                        <div className=" text-left " >

                                            <h3 className=" text-sm font-medium " >{name}</h3>

                                            <p className=" text-sm text-muted-foreground " >{role}</p>
                                        </div>
                                    </div>

                                </CardContent>


                            </Card>
                        ))
                    }
                </div>

            </div>

        </section>
    )
}

export default Testimonials