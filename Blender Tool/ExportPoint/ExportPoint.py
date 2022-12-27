import bpy
import os

startFrame = 0 # the first frame that you want to record
endFrame = 100 # the final frame that you want to record
objName = 'Cube' # the name of objects for recording (find it in Blender Hierarchy)

# the .txt file is stored in the same file path with the Blender file
filePath = os.path.abspath(os.path.join(bpy.data.filepath, os.pardir))
file = open(filePath + '/ExportPoint.txt', 'w')

for i in range(startFrame, endFrame):

    bpy.context.scene.frame_set(i)
    objPosition = bpy.data.objects[objName].location

    file.writelines(str(objPosition.x) + ',' + str(objPosition.y) + ',' + str(objPosition.z) + '\n')

file.close()