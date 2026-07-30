const Parent = require("../models/Parent");
const Child = require("../models/Child");
const {
  getPaginationParams,
  buildPaginatedResponse,
} = require("../util/pagination");
const {
  isDuplicateKeyError,
  getDuplicateKeyField,
} = require("../util/duplicateKeyError");

const createParent = async (req, res, next) => {
  try {
    const parent = await Parent.create(req.body);
    res.status(201).json(parent);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return res.status(409).json({
        message: `${getDuplicateKeyField(error)} is already in use`,
      });
    }
    next(error);
  }
};

const getAllParents = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);

    const [parents, total] = await Promise.all([
      Parent.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Parent.countDocuments(),
    ]);

    res.status(200).json(buildPaginatedResponse(parents, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getParentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parent = await Parent.findById(id);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    const children = await Child.find({ parent: id }).select(
      "firstName lastName dateOfBirth gender",
    );

    res.status(200).json({ ...parent.toObject(), children });
  } catch (error) {
    next(error);
  }
};

const updateParent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parent = await Parent.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.status(200).json(parent);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return res.status(409).json({
        message: `${getDuplicateKeyField(error)} is already in use`,
      });
    }
    next(error);
  }
};

const deleteParent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const childCount = await Child.countDocuments({ parent: id });
    if (childCount > 0) {
      return res.status(409).json({
        message: `Cannot delete parent with ${childCount} linked child record(s). Reassign or remove those first.`,
      });
    }

    const parent = await Parent.findByIdAndDelete(id);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.status(200).json({ message: "Parent deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent,
};
