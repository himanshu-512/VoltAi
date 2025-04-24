from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI()

# Define Pydantic model for response
class AnomalyData(BaseModel):
    time: int
    current: float
    voltage: float
    anomaly_probability: float

@app.get("/anomalies", response_model=List[AnomalyData])
def get_all_anomalies():
    result = data[['time', 'current', 'voltage', 'anomaly_probability']].to_dict(orient='records')
    return result

@app.get("/anomalies/{time}", response_model=Optional[AnomalyData])
def get_anomaly_by_time(time: int):
    row = data[data['time'] == time]
    if row.empty:
        return None
    result = row[['time', 'current', 'voltage', 'anomaly_probability']].iloc[0].to_dict()
    return result

# Run the server
if __name__ == "__main__":
    uvicorn.run("your_script_name:app", host="0.0.0.0", port=8000, reload=True)
