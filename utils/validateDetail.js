const validateDetail = ({userName, email, password}) => {
    return new Promise((res, rej) => {
        if(!userName && !email && !password) rej("please fill all detail ")

            res("resolve")
    })
}

module.exports = {validateDetail}