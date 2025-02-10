import PostContent from "@/components/PostContent";
import { getPostById } from "@/lib/services/postService";

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
                <PostContent post={post} />
            </div>
        </div>
    );
};

export default PostPage;
