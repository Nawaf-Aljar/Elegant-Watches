const express = require("express")
const router = express.Router()

const Watch = require("../models/watch")
const constants = require('../config/constants')

const companyOptions = ["Rolex", "Omega", "hublot", "Richard Mille"]

router.get("/", async (req,res) => {
    try{
        const watches = await Watch.find().populate("owner")
        res.render("watches/index.ejs", {watches})
    }
    catch(err){
        console.error("Error Occured",err)
    }
})
router.get("/new", async (req,res) => {
    try{
        const {companyOptions} = constants;
        res.render("watches/new.ejs", { companyOptions })
    }
    catch(err){
        console.error("Error Occured",err)
    }
})
router.post("/", async (req,res) => {
    try{
        req.body.owner = req.session.user._id
        await Watch.create(req.body)
        res.redirect("/watches")
    }
    catch(err){
        console.error("Error Occured",err)
    }
})
module.exports = router