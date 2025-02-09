import { Post } from '@/lib/services/postService';
import { Trash2 } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

interface PostItemProps {
    post: Post;
    deletePost: (id: string) => void;
}

const PostItem = ({ post, deletePost }: PostItemProps) => {
    return (
        <li key={post.id} className="pb-4 flex justify-between items-center border-b mb-4 last:border-b-0">
            <div>
                <Link href={`/posts/${post.id}`} className="text-xl font-semibold">{post.title}</Link>
                <p className="text-gray-600">By {post.author}</p>
            </div>
            <button
                onClick={() => deletePost(post.id)}
                className="bg-red-600 text-white p-2 mr-2 rounded hover:bg-red-700"
            >
                <Trash2 size={20} />
            </button>
        </li>
    )
}

export default PostItem