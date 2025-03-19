import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  voltage: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  power: {
    type: Number,
    // required: true,
  },
  energy: {
    type: Number,  // Should store cumulative energy (Wh)
    default: 0,
  },
  anomaly : {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


// Middleware: Automatically calculate power & energy before saving
// sensorSchema.pre("save", function (next) {
//   //extrat time from last data and subtatat form current time
  
//   this.power = this.voltage * this.current;

//   this.energy += this.power*(1/3600);
//   next();
// });


const SensorData = mongoose.model("SensorData", sensorSchema);

export default SensorData;
