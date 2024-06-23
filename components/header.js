import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="w-screen h-12 bg-black">
      <div className="flex justify-between">
        <div className="font-bold mt-2 mr-4">TASK LIST</div>

        {status === "authenticated" ? (
          <div>
            <span>Signed in as {session?.user?.email}</span>
            <button
              className="ml-5 h-8 w-48 bg-gray-500 mt-2 text-xs"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <button
              className="h-8 w-48 bg-gray-500 mt-2 text-xs"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
