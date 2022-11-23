# importing librarys
import cv2
import numpy as npy
import face_recognition as face_rec
# function
def resize(img, size) :
    width = int(img.shape[1]*size)
    height = int(img.shape[0] * size)
    dimension = (width, height)
    return cv2.resize(img, dimension, interpolation= cv2.INTER_AREA)

# img declaration
Jay = face_rec.load_image_file('sample_images\Jay.jpeg')
Jay = cv2.cvtColor(Jay, cv2.COLOR_BGR2RGB)
Jay = resize(Jay, 0.50)
Jay_test = face_rec.load_image_file('sample_images\elonmusk.jpg')
Jay_test = resize(Jay_test, 0.50)
Jay_test = cv2.cvtColor(Jay_test, cv2.COLOR_BGR2RGB)

# finding face location

faceLocation_Jay = face_rec.face_locations(Jay)[0]
encode_Jay = face_rec.face_encodings(Jay)[0]
cv2.rectangle(Jay, (faceLocation_Jay[3], faceLocation_Jay[0]), (faceLocation_Jay[1], faceLocation_Jay[2]), (255, 0, 255), 3)


faceLocation_Jaytest = face_rec.face_locations(Jay_test)[0]
encode_Jaytest = face_rec.face_encodings(Jay_test)[0]
cv2.rectangle(Jay_test, (faceLocation_Jay[3], faceLocation_Jay[0]), (faceLocation_Jay[1], faceLocation_Jay[2]), (255, 0, 255), 3)

results = face_rec.compare_faces([encode_Jay], encode_Jaytest)
print(results)
cv2.putText(Jay_test, f'{results}', (50,50), cv2.FONT_HERSHEY_COMPLEX, 1,(0,0,255), 2 )

cv2.imshow('main_img', Jay)
cv2.imshow('test_img', Jay_test)
cv2.waitKey(0)
cv2.destroyAllWindows()