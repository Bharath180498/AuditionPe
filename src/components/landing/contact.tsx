import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Contact() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Contact Us</h2>
                    <p className="text-gray-500 mt-2">Have questions? We&apos;d love to hear from you.</p>
                </div>
                <Card className="max-w-xl mx-auto">
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <Input placeholder="Your Name" />
                            <Input type="email" placeholder="Your Email" />
                            <Textarea placeholder="Your Message" />
                            <Button className="w-full">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
} 