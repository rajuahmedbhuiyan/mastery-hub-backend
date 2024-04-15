const express = require('express');
const connectDB = require('./db');
const routes = require('./routes');
require('dotenv').config();
const app = express();


app.use(express.json()); 


const port = 5000;


app.use(routes)

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);


connectDB(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@firstcluster.wneczch.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster`)
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
)
.catch((err) => {
    console.error(err); 
}
);




