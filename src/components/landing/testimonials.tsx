import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index}>
                            <CardContent className="pt-6">
                                <p className="italic">&quot;{testimonial.quote}&quot;</p>
                                <div className="flex items-center mt-4">
                                    <Avatar>
                                        <AvatarImage src={testimonial.avatar} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
} 