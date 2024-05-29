from fastapi import FastAPI, Body, Depends, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from gtts import gTTS
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)  # Set logging level (adjust as needed)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# Dependency for retrieving body data (can be customized for validation)
async def get_text(request: Request):
    data = await request.json()
    return data.get("text")


# Text-to-speech route
@app.post("/api/tts")
async def text_to_speech(text: str = Depends(get_text)):
    logging.info(f"Received text: {text}")  # Use logging.info for print-like behavior

    try:
        tts = gTTS(text=text, lang="en")  # Adjust language as needed
        audio_data = BytesIO()
        tts.write_to_fp(audio_data)
        audio_data.seek(0)
        return Response(content=audio_data.getvalue(), media_type="audio/mp3")
    except Exception as e:
        logging.error(f"Error generating speech: {e}")  # Log errors for debugging
        return Response(content="Error converting text to speech. Please try again later.", status_code=500)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
