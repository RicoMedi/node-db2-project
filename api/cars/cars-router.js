// DO YOUR MAGIC
const express = require("express");

const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
} = require("./cars-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const car = await Cars.getAll();
    res.json(car);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", checkCarId, async (req, res, next) => {
  res.json(req.cars);
});

router.post('/',
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
    async (req, res, next) => {
        try {
            const addCar = await Cars.create(req.body);
            res.status(201).json(addCar);
        } catch (err) {
            next(err);
        }
    });
// error handling middleware
router.use((error, req, res, next) => {//eslint-disable-line
  res.status(error.status || 500).json({ message: error.message });
});

module.exports = router;
