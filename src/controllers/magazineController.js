const marked = require('marked');
const mongoose = require('mongoose');
const Blogs = require('../models/blog');

const magazineController = () => {
    return {
        showMagazine: async function (req, res) {
            await Blogs.find((err, blogs) => {
                if (err) {
                    console.log(err);
                    return res.render('createBlog', {
                        blogs: []
                    })
                }
                if (blogs) {
                    return res.render('createBlog', {
                        blogs
                    })
                }
            })
        },
        createBlog: async function (req, res) {
            let { title, heroImg, desc, markdown } = req.body;

            if (!title || !desc || !markdown) {
                res.status(403).redirect('/magazine/create')
            }
            else {
                const html = marked.marked(markdown);
                const blog = new Blogs({
                    title, heroImg, desc, markdown: html
                })
                await blog.save((err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).redirect('/magazine/create')
                    }
                    if (data) {
                        res.status(201).redirect('/')
                    }
                })

            }
        }
    }
}

module.exports = magazineController;