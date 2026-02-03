import db from './db.js';

export const getEnglishClasses = () =>
    db.prepare(`SELECT datum, terem, orasorszam FROM orak WHERE targy = 'angol'`).all();

export const getNinthGradeClasses = () =>
    db
        .prepare(
            `SELECT csoport, targy, datum FROM orak 
            WHERE (targy = 'matematika' OR targy = 'fizika')
            AND csoport LIKE '9%'
            ORDER BY targy`,
        )
        .all();

export const getUniqueClasses = () =>
    db
        .prepare(
            `SELECT DISTINCT(targy) FROM orak
            ORDER BY targy
    `,
        )
        .all();

export const getStudentsByTeacher = (name, date) =>
    db
        .prepare(
            `SELECT nev, email, telefon 
    FROM diakok 
    INNER JOIN orak ON kapcsolo.diakid = kapcsolo.oraid
    WHERE orak.datum = ? AND orak.tanar = ?`,
        )
        .get(name, date);
