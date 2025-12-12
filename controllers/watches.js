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
router.get("/:id", async (req,res) => {
    try{
        const watch = await Watch.findById(req.params.id).populate("owner")
        res.render("watches/show.ejs", {watch})
    }
    catch(err){
        console.error("Error Occured",err)
    }
})
router.delete("/:id", async (req,res) => {
    try{
        const watch = await Watch.findById(req.params.id)
        if(watch.owner.equals(req.session.user._id)){
            await watch.deleteOne()
            res.redirect("/watches")
        }
        else {
            throw new Error()
        }
    }
    catch(err){
        console.error("Error Occured",err)
    }
})
module.exports = router