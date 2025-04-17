// utils/detectAnomaly.js
import * as relayControl from "../utils/relayControl.js";
import { getParticulardata } from "../controllers/particular.controller.js";
export const detectAnomaly = (data) => {
  let current1 = getParticulardata.load_I1;
  let current2 = getParticulardata.load_I2; 
  let current3 = getParticulardata.load_I3; 
  let current4 = getParticulardata.load_I4;
  if(current1 > 0 || current2 > 1 || current3 > 0 || current4 > 1){
    relayControl.turnOffLoad("load_id");
  }
};
export default detectAnomaly;