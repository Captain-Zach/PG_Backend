const express = require("express");
const app = express();
const cors = require("cors");

// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));


// This is where we import the users routes function from our user.routes.js file
app.use(cors());
require("./routes/user.routes")(app);
// End



const server = app.listen(8000, () => console.log("The server is ready. Rip and Tear on port 8000."));

const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("Hello world! someone has connected to the server!")

    socket.on("test_event", data => {
        console.log("This is a test of the io system.");
        socket.emit("retest_event", data);
    })
})
