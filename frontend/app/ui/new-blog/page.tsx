"use client";
import React, { useState } from "react";
import axios from "axios";
import { title } from "node:process";
interface NewBlogProps {
    onClose: () => void;
}
console.log("B 1");
const NewBlog = ({ onClose }) => {
    console.log("B 2");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
    });
    console.log("B 3");
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState({});
    const handleChange = (e) => {
        console.log("B 4");

        if (e.target.files && e.target.files[0]) {
            console.log("B 5");
            setImage(e.target.files[0]); // Save selected image
        }
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Dynamically update the field with the input's name
        });
        console.log("B  6", title);
    };

    const handleSubmit = async (e) => {
        console.log("B  7", title);
        e.preventDefault();
        const newFormData = new FormData();

        const validationErrors = {};
        if (!formData.title.trim()) {
            validationErrors.title = "please enter title ";
        }
        if (!formData.description.trim()) {
            validationErrors.description = "please enter description ";
        }
        if (!image) {
            validationErrors.image = "please choose an image";
        }
        setError(validationErrors);
        console.log("B  8", title);

        if (Object.keys(validationErrors).length === 0) {
            // alert("Blog added successfully!");
            newFormData.append("title", formData.title);

            newFormData.append("description", formData.description);
            newFormData.append("imageUrl", formData.imageUrl);

            console.log("NEWFORD", newFormData);
            let imageId = null;

            if (image) {
                const imageData = new FormData();
                imageData.append("files", image);

                const uploadResponse = await axios.post(
                    "http://localhost:1337/api/upload",
                    imageData
                );

                console.log("Image Upload Response:", uploadResponse.data);
                imageId = uploadResponse.data[0].id;
            }
            const payload = {
                data: {
                    Title: formData.title,
                    Description: formData.description,
                    imageUrl: imageId, // Direct image URL
                },
            };

            console.log("Sending Payload:", payload);

            try {
                const res = await axios.post(
                    "http://localhost:1337/api/blogs",
                    payload,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                console.log(res);
                onClose();
            } catch (error) {
                onClose();
                console.error("Error submitting blog:", error);
            }
        }
    };
    return (
        <div className=" w-[100%] ">
            <div className="flex h-[100%] items-center justify-center ">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    {/* title start */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={handleChange}
                        />
                    </div>
                    {/* title end */}
                    {/* content start */}
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="content"
                        >
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Description"
                            name="description"
                            onChange={handleChange}
                        />
                        <p className="text-red-500 text-xs italic">
                            Please choose enter the description.
                        </p>
                    </div>
                    {/* content end */}
                    {/* img input */}
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="image"
                        >
                            Image
                        </label>

                        {/* className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" */}
                        {/* onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImage(e.target.files[0]); 
                                }
                            }} */}

                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight "
                            id="imageUrl"
                            type="file"
                            accept="image/*"
                            placeholder="Image"
                            name="imageUrl"
                            onChange={handleChange}
                        />

                        <p className="text-red-500 text-xs italic">
                            Please choose file.
                        </p>
                    </div>
                    {/* img end */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewBlog;
