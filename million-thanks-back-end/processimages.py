import os
import zipfile
import json
import usaddress
import requests
from flask import Flask
from flask import jsonify
from flask_cors import CORS
import flask
import os
import shutil
from geopy.geocoders import Nominatim

app = Flask(__name__)
CORS(app)

geolocator = Nominatim()
getcur = os.getcwd()
getbelow = os.path.split(getcur)[0]

def detect_document(path):
    returnstring = ""
    reviewBool = False
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
                    if word.confidence < 0.95:
                        reviewBool = True
                    # print('Word text: {} (confidence: {})'.format(word_text, word.confidence))
                    returnstring += word_text + " "
    
    return returnstring, reviewBool

def runocr(files):
    if(os.name=='posix'):
        credential_path = 'ocr/license.json'
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
    else:
        os.system('$env:GOOGLE_APPLICATION_CREDENTIALS="license.json"')
    # extract any .zip files in the uploadimage directory
    for filename in os.listdir("uploadimage"):
        if filename.lower().endswith(".zip"):
            with open ("uploadimage\\"+filename):
                with zipfile.ZipFile("uploadimage\\"+filename, 'r') as zip_ref:
                    zip_ref.extractall("uploadimage")
            os.remove("uploadimage\\"+filename)

    #perform ocr on any jpg in uploadimage
    # imgcount = 1
    # for filename in os.listdir("uploadimage"):
    #     if filename.lower().endswith(".jpg"):
    #         print("Image " + str(imgcount) + ":\n")
    #         print(detect_document("uploadimage\\" + filename))
    #         imgcount += 1
    #         print("-------------------------------\n")

    jsonarray = []
    jsonarrayreview = []
    jsonarraynoreview = []
    filecount = 0
    for filename in os.listdir("uploadimage"):
        if filename.lower().endswith(".jpg"):
            filecount += 1
    for filename in os.listdir("uploadimage"):
        if filename.lower().endswith(".jpg"):
            (output,boolean) = detect_document("uploadimage/" + filename)
            output = output.replace(",", "")
            outputsplit = output.split()
            # zip = outputsplit[len(outputsplit)-1]
            # state = outputsplit[len(outputsplit)-2]
            # city = outputsplit[len(outputsplit)-3]
            # print(city + ", " + state + ", " + zip)

            parsedaddress = usaddress.tag(output)
            # print(parsedaddress)  
            print(parsedaddress[0])
            # print(parsedaddress[0]['Recipient'])
            if 'Recipient' in  parsedaddress[0]:
                name = parsedaddress[0]['Recipient']
            else:
                name = ""
            # print(parsedaddress[0]['StreetNamePreDirectional'] + " " +  parsedaddress[0]['StreetName'] + " " +parsedaddress[0]['StreetNamePostType'])
            # address = parsedaddress[0]['StreetNamePreDirectional'] + " " +  parsedaddress[0]['StreetName'] + " " +parsedaddress[0]['StreetNamePostType']
            if 'AddressNumber' in parsedaddress[0]:
                streetnumber = parsedaddress[0]['AddressNumber']
            else:
                streetnumber = ""

            if 'StreetName' in parsedaddress[0]:
                if 'StreetNamePostType' in parsedaddress[0]:
                    address = parsedaddress[0]['StreetName'] + " " + parsedaddress[0]['StreetNamePostType']    
                else:
                    address = parsedaddress[0]['StreetName']
            else:
                address = ""
            
            # print(parsedaddress[0]['PlaceName'])
            if 'PlaceName' in parsedaddress[0]:
                city = parsedaddress[0]['PlaceName']
            else:
                city = ""
            # print(parsedaddress[0]['StateName'])
            if 'StateName' in parsedaddress[0]:
                state = parsedaddress[0]['StateName']
            else:
                state = ""
            # print(parsedaddress[0]['ZipCode'])
            if 'ZipCode' in parsedaddress[0]:
                zip = parsedaddress[0]['ZipCode']
            else:
                zip = ""
            customer_street = streetnumber + " " + address

            fulladdress = customer_street + " " + city + " " + state + " " + zip

            
            location = geolocator.geocode(fulladdress)

            if location:
                longitude = location.longitude
                latitude = location.latitude
            else:
                longitude = ""
                latitude = ""

            
            data = {}
            # data['streetnumber'] = streetnumber
            # data['name'] = name
            # data['address'] = address
            # data['city'] = city
            # data['state'] = state
            # data['zip'] = zip
            data['file_name'] = filename
            data['customer_name'] = name
            data['customer_street'] = customer_street
            data['customer_city'] = city
            data['customer_state'] = state
            data['customer_zip'] = zip
            data['customer_longitude'] = longitude
            data['customer_latitude'] = latitude
            if boolean:
                jsonarrayreview.append(data)
            else:
                jsonarraynoreview.append(data)
            #shutil.move("uploadimage\\"+filename, getbelow +"\million-thanks-front-end\src\component\storage",copy_function = shutil.copytree )
            shutil.copy(os.path.join("uploadimage\\", filename), os.path.join(getbelow +"\million-thanks-front-end\src\component\storage\\", filename))
            # jsonarray.append(data)
            

    # return json.dumps(data)

    # json_review_data = json.dumps(jsonarrayreview)
    # json_noreview_data = json.dumps(jsonarraynoreview)

    jsonarray.append(jsonarrayreview)
    jsonarray.append(jsonarraynoreview)

    return json.dumps(jsonarray)
    # return jsonarray

def deleteimages():
    filelist = [ f for f in os.listdir('uploadimage') if f.lower().endswith(".jpg") ]
    for f in filelist:
        os.remove(os.path.join('uploadimage', f))
    filelist = [ f for f in os.listdir('uploadimage') if f.endswith(".zip") ]
    for f in filelist:
        os.remove(os.path.join('uploadimage', f))

'''
print(json_data)
@app.route('/')
def processjson():
    return json_data
app.run(host='localhost', port=3300)

# @app.route('/test', methods = ['POST'])
# def index():
#     return json_data
'''
