import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const allPosts = await Prompt.find({
            creator: params.userId
        }).populate("creator"); // populate- to replace the creator field with its referenced object (User)

        return new Response(JSON.stringify(allPosts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}