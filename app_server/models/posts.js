// definig the schema for the blog controller
let mongoose = require('mongoose');

// subdocuments scheme definitions (posts comments)
let commentSchema = new mongoose.Schema({
  name: {type:String, required:true},
  comment: {type:String, required:true},
  createdOn: {type:Date, "default": Date.now}
})

let blogSchema = new mongoose.Schema({
  title:{type:String, required:true, unique:true,dropDups: true},
  content: {type:String, required:true},
  createdOn: {type:Date, "default": Date.now},
  comments:[commentSchema]
})


mongoose.model('Post', blogSchema);