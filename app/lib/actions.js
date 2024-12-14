"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "@/app/auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    await connectDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (error) {
    console.error(error);
    throw new Error("Faild to create user", error);
  } finally {
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
  }
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    await connectDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.error(error);
    throw new Error("Faild to update user", error);
  } finally {
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
  }
};

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    await connectDB();

    const newProduct = Product({ title, desc, price, stock, color, size });

    await newProduct.save();
  } catch (error) {
    console.error(error);
    throw new Error("Faild to create product", error);
  } finally {
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  }
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectDB();

    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    throw new Error("Faild to delete product", error);
  } finally {
    revalidatePath("/dashboard/products");
  }
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    await connectDB();

    const updateFields = { title, desc, price, stock, color, size };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.error(error);
    throw new Error("Faild to Update product", error);
  } finally {
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectDB();

    await User.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    throw new Error("Faild to delete user", error);
  } finally {
    revalidatePath("/dashboard/users");
  }
};

export const authenticate = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
