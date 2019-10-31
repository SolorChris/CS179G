import os
import ocrapi.py as ocrapi

for filename in os.listdir("uploadimage")
    if filename.endswith(".jpg"):
        ocrapi.detect_document(filename)