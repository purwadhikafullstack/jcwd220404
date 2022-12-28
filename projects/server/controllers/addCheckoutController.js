const db = require("../models")
const rajaOngkirKey = process.env.RAJA_KEY
const openCageKey = process.env.GEO_KEY

module.exports = {
    mainAddress: async (req, res) => {
        try {

        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}