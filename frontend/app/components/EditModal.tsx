import { useEffect, useState } from "react";

export default function EditBlogModal({ blog, onClose, onUpdate }: any) {
    const [title, setTitle] = useState(blog.title);
    const [description, setDescription] = useState(blog.description);

    useEffect(() => {
        setTitle(blog.title);
        setDescription(blog.description);
    }, [blog]);

    async function handleUpdate() {
        try {
            const res = await fetch(
                `http://localhost:1337/api/blogs/${blog.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            Title: title,
                            Description: description,
                        },
                    }),
                }
            );

            if (!res.ok) throw new Error("Failed to update blog");

            const updatedData = await res.json();
            onUpdate({
                id: updatedData.data.id,
                title: updatedData.data.attributes.Title,
                description: updatedData.data.attributes.Description,
                // imageUrl: blog.imageUrl,
                imageUrl:
                    updatedData.data.attributes.imageUrl?.data?.attributes
                        ?.url || blog.imageUrl,
            });

            onClose();
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
                <input
                    type="text"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-between">
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
