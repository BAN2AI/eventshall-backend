const mongoose = require('mongoose')

const URI = "mongodb+srv://eventhalluser:Y5fu1RnpeCKqqOKL@cluster0.z9av5.gcp.mongodb.net/events?retryWrites=true&w=majority"

const connectDB = async() => {

    await mongoose.connect(URI, {
        useNewUrlParser : true, 
        useCreateIndex : true, 
        useUnifiedTopology : true
    })
    
}

const connection = mongoose.connection
connection.once('open', ()=> {
    console.log('Connection to the database')
})
 

module.exports = connectDB