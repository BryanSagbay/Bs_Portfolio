import express from 'express';
import {PORT} from './config.js';

const app = express();

app.get('/',(req, res)=>{
    res.send('Hello World');
}
)

//loging middleware
app.post('/login', (req, res) => {
    console.log('Log request received');
    res.send('Log request received');
}
)

//logout
app.post('/logout', (req, res) => {
    console.log('Log request received');
    res.send('Log request received');
}
)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});