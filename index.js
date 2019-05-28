const connection = require('./conf');
const express = require('express')
const app = express();
const port = 3000;


const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get('/api/', (req, res) => {
  connection.query('SELECT * from movie', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des films');
    } else {
      res.json(results);
    }

  });
});


app.get('/api/movies/', (req, res) => {
  connection.query('SELECT id,name,date from movie', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des films');
    } else {
      res.json(results);
    }

  });
});


app.get('/api/movies/name/wcs', (req, res) => {
  connection.query('SELECT * from movie WHERE name LIKE "%wcs%"', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des films');
    } else {
      res.json(results);
    }

  });
});

app.get('/api/movies/date', (req, res) => {
  connection.query('SELECT * from movie WHERE date > "2010-10-15"', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des films');
    } else {
      res.json(results);
    }

  });
});

app.get('/api/movies/name/campus', (req, res) => {
  connection.query('SELECT * from movie WHERE name LIKE "campus%"', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des films');
    } else {
      res.json(results);
    }

  });
});


app.get('/api/movies/name/filter', (req, res) => {
  connection.query(`SELECT * from movie ORDER BY id ${req.query.order || 'DESC'} `, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des films');
    } else {
      res.json(results);
    }

  });
});


// écoute de l'url "/api/movies" avec le verbe POST
app.post('/api/movies', (req, res) => {

  // récupération des données envoyées
  const formData = req.body;

  // connexion à la base de données, et insertion du film
  connection.query('INSERT INTO movie SET ?', formData, (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un film");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok c'est bon maggle".
      res.sendStatus(200);
    }
  });
});

// écoute de l'url "/api/movies"
app.put('/api/movies/:id', (req, res) => {

  // récupération des données envoyées
  const idMovies = req.params.id;
  const formData = req.body;

  // connection à la base de données, et insertion du film
  connection.query('UPDATE movie SET ? WHERE id = ?', [formData, idMovies], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un film");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok c'est bon maggle".
      res.sendStatus(200);
    }
  });
});

app.put('/api/movies/:id', (req, res) => {

  // récupération des données envoyées
  const idMovies = req.params.id;
  const formData = req.body;

  // connection à la base de données, et insertion du film
  connection.query('UPDATE movie SET ? WHERE id = ?', [formData, idMovies], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un film");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok c'est bon maggle".
      res.sendStatus(200);
    }
  });
});

app.put('/api/movies/:id', (req, res) => {

  // récupération des données envoyées
  const idMovies = req.params.id;
  const formData = req.body;

  // connection à la base de données, et insertion du film
  connection.query('UPDATE movie SET sorti = !sorti WHERE id = ?', [formData, idMovies], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un film");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok c'est bon maggle".
      res.sendStatus(200);
    }
  });
});

// écoute de l'url "/api/movies"
app.delete('/api/movies/', (req, res) => {

  // récupération des données envoyées
  const idMovies = req.params.id;

  // connexion à la base de données, et suppression du film
  connection.query('TRUNCATE TABLE movie', idMovies, err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un film");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok c'est bon maggle".
      res.sendStatus(200);
    }
  });
});

app.delete('/api/movies/sorti', (req, res) => {

  // récupération des données envoyées
  const idMovies = req.params.id;

  // connexion à la base de données, et suppression du film
  connection.query('DELETE FROM movie WHERE sorti = false', idMovies, err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un film");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok c'est bon maggle".
      res.sendStatus(200);
    }
  });
});




app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
