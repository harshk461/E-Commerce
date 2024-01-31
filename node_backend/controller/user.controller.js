const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/user.model');
const { createToken } = require('../utils/createToken');

const registerUser = () => asyncHandler(
    async (req, res, next) => {
        const { username, name, email, password } = req.body;

        const user = new User({
            name, username, email, password,
            avatar: {
                public_id: "user",
                url: "test"
            }
        });
    }
)

const loginUser = () => asyncHandler(
    async (req, res, next) => {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).select("+password")

        if (!user) {
            return res.status(401).json({ "status": "error", "message": "Invalid username or Password" });
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(401).json({ "status": "error", "message": "Invalid Password" });
        }

        const data = {
            username: user.username,
            id: user._id,
            email: user.email,
        };

        const token = createToken(data);

        return res.json({ status: "success", token: token });
    }
)

module.exports = {
    registerUser,
    loginUser
}
