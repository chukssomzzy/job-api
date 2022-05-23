const express = require("express")
require('dotenv').config();
require('express-async-errors');
//extra security packages
const helmet = require("helmet");
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require('express-rate-limit');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require("./routes/auth")
const jobsRoute = require("./routes/jobs");
const connectDB = require('./db/connect');
const authMiddleWare = require("./middleware/authentication")
//parse req Body
app.use(express.json());
app.use(helmet())
app.use(xss())
app.use(cors())
app.set('trust proxy',1 )
app.use(rateLimiter({
  windowMs:15*60*1000,
  max:100
}))
// extra packages

// routes

app.get('/', (req, res) => {
  res.send('jobs api');
});
//jobs routes
app.use("/api/v1/jobs",authMiddleWare,jobsRoute)
//auth Routes
app.use("/api/v1/auth",authRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
