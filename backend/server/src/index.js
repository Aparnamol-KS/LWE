const express = require('express')
const cors = require('cors')




const app = express()
const rootRouter = require('./routes/index')


app.use(express.json())
app.use(cors({
    origin: "*", // or frontend Render URL later
    credentials: true
}));



app.use('/api', rootRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
