import express from "express";
import { getAnomalyLogs} from "../controllers/anomalyController.js";
import { getAnomalyLogById } from "../controllers/anomalyController.js";
import { getAnomalyLogsByLoadId } from "../controllers/anomalyController.js";
const router = express.Router();

router.get("/anomaly", getAnomalyLogs);
router.get("/anomaly/:id", getAnomalyLogById);
router.get("/anomaly/:loadId", getAnomalyLogsByLoadId);

export default router;