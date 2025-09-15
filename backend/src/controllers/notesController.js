import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const tenant = req.tenant;

    // enforce subscription limit for Free plan
    if (tenant.plan === "free") {
      const noteCount = await Note.countDocuments({ tenant: tenant._id });
      if (noteCount >= 3) {
        return res.status(403).json({ message: "Upgrade to Pro to add more notes" });
      }
    }

    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      tenant: tenant._id,
      user: req.user._id
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ tenant: req.tenant._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, tenant: req.tenant._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, tenant: req.tenant._id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, tenant: req.tenant._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
