import os
import zipfile

def detect_document(path):
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
                    print(word_text)

#extract any .zip files in the uploadimage directory
for filename in os.listdir("uploadimage"):
    if filename.lower().endswith(".zip"):
        with zipfile.ZipFile("uploadimage\\"+filename, 'r') as zip_ref:
            zip_ref.extractall("uploadimage")

#perform ocr on any jpg in uploadimage
imgcount = 1
for filename in os.listdir("uploadimage"):
    if filename.lower().endswith(".jpg"):
        print("Image " + str(imgcount) + ":\n")
        detect_document("uploadimage\\" + filename)
        imgcount += 1
        print("-------------------------------\n")