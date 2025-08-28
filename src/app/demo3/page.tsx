import { env } from "@/env";
import UserList from "./_components/user-list";

async function Page() {
  const message = env.DEBUG_MESSAGE;

  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Hello Galaxy</h1>
          <p className="text-sm text-gray-500">{message}</p>
          <br />
          <UserList />
        </div>
      </div>
    </main>
  );
}

export default Page;
