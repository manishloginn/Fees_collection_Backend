const collect_request = require("../model/collect_request")
const collect_request_status = require("../model/collect_request_status")

const dashboardData = async (req, res) => {
    

    const { page = 1, pageSize = 10 } = req.query;  

    try {
        const collectData = await collect_request.find()
        .populate('school_id')
        .populate('trustee_id')
        .skip((page - 1) * pageSize)
        .limit(Number(pageSize));


        const dashboardDataa = await Promise.all(
      collectData.map(async (collect) => {
        const statusData = await collect_request_status.find({ collect_id: collect._id });
        return {
          ...collect._doc,
          statuses: statusData,
        };
      })
    );

    const totalRecords = await collect_request.countDocuments();

    const sortedData = dashboardDataa.sort((a, b) => new Date(b.trustee_id.createdAt) - new Date(a.trustee_id.createdAt));

    return res.status(200).json({
        message: "Data fetched successfully",
        data: sortedData,
        pagination: {
          totalRecords,
          totalPages: Math.ceil(totalRecords / pageSize),
          currentPage: Number(page),
          pageSize: Number(pageSize),
        },
      });
  
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }

}

module.exports = dashboardData