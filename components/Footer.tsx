import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-accent py-5 border-t border-black mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                    <div className="flex-1 flex justify-around">
                        <div>
                            <h4 className="font-bold mb-2">INFO</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="hover:underline">Search</Link></li>
                                <li><Link href="#" className="hover:underline">Contact</Link></li>
                                <li><Link href="#" className="hover:underline">Return Policy</Link></li>
                                <li><Link href="#" className="hover:underline">Stockists</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">ABOUT</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="hover:underline">About</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">INSTAGRAM</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="hover:underline">Instagram</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;