const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    heroImg: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

blogSchema.pre('save', function(next) {
    if(this.title) {
        this.slug = slugify.default(this.title, {
            lower: true,
            strict: true
        })
    }
    next()
})

const Blog = new mongoose.model('Blogs', blogSchema);

module.exports = Blog;