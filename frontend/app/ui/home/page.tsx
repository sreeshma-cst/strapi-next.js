"use client";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/app/components/Modal";
import { useEffect, useState } from "react";
import NewBlog from "../new-blog/page";
// import BlogList from "@/components/BlogList";
// import { Button } from "@/components/ui/button";
interface Blog {
    id: number;
    attributes: {
        title: string;
        description: string;
        imageUrl?: {
            data?: {
                attributes?: {
                    url: string;
                };
            };
        };
    };
}

export default function Home() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(
                    "http://localhost:1337/api/blogs?populate=imageUrl"
                );
                const data = await res.json();

                if (data && data.data) {
                    const formattedBlogs = data.data.map((blog: any) => ({
                        id: blog.id,
                        title: blog.Title,
                        documentId: blog.documentId,
                        description: blog.Description,
                        imageUrl: blog.imageUrl || "",
                    }));

                    setBlogs(formattedBlogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);
    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:1337/api/blogs/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setBlogs(blogs.filter((blog) => blog.id !== id));
                alert("Blog deleted successfully!");
            } else {
                console.error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    return (
        <>
            <div className="flex flex-col w-full pt-16 items-center mt-6">
                <div className="max-w-screen-lg w-full px-4 text-center">
                    <div className="max-w-screen-lg w-full px-4 text-center">
                        {/*  <h1 className="text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-md">
                                   Blog
                                </h1>   */}
                        {/* modified h1 below */}
                        <h1
                            className="text-6xl font-extrabold tracking-wide bg-gradient-to-r 
        from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text 
        drop-shadow-lg animate-fade-in"
                        >
                            Blogs
                        </h1>
                        {/* <p className=" text-md max-w-3xl text-lg text-gray-700 mt-5 mx-auto"> */}
                        <p
                            className="text-xl font-serif text-gray-700 max-w-full mx-auto 
        leading-relaxed mt-4 animate-fade-in"
                        >
                            A blog is an informational website consisting of
                            discrete, often informal diary-style text entries.
                            Posts are typically displayed in reverse
                            chronological order so that the most recent post
                            appears first, at the top of the web page. In the
                            2000s, blogs were often the work of a single
                            individual, occasionally of a small group, and often
                            covered a single subject or topic
                        </p>

                        <button
                            className="rounded-full px-6 py-3 bg-blue-600 text-white mt-6 
        hover:bg-blue-700 hover:scale-105 transition-all duration-300 
        shadow-lg bg-opacity-90 text-base font-semibold"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add Blog
                        </button>
                    </div>
                </div>
                <div className="flex gap-6 p-4 flex-wrap min-w-[42rem]">
                    {/* modified the above div  down below*/}
                    {/* <div
                    className="grid md:grid-cols-3 sm:grid-cols-2 gap-20 p-8 w-full  max-w-screen-lg "  > */}
                    {blogs.map((items, index) => (
                        <>
                            <Link
                                key={index}
                                href={`/blog/${items.documentId}`}
                                passHref
                            >
                                <div
                                    key={items.id}
                                    className=" flex flex-col  w-96 border items-center  bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 "
                                >
                                    <div className="w-[100%] ">
                                        <Image
                                            // src={`http://localhost:1337${items.imageUrl.formats.thumbnail.url}`}
                                            src={
                                                items.imageUrl?.formats
                                                    ?.thumbnail?.url
                                                    ? `http://localhost:1337${items.imageUrl.formats.thumbnail.url}`
                                                    : "/default-image.jpg" // Use a default image if `imageUrl` is null
                                            }
                                            alt={items.title || "Blog image"}
                                            width={800}
                                            height={500}
                                            priority
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4 text-center">
                                            <h1 className="m-3 text-center text-xl bold font-serif  text-gray-900">
                                                {items.title}
                                            </h1>
                                            {/* modified p below */}
                                            <p className="m-3 text-center font-mono text-gray-600 mt-2">
                                                {items.description.slice(
                                                    0,
                                                    100
                                                )}
                                                ...
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-blue-600 font-semibold mt-2">
                                        Read More →
                                    </span>
                                    <div className="flex justify-center p-3">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold 
                                    px-5 py-2 rounded-lg shadow-md transition-all duration-300"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(items.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </>
                    ))}
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <NewBlog onClose={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </>
    );
}
