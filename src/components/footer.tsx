import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto py-12 px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold">AuditionPe</h3>
                        <p className="mt-2 text-gray-400">Connecting talent with opportunity.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Quick Links</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/auditions" className="hover:text-gray-300">Auditions</Link></li>
                            <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Follow Us</h4>
                        <div className="flex mt-4 space-x-4">
                            <a href="#" className="hover:text-gray-300"><Twitter /></a>
                            <a href="#" className="hover:text-gray-300"><Facebook /></a>
                            <a href="#" className="hover:text-gray-300"><Instagram /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} AuditionPe. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 