import { Router } from "express";
import { grammarCheck, listNotes, renderNote, saveNote } from "../controllers/note.controllers.js"

const router = Router();

router.post("/save",saveNote);
router.get("/list", listNotes);
router.get("/render/:id", renderNote);
router.post("/grammar", grammarCheck);

export default router;