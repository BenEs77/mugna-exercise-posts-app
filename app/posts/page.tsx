import PostsList from '@/components/PostsList'
import { getPosts } from '@/lib/services/postService'

const PostsPage = async () => {
    const initialData = await getPosts({
        _page: 1,
        _limit: 5,
        _sort: 'title',
        _order: 'asc',
    });

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <h1 className='text-4xl font-bold mb-6'>Posts</h1>
            <PostsList initialPosts={initialData.posts} totalPosts={initialData.total} />
        </div>
    )
}

export default PostsPage