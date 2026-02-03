import db from './db.js';

export const getCity = (city) =>
    db.prepare('SELECT telepules FROM diakok WHERE telepules = ?').get(city);

export const getCityStudentCount = () =>
    db
        .prepare(
            `SELECT COUNT(id) as diakokszama, telepules FROM diakok 
            GROUP BY telepules 
            ORDER BY diakokszama DESC`,
        )
        .all();

export const getStudentsFromCity = (name) =>
    db
        .prepare(
            `SELECT nev FROM diakok 
    WHERE telepules = (SELECT telepules FROM diakok WHERE nev = ?)
    AND NOT nev = ?`,
        )
        .get(name, name);
