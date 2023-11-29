const Car = require("./cars-model");
const vinValidator = require("vin-validator");
const checkCarId = async (req, res, next) => {
  try {
    const cars = await Car.getById(req.params.id);
    if (!cars) {
      next({ status: 404, message: "not found" });
    } else {
      req.cars = cars;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) return next({ status: 400, message: "vin is missing" });
  if (!req.body.make) return next({ status: 400, message: "make is missing" });
  if (!req.body.model)
    return next({ status: 400, message: "model is missing" });
  if (!req.body.mileage)
    return next({ status: 400, message: "mileage is missing" });
  next(); //dont call next twice
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next();
  } else {
    next({ status: 400, message: `vin ${vin} is invalid` });
  }
};
const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body;
    const existing = await Car.getByVin(vin);
    if (existing) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
