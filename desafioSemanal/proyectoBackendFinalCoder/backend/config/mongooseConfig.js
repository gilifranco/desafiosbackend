const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb+srv://lucaslorenzo0303:Marruecos02@cluster0.2mhgyws.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})



module.exports = connection
