"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import Database from "@/database/db";

function ValidateVendor(data: FormData) {
  let success = true;
  let errors = {};
  let messages = [];

  if (data.get("name").trim().length <= 0) {
    success = false;
    errors["name"] = true;
    messages.push("Please specify a name");
  }

  if (data.get("contact_email").trim().length <= 0) {
    success = false;
    errors["contact_email"] = true;
    messages.push("Please specify a contact email");
  }

  if (data.get("phone").trim().length <= 0) {
    success = false;
    errors["phone"] = true;
    messages.push("Please specify a phone number");
  }

  let newData = {};
  if (success) {
    newData["name"] = data.get("name").trim();
    newData["contact_email"] = data.get("contact_email").trim();
    newData["phone"] = data.get("phone").trim();
  }

  return [success, newData, errors, messages];
}

export async function AddVendor(data: FormData) {
  const db = new Database("sioos_db");

  let [success, newData, errors, messages] = ValidateVendor(data);

  if (success) {
    await db.add("vendors", newData);
    redirect("/vendors");
  } else {
    throw new Error("grrrr, " + JSON.stringify(messages));
  }
}

export async function UpdateVendor(data: FormData) {
  const db = new Database("sioos_db");

  let [success, newData, errors, messages] = ValidateVendor(data);

  if (success) {
    await db.update("vendors", data.get("id"), { $set: newData });
    redirect("/vendors");
  } else {
    throw new Error("grrrr, " + JSON.stringify(messages));
  }
}

export async function DeleteVendor(data: FormData) {
  const db = new Database("sioos_db");
  await db.delete("vendors", data.get("id"));
  redirect("/vendors");
}
