import bpy

newCollection = bpy.data.collections.new('Slices')
bpy.context.scene.collection.children.link(newCollection)

# oldObject = bpy.context.active_object
oldObject = bpy.data.objects['model_TMesh']

frame_start = 0
frame_end = 10

bpy.context.scene.frame_set(frame_start)

for i in range(frame_start,frame_end):

    bpy.context.scene.frame_set(i)

    newCopy = oldObject.copy()
    newCopy.data = oldObject.data.copy()
    newCopy.animation_data_clear()

    newCollection.objects.link(newCopy)

    bpy.context.view_layer.objects.active = newCopy
    bpy.ops.object.modifier_apply(modifier="Bone")
    for vg in newCopy.vertex_groups:
        newCopy.vertex_groups.remove(vg)

    world_loc = newCopy.matrix_world.to_translation()
    newCopy.parent = None        
    newCopy.matrix_world.translation = world_loc