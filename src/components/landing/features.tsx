import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Video, FileText } from "lucide-react";

const actorFeatures = [
    {
        icon: <FileText className="h-8 w-8 text-blue-500" />,
        title: "Discover Auditions",
        description: "Browse and filter a wide range of casting calls for movies, TV shows, and ads."
    },
    {
        icon: <User className="h-8 w-8 text-blue-500" />,
        title: "Build Your Portfolio",
        description: "Showcase your talent with a professional portfolio including headshots, videos, and your resume."
    },
    {
        icon: <Video className="h-8 w-8 text-blue-500" />,
        title: "Apply with Ease",
        description: "Submit your applications directly to casting directors with just a few clicks."
    }
]

const producerFeatures = [
    {
        icon: <FileText className="h-8 w-8 text-green-500" />,
        title: "Post Casting Calls",
        description: "Create and manage casting calls, defining specific roles and requirements."
    },
    {
        icon: <User className="h-8 w-8 text-green-500" />,
        title: "Find Talent",
        description: "Access a diverse pool of actors and review their applications in one place."
    },
    {
        icon: <Video className="h-8 w-8 text-green-500" />,
        title: "Streamline Casting",
        description: "Shortlist and manage applicants efficiently, saving you time and effort."
    }
]

export function Features() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">What We Offer</h2>
                    <p className="text-gray-500 mt-2">The ultimate platform for actors and producers.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 text-center">For Actors</h3>
                        <div className="space-y-6">
                            {actorFeatures.map((feature, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        {feature.icon}
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 text-center">For Producers</h3>
                        <div className="space-y-6">
                            {producerFeatures.map((feature, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        {feature.icon}
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 