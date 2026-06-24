import os
from PIL import Image

public_dir = r"c:\Users\Garv\OneDrive\Desktop\zerobill\public"
files = sorted(os.listdir(public_dir))

print("Starting compression of PNG images to WebP...")

compressed_files = []

for f in files:
    if f.lower().endswith('.png') and f.lower() != 'favicon.png':
        png_path = os.path.join(public_dir, f)
        base_name = os.path.splitext(f)[0]
        webp_name = f"{base_name}.webp"
        webp_path = os.path.join(public_dir, webp_name)
        
        try:
            with Image.open(png_path) as img:
                # Convert to RGB if mode is RGBA/P
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                # Save as WebP with 80% quality
                img.save(webp_path, 'WEBP', quality=80)
                
                old_size = os.path.getsize(png_path)
                new_size = os.path.getsize(webp_path)
                reduction = (old_size - new_size) / old_size * 100
                
                print(f"Compressed: {f} -> {webp_name}")
                print(f"  Size reduced from {old_size / 1024 / 1024:.2f}MB to {new_size / 1024 / 1024:.2f}MB ({reduction:.1f}% reduction)")
                
                compressed_files.append({
                    "original": f,
                    "webp": webp_name,
                    "size_mb": new_size / 1024 / 1024
                })
        except Exception as e:
            print(f"Error compressing {f}: {e}")

print("\nAll image compressions completed!")
