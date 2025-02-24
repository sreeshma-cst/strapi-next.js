"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

interface Blog {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
}

export default function BlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogs(data);
    };

    const handleDelete = async (id: string) => {
        await fetch(`/api/blogs/${id}`, { method: "DELETE" });
        fetchBlogs();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog._id}
                    id={blog._id}
                    title={blog.title}
                    excerpt={blog.content.substring(0, 100) + "..."}
                    imageUrl={blog.imageUrl}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
