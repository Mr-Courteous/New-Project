const express = require('express')
const connectDB = require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser')
const getRoute = require('./Routes/getRoutes');
const postRoute = require('./Routes/postRoutes');
const putRoute = require('./Routes/putRoutes');
const deleteRoute = require('./Routes/deleteRoutes');
const registerAndForgetPasswordRoutes = require('./Routes/teacherRegRoutes');
const loginRoute = require('./Routes/loginRoutes')
const forgotPasswordRoutes = require('./Routes/forgotPasswordroutes')
const dashboard = require('./Routes/dashboard')





const app = express()

connectDB()





app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: ' http://localhost:3000',
//     // origin: "https://banking-application-roan.vercel.app",
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true, // Allow credentials (cookies)

// }));

const allowedOrigins = [
  'http://localhost:3000',      // Local development
  'http://localhost:3001',      // Another local dev server
  'https://your-production-domain.com', // Production frontend 1
  'https://another-frontend.com', // Production frontend 2
  'myapp://', // For mobile apps (if applicable)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) { // Allow requests without origin (like Postman)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // If you're using cookies or authentication
  })
);




app.use(bodyParser.json());

app.use(getRoute);
app.use(postRoute);
app.use(putRoute);
app.use(registerAndForgetPasswordRoutes)
app.use(forgotPasswordRoutes)
app.use(loginRoute);
app.use(dashboard);
// app.use(deleteRoute);



app.get('/', (req, res) => {
  res.send('Broadsheet Application says Hello !');
});








const port = 5000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  