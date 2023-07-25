require("dotenv").config();
// const morgan = require("morgan");
const express = require("express");
const cors= require("cors");
const app = express();
const db = require("./db");

// Middleware
// app.use((req,res,next) => {
//     console.log("I am Middleware");
//     next();
// });

//Third-Party Middleware
// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");
        // console.log(results);
        res.status(200).json({
            status: 'success',
            resuls_count: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch (err) {
        console.error(err);
    }
})

//Get single restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query("select * from restaurants where id=$1",[req.params.id]);
        console.log(results.rows[0]);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: results.rows
            }
        })
    } catch (err) {
        console.error(err);
    }
});

//Create restaurant
app.post('/api/v1/restaurants/', async (req, res) => {
    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
          );
        console.log(results.rows[0]);
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
});

// Update restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
    const results = await db.query(
        "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]
      );
    console.log(results.rows[0]);
    res.status(200).json({
        status: 'success',
        data: {
            retaurant: results.rows[0],
        }
    })
});


//Delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query("delete from restaurants where id =$1",[req.params.id]);
        console.log(results);
        res.status(204).json({
            status: 'success',
        })
    } catch (err) {
        console.log(err);
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listening on port ' + port);
})