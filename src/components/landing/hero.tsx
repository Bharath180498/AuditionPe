import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="text-center py-20">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Welcome to AuditionPe
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
                The easiest way for actors and producers to connect.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild>
                    <Link href="/signup">Get started</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/login">Log in</Link>
                </Button>
            </div>
        </section>
    );
} 