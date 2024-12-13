import { Router } from "express";
import { getUserById } from "../controllers/user/getUserById";
import { addContact, fetchAllContacts } from "../controllers/user/userContact";

const router = Router();

router.get("/getUserById/:id", getUserById);
router.post('/saveContact', addContact);
router.get('/get-contacts', fetchAllContacts);

export default router;