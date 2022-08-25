import express, {Application} from 'express';

const app: Application = express();

const PORT = 2000;

app.listen(PORT, () => {
    console.log("Running server");
    
})