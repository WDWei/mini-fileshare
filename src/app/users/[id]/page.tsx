import { fileUpload } from "@/actions/actions";
import prisma from "@/lib/db";

export default async function UserPage({ params }) {
  console.log(params);
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    //cacheStrategy: { swr: 60, ttl: 60 },
  });
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold"> {user?.userName}</h1>
      <p>{user?.id}</p>

      <form action={fileUpload} className="flex flex-col gap-y-2 w-[300px]">
        <input
          type="file"
          name="uploadedFile"
          placeholder="File"
          className="px-2 py-1 rounded-sm"
        />
        <input type="hidden" name="userID" value={user?.id} />
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
