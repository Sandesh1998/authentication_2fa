const UserService = require("../service/user.service");

const userController = {
    create: async (req, res) => {
        try {
            const result = await UserService.create(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    enableTwoWayAuth: async (req, res) => {
        try {
            const result = await UserService.enableTwoWayAuth(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    verifyTwoWayAuth: async (req, res) => {
        try {
            const result = await UserService.verifyTwoWayAuth(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = userController;