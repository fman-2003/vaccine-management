const Vaccine = require("../models/Vaccine");
const Schedule = require("../models/Schedule");
const {
  getPaginationParams,
  buildPaginatedResponse,
} = require("../util/pagination");
const {
  isDuplicateKeyError,
  getDuplicateKeyField,
} = require("../util/duplicateKeyError");

const createVaccine = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.create(req.body);
    res
      .status(201)
      .json({ data: vaccine, message: "Vaccine created successfully" });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return res.status(409).json({
        message: `${getDuplicateKeyField(error)} is already in use`,
      });
    }
    next(error);
  }
};

const getAllVaccines = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);

    const [vaccines, total] = await Promise.all([
      Vaccine.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Vaccine.countDocuments(),
    ]);

    res.status(200).json(buildPaginatedResponse(vaccines, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getVaccineById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vaccine = await Vaccine.findById(id);
    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.status(200).json({ data: vaccine });
  } catch (error) {
    next(error);
  }
};

const updateVaccine = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vaccine = await Vaccine.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.status(200).json({ data: vaccine });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return res.status(409).json({
        message: `${getDuplicateKeyField(error)} is already in use`,
      });
    }
    next(error);
  }
};

const deleteVaccine = async (req, res, next) => {
  try {
    const { id } = req.params;

    const scheduleCount = await Schedule.countDocuments({ vaccine: id });
    if (scheduleCount > 0) {
      return res.status(409).json({
        message: `Cannot delete vaccine referenced by ${scheduleCount} schedule(s).`,
      });
    }

    const vaccine = await Vaccine.findByIdAndDelete(id);
    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    res.status(200).json({ message: "Vaccine deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVaccine,
  getAllVaccines,
  getVaccineById,
  updateVaccine,
  deleteVaccine,
};
