from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())
import PIL.Image

image = PIL.Image.open('img.jpg')

client = genai.Client(
  api_key=os.environ.get('GOOGLE_API_KEY')
)

text_input = os.environ.get('GEMINI_STYLE_TRANSFER_PROMPT_ONE'), 'car' , os.environ.get('GEMINI_STYLE_TRANSFER_PROMPT_TWO'), 'car', os.environ.get('GEMINI_STYLE_TRANSFER_PROMPT_THREE')

print(text_input)

response = client.models.generate_content(
    model="gemini-2.0-flash-preview-image-generation",
    contents=[text_input, image],
    config=types.GenerateContentConfig(
      response_modalities=['TEXT','IMAGE']
    )
)

for part in response.candidates[0].content.parts:
  if part.text is not None:
    print(part.text)
  elif part.inline_data is not None:
    Image.open(BytesIO((part.inline_data.data))).show()