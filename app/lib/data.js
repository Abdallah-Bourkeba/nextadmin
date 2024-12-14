import { Product, User } from "./models";
import { connectDB } from "./utils";

export const fetchUsers = async (q, page) => {
  try {
    const regex = new RegExp(q, "i");

    const ITEM_BY_PAGE = 2;

    await connectDB();

    const count = (
      await User.find({
        username: { $regex: regex },
      })
    ).length;
    const users = await User.find({
      username: { $regex: regex },
    })
      .limit(ITEM_BY_PAGE)
      .skip(ITEM_BY_PAGE * (page - 1));

    return { users, count };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users", error);
  }
};

export const fetchUser = async (id) => {
  try {
    await connectDB();

    const user = await User.findById(id);

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user", error);
  }
};

export const fetchProducts = async (q, page) => {
  try {
    const regex = new RegExp(q, "i");

    const ITEM_BY_PAGE = 2;

    await connectDB();

    const count = (
      await Product.find({
        title: { $regex: regex },
      })
    ).length;
    const products = await Product.find({
      title: { $regex: regex },
    })
      .limit(ITEM_BY_PAGE)
      .skip(ITEM_BY_PAGE * (page - 1));

    return { products, count };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products", error);
  }
};

export const fetchProduct = async (id) => {
  try {
    await connectDB();

    const product = await Product.findById(id);

    return product;
  } catch (error) {
    console.error("Error fetching Product:", error);
    throw new Error("Error fetching Product", error);
  }
};