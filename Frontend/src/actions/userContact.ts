"use server";
import { apiClient } from "./requestHandler";

export async function saveContactAction(contactData: {
    name: string;
    email: string;
    number: string;
    message: string;
  }) {
    try {
      const response = await apiClient.post("/user/saveContact", { ...contactData, number: parseInt(contactData.number) });
  
      const { data, status } = response;
  
      if (status === 201) {
        return data; // Return the saved contact data
      } else {
        throw new Error(`Failed to save contact: ${status}`);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.errors || "Failed to save contact");
    }
  }
  
  /**
   * Action to fetch all contact data.
   */
  export async function fetchAllContactsAction() {
    try {
      const response = await apiClient.get("/user/get-contacts");
  
      const { data, status } = response;
  
      if (status === 200) {
        return data; // Return the fetched contact data
      } else {
        throw new Error(`Failed to fetch contacts: ${status}`);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.errors || "Failed to fetch contacts");
    }
  }