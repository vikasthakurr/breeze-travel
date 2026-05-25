import express from "express";

import Category from "../model/category.model.js";
import categories from "../data/categories.js";

const router = express.Router();

router.route("/")
    .post(async (req, res) => {
        try{
            await Category.deleteMany({});
            const categoriesInDB = await Category.insertMany(categories.data);
            res.json(categoriesInDB)
        }catch(err){
            console.log(err);
            res.json({ message: "Could not add categories to DB"})
        }
    })

export default router;
