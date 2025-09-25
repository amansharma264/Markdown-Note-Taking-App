import {Note} from "../models/note.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { marked, Marked } from "marked"
import axios, { Axios } from "axios"

const saveNote = asyncHandler(async(req, res)=>{
    const {title, content} = req.body;

    if(!(title || body)) throw new ApiError(400, "Title and content are required");

    const note = await Note.create({title, content});
    return res
    .status(201)
    .json(new ApiResponse(201, note, "Note Saved Successfully"));
});

const listNotes = asyncHandler(async(req, res)=>{
    const notes = await Note.find().sort({createdAt: -1});
    return res
    .json(new ApiResponse(200, notes, "Notes fetched Successfully"));
})

const renderNote = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const note = await Note.findById(id);
    if(!note) throw new ApiError(404, "Note Not Found");

    const htmlContent = marked(note.content);
    return res.send(htmlContent);
});

const grammarCheck = asyncHandler(async(req, res)=>{
    const {text} = req.body;
    if(!text) throw new ApiError(404, "Text is required");

    const response = await axios.post("https://api.languagetool.org/v2/check", null, {
        params: {text, language: "en-US"}
    });
    return res
    .json(new ApiResponse(200, response.data, "Grammar check completed"));
})

export{listNotes,
    saveNote,
    renderNote,
    grammarCheck
}