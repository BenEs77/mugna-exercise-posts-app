"use client";

import React, { useEffect, useState } from 'react'
import { deletePost, getPostsByParams, Post } from '@/lib/services/postService';
import Link from 'next/link';
import PostItem from './PostItem';

interface PostsListProps {
    initialPosts: Post[];
    totalPosts: number;
}

const PostsList = ({ initialPosts, totalPosts }: PostsListProps) => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [filters, setFilters] = useState({ 
        search: '',
        sort: 'title',
        order: 'asc',
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(totalPosts / 5));
    const limit = 5;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const query = `_page=${page}&_limit=${limit}&_sort=${filters.sort}&_order=${filters.order}&q=${filters.search}`;
                const { posts, total } = await getPostsByParams(query);
                setPosts(posts);
                setTotalPages(Math.ceil(total / limit));
            } catch (error: unknown) {
                console.error(error);
            }    
        };

        fetchPosts();
    }, [filters, page]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setFilters((prev) => ({ ...prev, search: e.target.value }));
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePost(id);
            if (posts.filter(post => post.id !== id).length === 0) {
                setPage(page - 1);
            } else {
                setPosts(posts.filter(post => post.id !== id));
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    const postItems = posts.map((post) => <PostItem key={post.id} post={post} deletePost={handleDelete} />)
    const pagination = Array.from({ length: totalPages }, (_, i) => (
        <button 
            key={i + 1} 
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded ${page === i + 1 ? 'bg-blue-600 text-white' : ''}`}
        >
            {i + 1}
        </button>
    ));

    return (
        <>
            <div className='flex mb-4'>
                <input 
                    type="text" 
                    placeholder="Search posts..."
                    value={filters.search}
                    onChange={handleSearch}
                    className='p-2 border rounded w-full'
                />
                <Link href="/posts/create" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded text-nowrap">Create Post</Link>
            </div>

            <div className='flex justify-between mb-4'>
                <div>
                    <label htmlFor="sort" className='mr-2'>Sort by:</label>
                    <select 
                        id="sort" 
                        value={filters.sort}
                        onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
                        className='p-2 border rounded'
                    >
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="order" className='mr-2'>Order:</label>
                    <select 
                        id="order" 
                        value={filters.order}
                        onChange={(e) => setFilters((prev) => ({ ...prev, order: e.target.value }))}
                        className='p-2 border rounded'
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            <ul className='bg-white shadow-md rounded p-4'>
                { postItems }
            </ul>

            <div className='flex justify-center mt-4 space-x-2'>
                { pagination }
            </div>
        </>
    )
}

export default PostsList