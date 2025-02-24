"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditBlogModal from "@/app/components/EditModal";

export default function BlogPage() {
    const params = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (!params.id) return;

        const getData = async () => {
            try {
                const res = await fetch(
                    `http://localhost:1337/api/blogs/${params.id}`,
                    {
                        cache: "no-store",
                    }
                );

                if (!res.ok) throw new Error("Blog not found");

                const responseData = await res.json();
                console.log("Fetched Blog Data:", responseData);

                setBlog({
                    id: responseData.data.id,
                    title: responseData.data.Title,
                    description: responseData.data.Description,
                    imageUrl: responseData.data.imageUrl || "/placeholder.jpg",
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        getData(); // Fetch blog data
    }, [params.id]); // Runs when `params.id` changes

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!blog)
        return (
            <p className="text-center mt-10 text-red-500">Blog not found!</p>
        );
    return (
        <div className="flex justify-center items-center w-full min-h-screen p-8 bg-gray-100">
            {/* Outer container to center content */}
            <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
                {/* Left section - Image */}
                <div className="md:w-1/2 w-full">
                    <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover rounded-l-lg"
                    />
                </div>

                {/* Right section - Content */}
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-center bg-white overflow-hidden">
                    <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-4">
                        {blog.title}
                    </h1>
                    <p className="text-gray-600 leading-relaxed break-words text-wrap">
                        {blog.description}
                    </p>
                    {/* ✅ Edit button with modal functionality */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all w-auto self-start"
                    >
                        Edit
                    </button>
                </div>
            </div>
            {/* ✅ Show Edit Modal */}
            {showModal && (
                <EditBlogModal
                    blog={blog}
                    onClose={() => setShowModal(false)}
                    onUpdate={(updatedBlog) => setBlog(updatedBlog)}
                />
            )}
        </div>
    );
}
