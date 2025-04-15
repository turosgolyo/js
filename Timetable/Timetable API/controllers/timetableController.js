import timetable from "../data/timetable.js";

export const getClasses = (req, res) => {
    const result = [];
    let id = 0;
    for (const day in timetable) {
        for (const time in timetable[day]) {
            result.push({
                id: id++,
                day: day,
                time: time,
                subject: timetable[day][time]
            });
        }
    }
    res.status(200).json(result);
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
    res.status(501).json({ message: "Delete successful!" });
};

export const addClass = (req, res) => {
    const { day, period, subject } = req.body;

    if (!day || !period || !subject) {
        return res.status(400).json({ message: "Missing day, period or subject in request body" });
    }

    if (!timetable.hasOwnProperty(day)) {
        return res.status(400).json({ message: "Invalid day provided" });
    }

    const periodNum = Number(period);
    if (isNaN(periodNum) || periodNum <= 0) {
        return res.status(400).json({ message: "Invalid period provided" });
    }

    timetable[day][periodNum] = subject;

    res.status(201).json({ message: "Class added successfully", class: { day, period: periodNum, subject } });
};
