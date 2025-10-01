import { userInfo } from "os";
import { db } from "../helpers/main.js";
import { v4 as uuidv4 } from "uuid"


const userFile = "users.json"


export const usersController = {
    create: async function (req, res, next) {
        try {
            const users = await db.read(userFile);
            const newUser = req.body


            const emailExists = users.find(user => user.email === newUser.email);
            if (emailExists) {
                return res.status(409).send({ message: `Emasil already exists` })
            }
            newUser.id = uuidv4();
            users.push(newUser);

            await db.write(userFile, users)

            res.status(201).send(newUser);

        } catch (err) {
            next(err);
        }
    },
    update: async function (req, res, next) {
        try {
            const { id } = req.params;
            const users = await db.read(userFile);
            const userIndex = users.findIndex(user => user.id === id);

            if (req.body.email ) {
                const emailExists = users.find(user => user.email ===req.body.email);
                if (emailExists) {
                    return res.status(409).send({message: `Email already exists!`});
                }
            }

            if (userIndex === -1) {
                return res.status(404).send({ message: `user not found` });
            };

            // const updateUser = { ...users(userIndex), ...req.body };
            users.splice(userIndex, 1, { ...users[userIndex], ...req.body });
            // users[userIndex] = updateUser;
            const updateUser = users[userIndex];

            await db.write(userFile, users);

            res.send(updateUser);
        } catch (err) {
            next(err);
        }
    },
    delete: async function (req, res, next) {
        try {
            const { id } = req.params;
            const users = await db.read(userFile);
            const userIndex = users.findIndex((user) => user.id === id);

            if (userIndex === -1) {
                return res.status(404).send({
                    message: `#${id} User deleted`
                })
            }

            users.splice(userIndex,1);
            await db.write(userFile,users);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
    find: async function (req, res, next) {
        try {
            const { page = 1, limit = 10, search } = req.query;
            let users = await db.read(userFile);

            if (search) {
                users = users.filter(user => 
                user.name.toLowerCase().includes(search.toLowerCase()) || 
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.phone.toLowerCase().includes(search.toLowerCase()));
            }
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const paginatedUsers = users.slice(startIndex, endIndex);

            res.send({
                users: paginatedUsers,
                total: users.length,
                page,
                limit
            })
            // res.send(users);
        } catch (err) {
            next(err);
        }
    },
    findOne: async function (req, res, next) {
        try {
            const { id } = req.params;
            const users = await db.read(userFile)
            const userIndex = users.findIndex((user) => user.id === id);

            if (userIndex === -1) {
                res.status(404).send(`#${id} User not found`);
            };

            const user = users[userIndex]
            res.send(user);
        } catch (err) {
            next(err);
        }
    }
}