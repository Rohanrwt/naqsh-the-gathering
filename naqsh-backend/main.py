from fastapi import FastAPI

app = FastAPI(title='Naqsh | The Gathering Backend')

@app.get("/")
def home():
    return {
        "Status": "success",
        "message": "Naqsh backend is running"
    }