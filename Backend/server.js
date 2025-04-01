const express =require('express');
const mongoose = require('mongoose');
const cors =require('cors');
require('dotenv').config(); 

const app = express();

//Import routes
const trainerbookingRoutes = require("./routes/TrainerBookingR");
const WorkoutPlanRoutes = require("./routes/WorkoutPlanR");
const UserRoutes = require("./routes/UserR");
const WPAdminMRoutes = require("./routes/WPadminR");
const trainerRoutes = require("./routes/TrainerR");
const UserProgressRoutes = require("./routes/UserProgressR");

app.use(express.json());
app.use(cors());

app.use(trainerbookingRoutes);
app.use(WorkoutPlanRoutes);
app.use(UserRoutes);
app.use(WPAdminMRoutes);
app.use(trainerRoutes);
app.use(UserProgressRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://poojani:poojani@cluster0.59rx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URL)

.then(()=>{console.log('DB connected')})
.catch((err)=> console.log('DB Connection error',err))

app.listen(PORT, ()=>{console.log(`App is running on ${PORT}`);

});

