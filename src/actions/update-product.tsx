"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import Database from "@/database/db";

function ValidateProduct(data: FormData) {
  let success = true;
  let errors = {};
  let messages = [];

  if (data.get("name").trim().length <= 0) {
    success = false;
    errors["name"] = true;
    messages.push("Please specify a name");
  }

  if (data.get("category_id").trim().length <= 0) {
    success = false;
    errors["category_id"] = true;
    messages.push("Please choose a category");
  }

  if (data.get("vendor_id").trim().length <= 0) {
    success = false;
    errors["vendor_id"] = true;
    messages.push("Please choose a vendor");
  }

  if (isNaN(Number(data.get("price").trim()))) {
    success = false;
    errors["price"] = true;
    messages.push("Price must be a valid number");
  }

  let newData = {};
  if (success) {
    newData["name"] = data.get("name").trim();
    newData["category_id"] = new ObjectId(data.get("category_id").trim());
    newData["vendor_id"] = new ObjectId(data.get("vendor_id").trim());
    newData["price"] = Number(data.get("price").trim());
    newData["unit"] = "";
    newData["stock_quantity"] = parseInt(data.get("stock_quantity").trim());
    newData["barcode"] = data.get("barcode").trim();
    newData["last_updated"] = new Date();
  }

  return [success, newData, errors, messages];
}

export async function AddProduct(data: FormData) {
  const db = new Database("sioos_db");

  let [success, newData, errors, messages] = ValidateProduct(data);

  if (success) {
    await db.add("products", newData);
    redirect("/products");
  } else {
    throw new Error("grrrr, " + JSON.stringify(messages));
  }
}

export async function UpdateProduct(data: FormData) {
  const db = new Database("sioos_db");

  let [success, newData, errors, messages] = ValidateProduct(data);

  if (success) {
    await db.update("products", data.get("id"), { $set: newData });
    redirect("/products");
  } else {
    throw new Error("grrrr, " + JSON.stringify(messages));
  }
}

export async function DeleteProduct(data: FormData) {
  const db = new Database("sioos_db");
  await db.delete("products", data.get("id"));
  redirect("/products");
}
