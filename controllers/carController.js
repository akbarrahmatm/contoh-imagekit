const { Car } = require("../models");

const getAllCar = async (req, res, next) => {
  try {
    const cars = await Car.findAll();

    res.status(200).json({
      status: "Success",
      requestAt: req.requestTime,
      totalData: cars.length,
      data: { cars },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const createCar = async (req, res, next) => {
  const { name, image, rentPerDay, capacity } = req.body;

  try {
    const newCar = await Car.create({
      name,
      image,
      rentPerDay,
      capacity,
    });

    res.status(200).json({
      status: "Success",
      data: newCar,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getCarById = async (req, res, next) => {
  try {
    const id = await req.params.id;

    const car = await Car.findOne({
      where: { id: id },
    });

    console.log(car);

    if (!car) throw new Error(`Car with ID '${id}' is not exist`);

    res.status(200).json({
      status: "Success",
      requestAt: req.requestTime,
      data: car,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const updateCar = async (req, res, next) => {
  try {
    const id = await req.params.id;
    const { name, image, rentPerDay, capacity } = req.body;

    // Data exist validation
    const car = await Car.findOne({
      where: { id: id },
    });

    if (!car) throw new Error(`Car with ID '${id}' is not exist`);

    // Update data
    await Car.update(
      {
        name,
        image,
        rentPerDay,
        capacity,
      },
      {
        where: { id: id },
      }
    );

    const updatedCar = await Car.findOne({
      where: { id: id },
    });

    res.status(200).json({
      status: "Success",
      message: "Data successfully updated",
      requestAt: req.requestTime,
      data: updatedCar,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  getAllCar,
  createCar,
  getCarById,
  updateCar,
};
