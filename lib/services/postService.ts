import axiosInstance from "../axiosInstance";

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
}

// Fetch all posts
export const getPosts = async (): Promise<Post[]> => {
    const response = await axiosInstance.get("/posts");
    return response.data;
};

// Fetch a single post by ID
export const getPostById = async (postId: string): Promise<Post> => {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
};

// Fetch by string params
export const getPostsByParams = async (params: string): Promise<{ posts: Post[], total: number }> => {
    const response = await axiosInstance.get(`/posts?${params}`);
    return { posts: response.data, total: response.headers["x-total-count"] };
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