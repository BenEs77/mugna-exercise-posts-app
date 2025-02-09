import { getPostById } from "@/lib/services/postService";
import Link from "next/link";

interface ParamsProps {
    id: string;
}

interface PostProps {
    params: ParamsProps;
}

const PostPage = async ({ params }: PostProps) => {

    const { id } = await params;
    const post = await getPostById(id);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-600 mb-4">By {post.author}</p>
                <p className="text-lg">{post.content}</p>
                <div className="mt-6 flex justify-between">
                    <Link href="/posts" className="px-4 py-2 bg-gray-600 text-white rounded">Back to Posts</Link>
                </div>
            </div>
        </div>
    );
};

export default PostPage;
