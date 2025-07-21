"use client";

import { useSessionStore } from "@/store/session";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { applications } from "@/data/applications";
import { ApplicationCard } from "@/components/application-card";

export default function ActorProfilePage() {
    const { user } = useSessionStore();

    const getInitials = (email: string) => {
        return email ? email.charAt(0).toUpperCase() : "";
    };
    
    if (!user) {
        return (
            <div className="container mx-auto p-4 sm:p-6 md:p-8">
                <p>Please log in to view your profile.</p>
            </div>
        )
    }

    const userApplications = applications.filter(app => app.actorId === user.id);

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{user.email.split('@')[0]}</CardTitle>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-500">Mumbai, India</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div>
                <h2 className="text-2xl font-bold">Your Applications</h2>
                <p className="text-gray-500 mb-6">Here’s a list of roles you’ve applied to.</p>

                {userApplications.length > 0 ? (
                    <div className="space-y-4">
                        {userApplications.map(app => (
                            <ApplicationCard key={app.id} application={app} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium">You haven’t applied to any roles yet.</h3>
                    </div>
                )}
            </div>
        </div>
    )
} 