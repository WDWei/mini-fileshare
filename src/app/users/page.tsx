import { createPost } from "@/actions/actions";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function UserPage() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  const users = await prisma.user.findMany();
  // const userCount = prisma.post.count();
  return (
    //To display all users first and click to them like post
    <div className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1 className="text-3xl font-semibold"> All Users {users?.length}</h1>

      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {users?.map((user) => (
          <li key={user.id} className="flex items-center justify-between px-5">
            <Link href={`/users/${user.id}`}>{user.userName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
