"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const userProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const profileId = params.id;
    const name = searchParams.get("name");

    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${profileId}/posts`);
            const data = await response.json();

            setPosts(data);
        }
        console.log(name);

        if (profileId) fetchPosts();
    }, [profileId]);

    

    return (
    <Profile 
        name={`${name}'s`}
        desc={`Welcome to ${name}'s personalized profile page.`}
        data={posts}
    />
    )
}

export default userProfile;