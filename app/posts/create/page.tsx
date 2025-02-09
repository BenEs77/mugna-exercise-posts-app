"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createPost } from "@/lib/services/postService";
import { useRouter } from 'next/navigation'

const CreatePostPage = () => {
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await createPost({ title, author, content });
            router.push(`/posts/${data.id}`);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="max-w-2xl w-full bg-white shadow-md rounded p-6">
                <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-4">
                        <label htmlFor="create_title" className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            id="create_title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="create_author" className="block text-gray-700">Author</label>
                        <input
                            type="text"
                            id="create_author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="create_content" className="block text-gray-700">Content</label>
                        <textarea
                            value={content}
                            id="create_content"
                            onChange={(e) => setContent(e.target.value)}
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
            </div>
        </div>
    );
};

export default CreatePostPage;
