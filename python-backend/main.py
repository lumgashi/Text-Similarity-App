from fastapi import FastAPI
from pydantic import BaseModel
import fasttext
from scipy.spatial.distance import cosine
import numpy as np

app = FastAPI()

# Load FastText pre-trained model
model = fasttext.load_model('cc.en.300.bin')

class TextInput(BaseModel):
    text1: str
    text2: str

def get_embedding(text: str) -> np.ndarray:
    return model.get_sentence_vector(text)

@app.post("/compute-embeddings")
async def compute_embeddings(input: TextInput):
    try:
        embedding1 = get_embedding(input.text1)
        embedding2 = get_embedding(input.text2)
        
        # Compute cosine similarity
        similarity_score = 1 - cosine(embedding1, embedding2)
        
        return {"similarity_score": float(similarity_score)}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)