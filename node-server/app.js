const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const cors = require('cors');
const app = express();
require('./models/user.model')
require('./models/post.model')




// Connecting to mongoose atlas
mongoose.connect(config.conn,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true 
});
mongoose.connection.on('connected',()=>{console.log('connected')});
mongoose.connection.on('error',(err)=>{console.log(err)});

app.use(express.json())
app.use(cors())
app.use('/public', express.static('public'));

app.use('/auth',require('./routes/auth.route'));
app.use('/posts',require('./routes/posts.route'));
app.use('/users',require('./routes/users.route'));

app.listen(5000,()=>{
    console.log('Hey iam listinging');
})