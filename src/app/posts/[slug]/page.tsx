import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostsPage({ params }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    //cacheStrategy: { swr: 60, ttl: 60 },
  });
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold"> {post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
