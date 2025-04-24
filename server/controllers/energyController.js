import SensorData from "../models/sensor.model.js";

export const getSensorData = async (req, res) => {
  try {
    const sensorData = await SensorData.find()
      .sort({ timestamp: -1 })
      .limit(100);
    res.status(200).json(sensorData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveSensorData = async (data) => {
  console.log( "dddsdscscscs",data);
  try {
    const sensorData = await new SensorData(data);
    await sensorData.save();
    console.log("Data saved successfully:");
    // res.status(201).json(sensorData);
  } catch (error) { 
    console.log(error);
  } 
};

export const getEnergy= async (req, res) => {
  try {
    return  await SensorData.findOne({energy:{$gt:0}})
      .sort({ timestamp: -1 })
      .limit(1);
    // res.status(200).json(sensorData);
  } catch (error) {
   console.log(error);
  }
};