import express from 'express';

const app = express();
app.use(express.json())
const PORT = 3000;

const movies = [
    {title: "film1", director: "rendezo1", releaseYear: 2000, isAwardWinner: true},
    {title: "film2", director: "rendezo2", releaseYear: 2010, isAwardWinner: false},
    {title: "film3", director: "rendezo3", releaseYear: 2003, isAwardWinner: false}
];


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;

    if(id > movies.length || id < 0){
        return res.status(404).json({message: "Movie not found!"});
    }
    
    res.status(200).json(movies[id]);
});

app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    if(id > movies.length || id < 0){
        return res.status(404).json({message: "Movie not found!"});
    }
    movies.splice(id, 1);
    res.json({message: "Delete successful!"})
})

app.post('/movies', (req, res) => {
    const {title, director, releaseYear, isAwardWinner} = req.body;

    if(!title || !director || !releaseYear){
        return res.json({message: "Missing data!"});
    }

    const newMovie = {title, director, releaseYear, isAwardWinner};
    movies.push(newMovie);
    res.json(newMovie);
});

app.put('/movies/:id', (req, res) => {
    const id = req.params.id;

    if(id > movies.length || id < 0){
        return res.status(404).json({message: "Movie not found!"});
    }

    const {title, director, releaseYear, isAwardWinner} = req.body;

    if(!title || !director || !releaseYear){
        return res.json({message: "Missing data!"});
    }

    movies[id] = {title, director, releaseYear, isAwardWinner};
    res.json(movies[id]);
});


