import os
import zipfile
import json
import usaddress
import requests
from flask import Flask
from flask import jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def detect_document(path):
    returnstring = ""
    """Detects document features in an image."""
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.document_text_detection(image=image)

    # print everything, including breakdown and confidence
    # for page in response.full_text_annotation.pages:
    #     for block in page.blocks:
    #         print('\nBlock confidence: {}\n'.format(block.confidence))

    #         for paragraph in block.paragraphs:
    #             print('Paragraph confidence: {}'.format(
    #                 paragraph.confidence))

    #             for word in paragraph.words:
    #                 word_text = ''.join([
    #                     symbol.text for symbol in word.symbols
    #                 ])
    #                 print('Word text: {} (confidence: {})'.format(
    #                     word_text, word.confidence))

    #                 for symbol in word.symbols:
    #                     print('\tSymbol: {} (confidence: {})'.format(
    #                         symbol.text, symbol.confidence))

    # #print just the words
    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                for word in paragraph.words:
                    word_text = ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                    # print(word_text)
                    returnstring += word_text + " "
    
    return returnstring

#extract any .zip files in the uploadimage directory
# for filename in os.listdir("uploadimage"):
#     if filename.lower().endswith(".zip"):
#         with zipfile.ZipFile("uploadimage\\"+filename, 'r') as zip_ref:
#             zip_ref.extractall("uploadimage")

#perform ocr on any jpg in uploadimage
# imgcount = 1
# for filename in os.listdir("uploadimage"):
#     if filename.lower().endswith(".jpg"):
#         print("Image " + str(imgcount) + ":\n")
#         print(detect_document("uploadimage\\" + filename))
#         imgcount += 1
#         print("-------------------------------\n")


for filename in os.listdir("uploadimage"):
    if filename.lower().endswith(".jpg"):
        output = detect_document("uploadimage/" + filename)
        output = output.replace(",", "")
        outputsplit = output.split()
        # zip = outputsplit[len(outputsplit)-1]
        # state = outputsplit[len(outputsplit)-2]
        # city = outputsplit[len(outputsplit)-3]
        # print(city + ", " + state + ", " + zip)

        parsedaddress = usaddress.tag(output)
        # print(parsedaddress)  
        print(parsedaddress[0])
        print(parsedaddress[0]['Recipient'])
        name = parsedaddress[0]['Recipient']
        # print(parsedaddress[0]['StreetNamePreDirectional'] + " " +  parsedaddress[0]['StreetName'] + " " +parsedaddress[0]['StreetNamePostType'])
        # address = parsedaddress[0]['StreetNamePreDirectional'] + " " +  parsedaddress[0]['StreetName'] + " " +parsedaddress[0]['StreetNamePostType']
        streetnumber = parsedaddress[0]['AddressNumber']
        address = parsedaddress[0]['StreetName'] + " " +parsedaddress[0]['StreetNamePostType']        
        print(parsedaddress[0]['PlaceName'])
        city = parsedaddress[0]['PlaceName']
        print(parsedaddress[0]['StateName'])
        state = parsedaddress[0]['StateName']
        print(parsedaddress[0]['ZipCode'])
        zip = parsedaddress[0]['ZipCode']

        
        data = {}
        data['streetnumber'] = streetnumber
        data['name'] = name
        data['address'] = address
        data['city'] = city
        data['state'] = state
        data['zip'] = zip

        json_data = json.dumps(data)
        print(json_data)
        
        @app.route('/')
        def processjson():
            return json_data
        app.run(host='localhost', port=3200)

        @app.route('/test', methods = ['POST'])
        def index():
            return json_data