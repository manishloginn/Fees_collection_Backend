const collect_request = require("../model/collect_request");
const collect_request_status = require("../model/collect_request_status");

const getcollect_requestsdata = async (req, res) => {
    try {
        const requestsdata = await collect_request.find()
        const requestsdatastatus = await collect_request_status.find()
        return res.status(200).json({
            message: "Data fetched successfully",
            requestsdata: requestsdata,
            requestsdatastatus:requestsdatastatus
          });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }

}


module.exports = {getcollect_requestsdata}