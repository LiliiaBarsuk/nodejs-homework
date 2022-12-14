const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const { DB_HOST } = process.env;
const PORT = process.env.PORT || 3000

mongoose.set('strictQuery', false);

const connection = mongoose.connect(DB_HOST, {

  useNewUrlParser: true,

  useUnifiedTopology: true,
  })
  
  
connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000")
    });

    console.log("Database connection successful")})
  .catch(error => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  })




