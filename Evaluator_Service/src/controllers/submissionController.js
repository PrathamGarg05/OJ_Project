
export const createSubmission = async(req, res) => {
    try{
        res.status(200).json({
            success: true,
            data: req.body
        });
    } catch(error) {
        res.json({
            success: false,
            message: "Failed to create submission"
        });
    }
};