import { StatusCodes } from "http-status-codes";

export const canUseHint = (req,res,next) => {
    const user = req.user;
    if(user.hint_count >= 3) {
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "You have used all your hints",
            success: false
        });
    }
    next();
}