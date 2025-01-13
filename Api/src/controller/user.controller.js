export const registerUser = async (req, res) => {
    try {
        const { username, email, password, country } = req.body;


        if ([username, email, password, country].some(field => !field.trim())) {
            return res.status(400).json({
                success: false,
                message: "All fields (username, email, password, country) are required."
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists. Please log in instead."
            });
        }

        const newUser = await User.create({
            username,
            email,
            password,
            country
        });

        return res.status(201).json({
            success: true,
            message: `User ${username} registered successfully.`,
            user: {
                username:newUser.username,
                email:newUser.email,    
                country:newUser.country
            }
        });
    } catch (error) {
        console.log(`Error registering the user: ${error.message}`);
        return res.status(500).json({ success: false, message: "Server error while registering user." });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const existInUser = await User.findOne({ email });

        if (!existInUser) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first."
            });
        }

       
        const isPasswordValid = await bcryptjs.compare(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

       
        const accessToken = existInUser.generateAccessToken();

        return res.status(200).cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000, 
        }).json({
            success: true,
            message: `User ${existInUser.username} logged in successfully.`,
            user: {
                id: existInUser._id,
                username: existInUser.username,
                email: existInUser.email,
                country:existInUser.country,
            }
        });

    } catch (error) {
        console.log(`Error logging the user: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server error while logging in."
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const accessToken = req.cookies?.accessToken;

        if (!accessToken) {
            return res.status(400).json({
                success: false,
                message: "No active session found. Please log in first."
            });
        }

        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully."
        });

    } catch (error) {
        console.error(`Error logging out the user: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Server error while logging out. Please try again."
        });
    }
};