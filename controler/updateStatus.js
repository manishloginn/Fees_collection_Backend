const collect_request_status = require("../model/collect_request_status");

const updateStatus = async (req, res) => {
    const {id, status} = req.body;

    if(!id || !status)
    {
        return res.status(500).json({message:"please fill all detail "})
    }

    try {

        const updateStatus = await collect_request_status.findById(id)

        updateStatus.status = status

       await updateStatus.save()

        res.status(200).json({message:"status update successfully"})
    } catch (error) {
        console.log( error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = updateStatus