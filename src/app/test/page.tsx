import supabase from "@/lib/supabase";
import Image from "next/image";

export default async function PostsPage() {
  // Use the JS library to download a file.
  const { data } = await supabase.storage
    .from("mini-file")
    .getPublicUrl("image2.png");

  return (
    <div>
      <Image
        src={data.publicUrl}
        width={500}
        height={500}
        alt="Picture of YOIMIYA"
      ></Image>
    </div>
  );
}
