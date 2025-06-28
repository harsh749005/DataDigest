from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from fastapi.responses import JSONResponse

app = FastAPI()

# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity, adjust as needed
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint to handle file upload
@app.post("/analyze/")
async def analyze(file:UploadFile = File(...)):
    contents = await file.read()
    try:
        # First, try UTF-8
        decoded = contents.decode("utf-8")
    except UnicodeDecodeError:
        # If that fails, try ISO-8859-1
        decoded = contents.decode("ISO-8859-1")
    df = pd.read_csv(io.StringIO(decoded), on_bad_lines='skip')
    decoded_text = decoded.splitlines()
    print("Lines in raw CSV:", len(decoded_text))
    print("Rows in DataFrame:", len(df))
    

    summary = {
        "rows":len(decoded_text),
        "columns":df.shape[1],
    }
    readable_summary = (
        f"The dataset contains {summary['rows']} rows and {summary['columns']} columns. "
        # f"Columns include: {', '.join(summary['columns_list'])}. "
        # f"There are {summary['missing_values']} missing values."
    )

    return {"summary": readable_summary}
