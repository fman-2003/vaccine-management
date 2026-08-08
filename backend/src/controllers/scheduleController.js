const Schedule = require("../models/Schedule");
const Child = require("../models/Child");
const Vaccine = require("../models/Vaccine");
const {
  getPaginationParams,
  buildPaginatedResponse,
} = require("../util/pagination");

const createSchedule = async (req, res, next) => {
  try {
    const { child, vaccine, earliestDate, dateOfImmunization, comment } =
      req.body;

    const [childExists, vaccineExists] = await Promise.all([
      Child.findById(child),
      Vaccine.findById(vaccine),
    ]);

    if (!childExists) {
      return res.status(404).json({ message: "Child not found" });
    }
    if (!vaccineExists) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    const schedule = await Schedule.create({
      child,
      vaccine,
      earliestDate,
      dateOfImmunization,
      comment,
    });

    return res
      .status(201)
      .json({ data: schedule, message: "New schedule created" });
  } catch (error) {
    next(error);
  }
};

const getSchedules = async (req, res, next) => {
  try {
    const { status, child, date } = req.query;
    const { page, limit, skip } = getPaginationParams(req.query);

    const filter = {};
    if (status) filter.status = status;
    if (child) filter.child = child;

    if (date === "today") {
      const startOfDay = new Date();
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setUTCHours(23, 59, 59, 999);
      filter.earliestDate = { $gte: startOfDay, $lte: endOfDay };
    }

    const [schedules, total] = await Promise.all([
      Schedule.find(filter)
        .populate("child", "firstName lastName")
        .populate("vaccine", "type")
        .sort({ earliestDate: 1 })
        .skip(skip)
        .limit(limit),
      Schedule.countDocuments(filter),
    ]);

    return res
      .status(200)
      .json(buildPaginatedResponse(schedules, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getSchedulesByChild = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const { status } = req.query;

    const filter = { child: childId };
    if (status) filter.status = status;

    const schedules = await Schedule.find(filter)
      .populate("vaccine")
      .sort({ earliestDate: 1 });

    return res.status(200).json({ data: schedules });
  } catch (error) {
    next(error);
  }
};

const updateSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res
      .status(200)
      .json({ data: schedule, message: "Schedule updated" });
  } catch (error) {
    next(error);
  }
};

const deleteSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getDailySummary = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    const todaysSchedules = await Schedule.find({
      earliestDate: { $gte: startOfDay, $lte: endOfDay },
    }).populate("vaccine", "type");

    const missedCount = await Schedule.countDocuments({ status: "missed" });

    const breakdownByVaccineType = todaysSchedules.reduce((acc, schedule) => {
      const vaccineType = schedule.vaccine?.type || "Unknown";
      acc[vaccineType] = (acc[vaccineType] || 0) + 1;
      return acc;
    }, {});

    return res.status(200).json({
      totalScheduledToday: todaysSchedules.length || 0,
      missedCount,
      breakdownByVaccineType,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSchedule,
  getSchedules,
  getSchedulesByChild,
  updateSchedule,
  deleteSchedule,
  getDailySummary,
};
