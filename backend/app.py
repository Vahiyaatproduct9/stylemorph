from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
import base64
from process import gemini_process


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

def convert_binary_to_base64(file: UploadFile) -> str:
    binary_data = file.file.read()  # Read file bytes
    base64_encoded = base64.b64encode(binary_data).decode("utf-8")  # Convert to base64 string
    return base64_encoded

@app.get('/')
def create_connection():
    return {"status":"200"}

@app.post("/")
async def upload(
    image: UploadFile = File(...),
    object: str = Form(...)
):
    # Read uploaded image
    image_data = await image.read()
    pil_image = Image.open(BytesIO(image_data))

    # Process it (whatever your Gemini model does)
    result = gemini_process(pil_image, object)
    base64_img = result.get("image")

    if base64_img is None:
        return {"error": "Some Error Occurred, Try another Image."}

    # Decode base64 to bytes
    img_bytes = base64.b64decode(base64_img)
    buffer = BytesIO(img_bytes)
    buffer.seek(0) # Reset Stream to beginning

    return StreamingResponse(buffer, media_type="image/png")