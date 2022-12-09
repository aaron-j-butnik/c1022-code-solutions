
const express = require('express');
const app = express();

const pg = require('pg');

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/grades', (req, res) => {
  const sql = `
    select *
      from "grades"
  `;
  db.query(sql)
    .then(result => {
      const grade = result.rows;
      res.status(200).json(grade);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.use(express.json());

app.post('/api/grades', (req, res) => {
  const newName = req.body.name;
  const newCourse = req.body.course;
  const newScore = Number(req.body.score);
  if (!newName || !newCourse || !newScore || !Number.isInteger(newScore) || newScore < 0 || newScore > 100) {
    res.status(400).json({ Error: 'A valid Name, Course, and Score are required. Score must only be an integer between 0 - 100.' });
  } else {
    const sqlText = `
      insert into grades (name, course, score)
      values ($1, $2, $3) returning *
     `;
    const sqlValues = [newName, newCourse, newScore];
    db.query(sqlText, sqlValues)
      .then(result => {
        const newGrade = result.rows[0];
        res.status(201).json(newGrade);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occured.' });
      });
  }
});

app.put('/api/grades/:gradeId', (req, res) => {
  const gradeId = req.params.gradeId;
  const newName = req.body.name;
  const newCourse = req.body.course;
  const newScore = Number(req.body.score);
  if (!newName || !newCourse || !newScore || !Number.isInteger(newScore) || newScore < 0 || newScore > 100) {
    res.status(400).json({ Error: 'A valid Name, Course, and Score are required. Score must only be an integer between 0 - 100.' });
  } else {
    const sqlText = `
        update "grades"
           set "name"    = $1,
               "course"  = $2,
               "score"   = $3
         where "gradeId" = $4
         returning *
        `;
    const sqlValues = [newName, newCourse, newScore, gradeId];
    db.query(sqlText, sqlValues)
      .then(result => {
        const updatedGrade = result.rows[0];
        if (updatedGrade === undefined) {
          res.status(404).json({ error: `The gradeId ${gradeId} does not exist` });
        } else {
          res.status(200).json(updatedGrade);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occured.' });
      });
  }
});

app.delete('/api/grades/:gradeId', (req, res) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId < 0 || typeof gradeId === 'string') {
    res.status(400).json({ Error: 'Invalid gradeId. GradeId must be a postivive integer.' });
  } else {
    const sqlText = `
      delete
        from "grades"
      where "gradeId" = $1
      returning *
      `;
    const sqlValues = [gradeId];
    db.query(sqlText, sqlValues)
      .then(result => {
        const deletedGrade = result.rows[0];
        if (deletedGrade === undefined) {
          res.status(404).json({ error: `The gradeId ${gradeId} does not exist` });
        } else {
          res.sendStatus(204);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occured.' });
      });
  }
});

app.listen(3000, () => {
});
