import { useEffect, useState } from 'react';

const useProfile = (token) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const getProfile = async () => {
            setIsLoading(true); // Set loading state
            try {
                const response = await fetch("http://localhost:8081/api/v1/users/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (response.status === 403) {
                    console.error("Forbidden: You do not have the necessary permissions to access this resource.");
                } else if (!response.ok) {
                    console.error("HTTP error: ", response.status);
                }

                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false); // Clear loading state
            }
        };

        getProfile();
    }, [token]);

    return isLoading ? null : profile; // Return null while loading
};

export default useProfile;
