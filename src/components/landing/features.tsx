import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Video, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                <Tabs defaultValue="actors" className="w-full max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="actors">For Actors</TabsTrigger>
                        <TabsTrigger value="producers">For Producers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="actors">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                            {actorFeatures.map((feature, index) => (
                                <Card key={index} className="text-center">
                                    <CardHeader>
                                        <div className="flex justify-center mb-4">{feature.icon}</div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="producers">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                            {producerFeatures.map((feature, index) => (
                                <Card key={index} className="text-center">
                                    <CardHeader>
                                        <div className="flex justify-center mb-4">{feature.icon}</div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
} 