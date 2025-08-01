# import google.generativeai as genai
from google.genai import types
from PIL import Image
import os
from io import BytesIO
from dotenv import load_dotenv, find_dotenv
import base64

# --- Load environment variables and configure the API key once ---
load_dotenv(find_dotenv())


def gemini_process(image_file, text):
    from google import genai
    try:
        client = genai.Client(
        api_key=os.environ.get('GOOGLE_API_KEY')
        )

        # Your helper function is good, but the current SDK prefers a dict over a Blob object.
        def image_to_part(pil_image: Image.Image):
            # """Converts a PIL Image to a dict format for the Gemini API."""
            buffer = BytesIO()
            pil_image.save(buffer, format="PNG")
            return {"mime_type": "image/png", "data": buffer.getvalue()}
        # --- Model Selection (CHANGED) ---
        # Use a powerful model capable of image generation.
        # Convert PIL image to the part format the library expects
        # image_part = image_to_part(image_file)
        prompt_parts = os.environ.get('GEMINI_STYLE_TRANSFER_PROMPT_ONE'), text, os.environ.get('GEMINI_STYLE_TRANSFER_PROMPT_TWO'), text, os.environ.get('GEMINI_STYLE_TRANSFER_PROMPT_THREE', '')
        response = client.models.generate_content(
            model="gemini-2.0-flash-preview-image-generation",
            contents=[str(prompt_parts), image_file],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT','IMAGE']
            )
        )
        # print("This is the response 1: ",response.candidates[0].content.parts)

        result_text = ""
        result_image_base64 = None

        for part in response.candidates[0].content.parts:
            if part.text is not None:
                result_text += part.text
                # print(result_text)
            if part.inline_data is not None:
                result_image_base64 = base64.b64encode(part.inline_data.data).decode('utf-8')
                # Image.open(BytesIO((part.inline_data.data))).show()
        return {
            "text": result_text,
            "image": result_image_base64
        }

    except Exception as e:
      # print(f"Error in gemini_process: {e}")
        return {"error": str(e)}

# sample_img = Image.open('img.jpg')
# gemini_process(sample_img, 'car')