const Child = require('../models/Child');
const Parent = require('../models/Parent');
const Schedule = require('../models/Schedule');
const { getPaginationParams, buildPaginatedResponse } = require('../util/pagination');

const createChild = async (req, res, next) => {
  try {
    const { firstName, lastName, gender, dateOfBirth, weightAtBirth, parentId } = req.body;

    const parentExists = await Parent.findById(parentId);
    if (!parentExists) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    const child = await Child.create({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      weightAtBirth,
      parent: parentId,
    });

    res.status(201).json(child);
  } catch (error) {
    next(error);
  }
};

const getAllChildren = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);

    const filter = {};
    if (req.query.parent) filter.parent = req.query.parent;

    const [children, total] = await Promise.all([
      Child.find(filter)
        .populate('parent', 'firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Child.countDocuments(filter),
    ]);

    res.status(200).json(buildPaginatedResponse(children, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getChildById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const child = await Child.findById(id).populate('parent');
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
};

const updateChild = async (req, res, next) => {
  try {
    const { id } = req.params;

    const child = await Child.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
};

const deleteChild = async (req, res, next) => {
  try {
    const { id } = req.params;

    const child = await Child.findByIdAndDelete(id);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    await Schedule.deleteMany({ child: id });

    res.status(200).json({ message: 'Child and associated schedules deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChild,
  getAllChildren,
  getChildById,
  updateChild,
  deleteChild,
};
