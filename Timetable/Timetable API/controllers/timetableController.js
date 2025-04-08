import timetable from "../data/timetable.js";

export const getClasses = (req, res) => {
    res.status(200).json(timetable);
};

export const getClassesById = (req, res) => {
    const id = req.params.id;
    if (id < 0 || id >= timetable.length) {
      return res.status(404).json({ message: "Not found!" });
    }
    res.status(200).json(timetable[id]);
};

export const deleteClasses = (req, res) => {
    const id = req.params.id;
    if (id < 0 || id >= timetable.length) {
      return res.status(404).json({ message: "Not found!" });
    }
    books.splice(id, 1)
    res.status(200).json({message: "Delete successful!"})
  };