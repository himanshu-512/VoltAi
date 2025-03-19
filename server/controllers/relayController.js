import relayControl from "../utils/relayControl.js";

export const controlRelay = (req, res) => {
  const { loadId, action } = req.body;
  if (action === "on") {
    relayControl.turnOnLoad(loadId);
  } else if (action === "off") {
    relayControl.turnOffLoad(loadId);
  }

  res.json({ message: `Load ${loadId} turned ${action}` });
};
