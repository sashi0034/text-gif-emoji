from PIL import Image
import glob

files = sorted(glob.glob('./output/frame/*.png'))
print(files)

images = list(map(lambda file: Image.open(file), files))

images[0].save('output/output.gif', save_all=True, append_images=images[1:], duration=400, loop=0)