const collect_request = require("../model/collect_request")
const collect_request_status = require("../model/collect_request_status")

const studentPayment = async (req, res) => {

    const {school_id, trustee_id, gateway, order_amount, custom_order_id , status, payment_method, bank_refrence} = req.body;


    if(!school_id || !trustee_id || !gateway || !order_amount || !custom_order_id  || !status || !payment_method || !bank_refrence){
        return res.status(400).json({
            message: "Please fill all details",
        });
    }

    try {
        const collectRequest = new collect_request({
            school_id:school_id,
            trustee_id:trustee_id,
            gateway:gateway,
            order_amount:order_amount,
            custom_order_id:custom_order_id
        })

        await collectRequest.save()

        const findcollectrequest = await collect_request.findById(collectRequest._id)
        .populate('school_id')
        .populate('trustee_id')
        console.log(findcollectrequest)

        const collectRequestStatus = new collect_request_status({
            collect_id:findcollectrequest._id,
            status:status,
            payment_method:payment_method,
            gateway:gateway,
            transaction_amount:order_amount,
            bank_refrence:bank_refrence
        })

        await collectRequestStatus.save()

        return res.status(201).json({
            message: "Payment processed successfully",
            data: { findcollectrequest, collectRequestStatus },
          });  
    } catch (error) {
        console.log( error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }

}

module.exports = {studentPayment}