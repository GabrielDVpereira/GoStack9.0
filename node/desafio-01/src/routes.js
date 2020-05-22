const express = require("express");
const route = express.Router();

let projects = [];
let count = 1;
route.use((req, res, next) => {
  console.log("Numero de requisições:", count);
  count++;
  next();
});
route.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });
  res.status(201).send();
});

route.get("/projects", (req, res) => {
  res.json({ projects });
});

route.put("/projects/:id", findById, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach((project) => {
    if (project.id == id) {
      project.title = title;
    }
  });
  return res.status(204).send();
});

route.delete("/projects/:id", findById, (req, res) => {
  const { id } = req.params;
  projects.filter((project) => project.id !== id);
  res.status(204).send();
});

route.post("/projects/:id/tasks", findById, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  projects.forEach((project) => {
    if (project.id == id) {
      project.task.push(task);
      return res.status(204).send();
    }
  });
});

function findById(req, res, next) {
  const { id } = req.params;
  console.log(id);
  const project = !!projects.filter((project) => project.id == id);
  console.log(project);
  if (project) return next();
  else return res.status(404).send("projeto não encontrado");
}

module.exports = route;
