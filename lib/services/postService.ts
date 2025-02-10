import axiosInstance from "../axiosInstance";

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
}

interface QueryParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: string;
    q?: string;
}

// Fetch all posts
export const getPosts = async (queryParams?: QueryParams): Promise<{ posts: Post[], total: number }> => {
    const response = await axiosInstance.get("/posts", { params: queryParams });
    return { posts: response.data, total: response.headers["x-total-count"] };
};

// Fetch a single post by ID
export const getPostById = async (postId: string): Promise<Post> => {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
};

// Create a new post
export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
    const response = await axiosInstance.post("/posts", post);
    return response.data;
};

// Update a post
export const updatePost = async (postId: string, postData: Partial<Post>): Promise<Post> => {
    const response = await axiosInstance.put(`/posts/${postId}`, postData);
    return response.data;
};

// Delete a post
export const deletePost = async (postId: string): Promise<void> => {
    await axiosInstance.delete(`/posts/${postId}`);
};