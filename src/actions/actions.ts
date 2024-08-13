"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  try {
    await prisma.user.create({
      data: {
        userName: formData.get("username") as string,
        hashedPassword: formData.get("password") as string,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "There is a unique constriant violation, a new user cannot be created with this email"
        );
      }
    }
  }
}

export async function GetUser(userName: string) {
  const user = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });
  if (!user) return null;
  return user;
}

export async function createPost(formData: FormData) {
  try {
    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string)
          .replace(/\s+/g, "-")
          .toLowerCase(),
        content: formData.get("content") as string,
        author: {
          connect: {
            userName: "john@gmail",
          },
        },
      },
    });
    revalidatePath("/posts");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "There is a unique constriant violation, a new user cannot be created with this email"
        );
      }
    }
  }
}

export async function editPost(formData: FormData, id: string) {
  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
}

/////
//Related to FileUpload Actions
//Call Prisma Upload above (Invoking another function, just pass the Form data with ID)
export async function fileUpload(formData: FormData) {
  console.log(formData);
  const fileData = formData.get("uploadedFile") as File;
  const userID = formData.get("userID") as string;
  console.log(fileData);
  console.log(userID);
  //Call Supabox to upload
  //Then call Prisma function here to upload to DB
  //Then maybe revalidate? and show post.
  return console.log("Called FileUploader!");
}
