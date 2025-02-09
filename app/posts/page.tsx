"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Post } from "@/lib/services/postService";

const API_URL = "http://localhost:8000/posts";

const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("title");
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // Posts per page

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&q=${search}`
                );
                setPosts(response.data);
                const totalCount = response.headers["x-total-count"];
                setTotalPages(Math.ceil(totalCount / limit));
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [search, sort, order, page]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            if (posts.filter(post => post.id !== id).length === 0) {
                setPage(page - 1);
            } else {
                setPosts(posts.filter(post => post.id !== id));
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6">Posts</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                    className="p-2 border rounded w-full"
                />
                <Link href="/posts/create" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded text-nowrap">Create Post</Link>
            </div>
            <div className="flex justify-between mb-4">
                <div>
                    <label htmlFor="sort" className="mr-2">Sort by:</label>
                    <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2">
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="order" className="mr-2">Order:</label>
                    <select id="order" value={order} onChange={(e) => setOrder(e.target.value)} className="border p-2">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <ul className="bg-white shadow-md rounded p-4">
                {posts.map((post: Post) => (
                    <li key={post.id} className={`mb-4 pb-4 flex justify-between items-center ${posts[posts.length - 1].id === post.id ? "" : "border-b"}`}>
                        <div>
                            <Link href={`/posts/${post.id}`} className="text-xl font-semibold">{post.title}</Link>
                            <p className="text-gray-600">By {post.author}</p>
                        </div>
                        <button onClick={() => handleDelete(post.id)} className="bg-red-600 text-white p-2 mr-2 rounded hover:bg-red-700">
                            <Trash2 size={20} />
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-4 space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setPage(index + 1)}
                        className={`px-4 py-2 border rounded ${page === index + 1 ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PostsPage;
