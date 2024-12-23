const collect_request = require("../model/collect_request")
const collect_request_status = require("../model/collect_request_status")

const dashboardData = async (req, res) => {
    

    try {
        const collectData = await collect_request.find().populate('school_id').populate('trustee_id')
        const dashboardDataa = await Promise.all(
            collectData.map(async (collect) => {
                const statusData = await collect_request_status.find({collect_id:collect._id});
                return {
                    ...collect._doc,
                    statuses: statusData,
                }
            })
        )
        return res.status(200).json({message:"get", data:dashboardDataa})
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }

}

module.exports = dashboardData