// utils/detectAnomaly.js
const detectAnomaly = (data) => {
    return data.voltage > 260 || data.current > 30 || data.power > 3000;
};
export default detectAnomaly;