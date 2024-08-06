"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  try {
    await prisma.user.create({
      data: {
        email: formData.get("username") as string,
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

export async function GetUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
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
            email: "john@gmail",
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
