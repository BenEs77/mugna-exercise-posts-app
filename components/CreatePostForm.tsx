"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createPost } from "@/lib/services/postService";
import { useRouter } from 'next/navigation';

const CreatePostForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        content: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await createPost({ ...formData });
            router.push(`/posts/${data.id}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="create_title" className="block text-gray-700">Title</label>
                <input
                    type="text"
                    id="create_title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="create_author" className="block text-gray-700">Author</label>
                <input
                    type="text"
                    id="create_author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="create_content" className="block text-gray-700">Content</label>
                <textarea
                    value={formData.content}
                    id="create_content"
                    name="content"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="flex justify-between">
                <Link href="/posts" className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</Link>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Post"}
                </button>
            </div>
        </form>
    )
}

export default CreatePostForm