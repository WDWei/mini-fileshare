import { createPost } from "@/actions/actions";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostsPage() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  // const posts = await prisma.post.findMany({
  //   //Filtering
  //   where: {
  //     title: {
  //       endsWith: "post",
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   //Filter out stuff not needed like password
  //   select: {
  //     id: true,
  //     title: true,
  //     slug: true,
  //   },
  // });
  const user = await prisma.user.findUnique({
    where: {
      email: "john@gmail",
    },
    include: {
      posts: true,
    },
  });
  // const postsCount = prisma.post.count();
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1 className="text-3xl font-semibold">
        {" "}
        All Posts {user?.posts.length}
      </h1>

      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {user?.posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-1 rounded-sm"
        />
        <textarea
          name="content"
          rows={5}
          placeholder="content"
          className="px-2 py-1 rounded-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          Create post
        </button>
      </form>
    </main>
  );
}
