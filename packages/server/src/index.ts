import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

// Routes
import { issuesRouter } from './routes/issues';
import { prototypesRouter } from './routes/prototypes';


const app = express();
app.use(json());
app.use(cors());
app.use(issuesRouter);
app.use(prototypesRouter);

const mongoURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/issues?authSource=admin`
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});