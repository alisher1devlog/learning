import { userInfo } from "os";
import { db } from "../helpers/main.js";
import { v4 as uuidv4 } from "uuid"


const userFile = "users.json"


export const usersController = {
    create: async function (req, res, next) {
        try {
            const users = await db.read(userFile);
            const newUser = req.body

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
            const users = await db.read(userFile);
            const {id} = users.findIndex(user=>user.id === +id);

            if(userIndex === -1){
                return res.status(404).send({message: `user not found`});
            };

            const updateUser = {...users(userIndex), ...req.body};
            users[userIndex] = updateUser;

            await db.write(userFile,users);

            res.send(updateUser);
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
    find: function (req, res, next) {
        try {
            res.send(users);
        } catch (err) {
            next(err);
        }
    },
    findOne: function (req, res, next) {
        try {
            const { id } = req.params;

            const userIndex = users.findIndex((user) => user.id === +id);

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