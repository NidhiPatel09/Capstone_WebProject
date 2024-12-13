import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";

// Define the Contact type interface
interface Contact {
  _id?: ObjectId;
  userId: string;
  name: string;
  email: string;
  message: string;
  number: number;
  createdAt?: string;
}

/**
 * Service to save contact data to the database.
 * @param contactData - The contact details provided by the user.
 * @returns The created contact object.
 */
export const saveContact = async (
  contactData: Omit<Contact, "_id" | "createdAt">
): Promise<Contact> => {
  const db = getDB();

  // Add default properties
  const newContact: Contact = {
    ...contactData,
    createdAt: new Date().toISOString(),
  };

  // Insert the contact data into the database
  const result = await db.collection<Contact>("contacts").insertOne(newContact);

  // Return the inserted contact data with its MongoDB ID
  return { _id: result.insertedId, ...newContact };
};

/**
 * Service to fetch all contact data from the database.
 * @returns An array of contact objects.
 */
export const getAllContacts = async (): Promise<Contact[]> => {
  const db = getDB();

  // Fetch all contact data from the "contacts" collection
  const contacts = await db.collection<Contact>("contacts").find().toArray();

  return contacts;
};
