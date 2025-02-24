import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="w-full bg-white bg-opacity-90 shadow-md fixed top-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <div>
                            <Link
                                href="/"
                                className="flex items-center py-5 px-2 text-gray-700 hover:text-blue-500"
                            >
                                <span className="font-bold">My App</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Link
                            href="/"
                            className="py-5 px-3 text-gray-700 hover:text-blue-500"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="py-5 px-3 text-gray-700 hover:text-blue-500"
                        >
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
