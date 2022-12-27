import bpy

newCollection = bpy.data.collections.new('Slices')
bpy.context.scene.collection.children.link(newCollection)

oldObject = bpy.context.active_object

frame_start = 0
frame_end = 10


bpy.context.scene.frame_set(frame_start)

for i in range(frame_start,frame_end):

    bpy.context.scene.frame_set(i)

    newCopy = oldObject.copy()
    newCopy.data = oldObject.data.copy()
    newCopy.animation_data_clear()

    newCollection.objects.link(newCopy)