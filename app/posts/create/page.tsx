import CreatePostForm from "@/components/CreatePostForm";

const CreatePostPage = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="max-w-2xl w-full bg-white shadow-md rounded p-6">
                <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>
                <CreatePostForm />
            </div>
        </div>
    );
};

export default CreatePostPage;
