import AnomalyLog from "../models/anomalyLog.model.js";

export const getAnomalyLogs = async (req, res) => {
  try {
    const anomalyLogs = await AnomalyLog.find().sort({ detectedAt: -1 });
    res.status(200).json(anomalyLogs);
    console.log(anomalyLogs.toString());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnomalyLogById = async (req, res) => {
  try {
    const anomalyLog = await AnomalyLog.findById(req.params.id);
    res.status(200).json(anomalyLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnomalyLogsByLoadId = async (req, res) => {
  let Id = req.params.loadId.tojson();
  try {
    // this is not complete yet
    const anomalyLogs = await AnomalyLog.find({ loadId: Id });
    res.status(200).json(anomalyLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


