import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
    {
        quote: "AuditionPe made it incredibly easy to find auditions and apply. I got my first role through this platform!",
        name: "Priya Sharma",
        role: "Actor",
        avatar: "/avatars/01.png"
    },
    {
        quote: "As a casting director, finding the right talent is crucial. AuditionPe has a fantastic pool of actors and the platform is very intuitive.",
        name: "Rohan Mehra",
        role: "Casting Director",
        avatar: "/avatars/02.png"
    },
    {
        quote: "I love how I can manage all my applications in one place. The portfolio feature is a great way to showcase my work.",
        name: "Anjali Singh",
        role: "Actor",
        avatar: "/avatars/03.png"
    },
    {
        quote: "The quality of applications I receive through AuditionPe is consistently high. It has become an indispensable tool for my casting process.",
        name: "Karan Kapoor",
        role: "Producer",
        avatar: "/avatars/04.png"
    }
];

export function Testimonials() {
    return (
        <section className="py-20">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">What Our Users Say</h2>
                    <p className="text-gray-500 mt-2">Real stories from our growing community.</p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="pt-6 flex flex-col items-center text-center">
                                            <p className="italic h-32">&quot;{testimonial.quote}&quot;</p>
                                            <div className="flex flex-col items-center mt-4">
                                                <Avatar>
                                                    <AvatarImage src={testimonial.avatar} />
                                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4 mt-2">
                                                    <p className="font-semibold">{testimonial.name}</p>
                                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
} 