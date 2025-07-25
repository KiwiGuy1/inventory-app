"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import Database from "@/database/db";

function ValidateCategory(data: FormData) {
  let success = true;
  let errors = {};
  let messages = [];

  if (data.get("name").trim().length <= 0) {
    success = false;
    errors["name"] = true;
    messages.push("Please specify a name");
  }

  let newData = {};
  if (success) {
    newData["name"] = data.get("name").trim();
    newData["description"] = data.get("description").trim();
  }

  return [success, newData, errors, messages];
}

export async function AddCategory(data: FormData) {
  const db = new Database("sioos_db");

  let [success, newData, errors, messages] = ValidateCategory(data);

  if (success) {
    await db.add("categories", newData);
    redirect("/categories");
  } else {
    throw new Error("grrrr, " + JSON.stringify(messages));
  }
}

export async function UpdateCategory(data: FormData) {
  const db = new Database("sioos_db");

  let [success, newData, errors, messages] = ValidateCategory(data);

  if (success) {
    await db.update("categories", data.get("id"), { $set: newData });
    redirect("/categories");
  } else {
    throw new Error("grrrr, " + JSON.stringify(messages));
  }
}

export async function DeleteCategory(data: FormData) {
  const db = new Database("sioos_db");
  await db.delete("categories", data.get("id"));
  redirect("/categories");
}
