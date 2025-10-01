import { slugify } from "../helpers/main.js";
import { db } from "../helpers/main.js"
import { v4 as uuidv4 } from "uuid"
import { userFile, postFile } from "../helpers/main.js"

export const postsController = {
    create: async function (req, res, next) {
        try {
            const { body } = req

            if (!body.title || !body.content || !body.summary || !body.author_id || !body.categories) {
                return res.status(400).send({ message: `Title, content, summary, author_id and categories are required!` });
            }

            if (body.summary.length > 200) {
                return res.status(400).send({ message: `Summary max length is 200 characters` })
            }
            const slug = slugify(body.title)

            const posts = await db.read(postFile);
            const slugExists = posts.find(post => post.slug === slug);

            if (slugExists) {
                return res.status(409).send({ message: `Slug already exists!` });
            }
            const users = await db.read(userFile);
            const authorExists = users.find(user => user.id === body.author_id);
            if (!authorExists) {
                return res.status(400).send({ message: `Author not found` })
            }

            const newPost = { ...body, slug, created_at: new Date(), views: 0, likes: 0, liked_by: [], status: "draft" };

            posts.push(newPost)
            await db.write(postFile, posts);

            res.status(201).send(newPost);
        } catch (err) {
            next(err);
        }
    },
    update: function (req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    },
    delete: function (req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    },
    find: async function (req, res, next) {
        try {

            const { search, sortBy, page = 1, limit = 10 } = req.query

            const posts = await db.read(postFile)

            let filteredPosts = posts

            if (search) {
                filteredPosts = filteredPosts.filter(post =>
                    post.title.toLowerCase().includes(search.toLowerCase()) ||
                    post.content.toLowerCase().includes(search.toLowerCase()) ||
                    post.summary.toLowerCase().includes(search.toLowerCase()) ||
                    post.categories.some(category => category.toLowerCase().includes(search.toLowerCase()))
                )
            }


            if (sortBy) {
                filteredPosts = filteredPosts.sort((a, b) => {
                    if (sortOrder === "desc") {
                        return b[sortBy] - a[sortBy]
                    }
                    return a[sortBy] - b[sortBy]
                })
            }

            const total = filteredPosts.length 
            const start = (page - 1) * limit 
            const end = start + limit 
            const paginatedPosts = filteredPosts.slice(start, end)

            res.send({
                posts: paginatedPosts,
                total,
                page,
                limit
            })
        } catch (err) {
            next(err);
        }
    },
    findOne: function (req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }
}