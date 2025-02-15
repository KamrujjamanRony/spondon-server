const express = require("express");
const router = express.Router();
const News = require("../models/News");
const authMiddleware = require("../middleware/authMiddleware");

// Create News
router.post("/", authMiddleware, async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All News
router.get("/", async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get News by Category
router.get("/category/:category", async (req, res) => {
    try {
        const news = await News.find({ category: req.params.category });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get Single News by ID
router.get("/:id", async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update News
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!news) return res.status(404).json({ message: "News not found" });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete News
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });
        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
