const { Users } = require("../models/index")
const { Op } = require("sequelize")

module.exports = {
    all: async (req, res) => {
        try {
            const search = req.query.search || ""
            const data = await Users.findAll(
                {
                    where: {
                        fullName: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                }
            )
            console.log(data)
            res.json(data)
        } catch (error) {
            res.send(error)

        }
    }
}