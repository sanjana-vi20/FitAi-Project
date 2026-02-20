import jwt from "jsonwebtoken";

export const genToken = async (user, res) => {
  console.log("res : " , res);
  
  try {
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token =  jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
      // 1d, 1h, '' forever,
      });
      // console.log("token : " , token);
      


    res.cookie("fitAI", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  } catch (error) {
    throw error;
  }
};
