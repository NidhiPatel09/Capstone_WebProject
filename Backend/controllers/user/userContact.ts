import { getAllContacts, saveContact } from "../../services/user/userContact";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";

export const addContact = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const typedReq = req as AuthenticatedRequest;
  
    try {
      if (!typedReq.user || !typedReq.user._id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const userId = typedReq.user._id.toString();
      const { name, email, message, number } = typedReq.body;
  
      if (!name || !email || !message || !number) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const contact = await saveContact({
        userId,
        name,
        email,
        message,
        number
      });
  
      return res.status(201).json(contact);
    } catch (error: any) {
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  
  /**
   * API to fetch all contact data.
   */
  export const fetchAllContacts = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const typedReq = req as AuthenticatedRequest;
  
    try {
      if (!typedReq.user || !typedReq.user._id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const contacts = await getAllContacts();
      return res.status(200).json(contacts);
    } catch (error: any) {
      return res.status(500).json({ error: "Internal server error." });
    }
  };