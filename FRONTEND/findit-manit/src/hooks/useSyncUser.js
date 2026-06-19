import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

function useSyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    axios.post(
      "https://findit-manit-backend-ab8s.onrender.com/api/users/sync-user",
      {
        clerkId: user.id,
        name: user.fullName,
        email:
          user.primaryEmailAddress
            ?.emailAddress,
      }
    );
  }, [user]);
}

export default useSyncUser;