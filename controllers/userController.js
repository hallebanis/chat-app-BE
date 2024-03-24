import User from "../models/userModel.js"

export const getUserById = async (req, res) => {
    try {
        const loggedInUser = req.userId
        const allUsers = await User.find({ _id: { $ne: loggedInUser } })

        res.json(allUsers)

    } catch (error) {
        res.status(500).json({ error: 'internal server error' })
    }
}