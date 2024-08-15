import { supabaseClient } from "./supabaseClient";

export const getUserData = async ({ userId, token }) => {
    const supabase = supabaseClient(token);
    const { data: userData, error } = await supabase
        .from("UserData")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching user data:", error);
        return null;
    }

    return userData;
};
