const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//BODY PARSING
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());


//DB CONNECTION
require('./db/conn')()
.then(() => {
    console.log('db connected ...');
})
.catch((err) => {
    console.log(err);
    console.log('db connection failed ...');
});


//PATHS
const path = require('path');
const views_path = path.join(__dirname, '../views');
const static_path = path.join(__dirname, '../public');


//STATIC FILES
app.use(express.static(static_path))


//VIEW ENGINE CONFIG
app.set('view engine', 'ejs');
app.set('views', views_path);


//ROUTER
app.use('/magazine', require('./router/magazine'));


// SERVER LISTENING
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
