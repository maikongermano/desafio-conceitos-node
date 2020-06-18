const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = [];

app.get("/repositories", (request, response) => {
  // TODO
  const {title} = request.query;

  const results = title
      ? repositories.filter(repositorie => repositorie.title.includes(title))
      : repositories;
    

  return response.json(results);

});

app.post("/repositories", (request, response) => {
  // TODO

  const { title, url, techs } = request.body;

    const repositorie = {id: uuid(), title, url, techs, likes : 0};

    repositories.push(repositorie);

    return response.json(repositorie);
  
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
    const { title, url, techs } = request.body;

    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

    if (repositorieIndex < 0){
        return response.status(400).json({error: 'repositorie not found.'});
    }

    const repository = repositories[repositorieIndex];

    Object.assign(repository, {title, url, techs});

    repositories[repositorieIndex] = repository;

    return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

    if (repositorieIndex < 0){
        return response.status(400).json({error: 'Project not found.'});
    }

    repositories.splice(repositorieIndex, 1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

   const repositorieLiked = repositories.findIndex(repositorie => repositorie.id.includes(id));

   if (repositorieLiked <0){
       return response.status(400).json({error: 'Project not found.'});
   }



  repositories[repositorieLiked].likes +=1;


  return response.json(repositories[repositorieLiked]);
});

module.exports = app;
