"use client";

import { Post, updatePost, getPostById } from '@/lib/services/postService'
import Link from 'next/link';
import React, { useState } from 'react'

interface PostCardParams {
    post: Post;
}

const PostCard = ({ post }: PostCardParams) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Omit<Post, 'id'>>(post);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleCancel = async () => {
        setIsEditing(false);
        const fetchedPost = await getPostById(post.id);
        setFormData({ ...fetchedPost });
    }

    const handleSave = async () => {
        await updatePost(post.id, formData);
        setFormData({ ...formData });
        setIsEditing(false);
    };

    return (
        <>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-4xl font-bold mb-4"
                    />
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-gray-600 mb-4"
                    />
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-2 border rounded text-lg"
                    />
                </>
            ) : (
                <>
                    <h1 className="text-4xl font-bold mb-4">{formData.title}</h1>
                    <p className="text-gray-600 mb-4">By {formData.author}</p>
                    <p className="text-lg">{formData.content}</p>
                </>
            )}
            <div className="mt-6 flex justify-between">
                <Link href="/posts" className="px-4 py-2 bg-gray-600 text-white rounded">Back to Posts</Link>
                {isEditing ? (
                    <div className="flex gap-2">
                        <button onClick={handleCancel} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                )}
            </div>
        </>
    )
}

export default PostCard