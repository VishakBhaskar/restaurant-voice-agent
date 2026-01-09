#!/usr/bin/env python3
"""
Birrieria Chalio - Image Placeholder Generator
This script generates placeholder images for testing the website layout.
For production, use AI-generated food photography as described in IMAGE-GENERATION-GUIDE.md

Requirements:
    pip install Pillow

Usage:
    python generate_images.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Color scheme matching the website
GOLD = (212, 175, 55)
DARK_GOLD = (139, 115, 85)
WHITE = (255, 255, 255)

def create_gradient_background(width, height):
    """Create a gold gradient background"""
    image = Image.new('RGB', (width, height), GOLD)
    draw = ImageDraw.Draw(image)

    # Create gradient effect
    for y in range(height):
        ratio = y / height
        r = int(GOLD[0] + (DARK_GOLD[0] - GOLD[0]) * ratio)
        g = int(GOLD[1] + (DARK_GOLD[1] - GOLD[1]) * ratio)
        b = int(GOLD[2] + (DARK_GOLD[2] - GOLD[2]) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    return image

def create_circular_image(width, height, text):
    """Create a circular placeholder image"""
    # Create square image
    image = create_gradient_background(width, height)

    # Create circular mask
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, width, height), fill=255)

    # Apply mask
    result = Image.new('RGB', (width, height), WHITE)
    result.paste(image, (0, 0), mask)

    # Add text
    draw = ImageDraw.Draw(result)
    try:
        font = ImageFont.truetype("arial.ttf", width // 10)
    except:
        font = ImageFont.load_default()

    # Calculate text position
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2

    draw.text((x, y), text, fill=WHITE, font=font)

    return result

def create_rectangular_image(width, height, text, subtext):
    """Create a rectangular placeholder image"""
    image = create_gradient_background(width, height)
    draw = ImageDraw.Draw(image)

    try:
        font_large = ImageFont.truetype("arial.ttf", width // 15)
        font_small = ImageFont.truetype("arial.ttf", width // 25)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Main text
    bbox = draw.textbbox((0, 0), text, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - height // 12
    draw.text((x, y), text, fill=WHITE, font=font_large)

    # Subtext
    bbox = draw.textbbox((0, 0), subtext, font=font_small)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    y = height // 2 + height // 8
    draw.text((x, y), subtext, fill=WHITE, font=font_small)

    return image

def main():
    """Generate all placeholder images"""

    # Create images directory if it doesn't exist
    os.makedirs('images', exist_ok=True)

    print("🎨 Generating placeholder images for Birrieria Chalio...")
    print()

    # Hero background
    print("📷 Generating hero background...")
    hero = create_rectangular_image(1920, 1080, "Hero Background", "1920x1080")
    hero.save('images/hero-bg.jpg', quality=90)
    print("   ✓ images/hero-bg.jpg")

    # Category icons
    print("\n📷 Generating category icons...")
    icons = [
        ('birria-icon', 'Birria'),
        ('taco-icon', 'Tacos'),
        ('kids-icon', 'Kids')
    ]

    for filename, text in icons:
        icon = create_circular_image(200, 200, text)
        icon.save(f'images/{filename}.jpg', quality=90)
        print(f"   ✓ images/{filename}.jpg")

    # Menu items
    menu_items = [
        # Signature Birria
        ('birria-combo', 'Birria Combo'),
        ('plato-birra', 'Plato Birra'),
        ('birria-pound', 'Birria by Pound'),
        ('consome-birra', 'Consomé Birra'),
        # Tacos
        ('taco-birria', 'Taco Birria'),
        ('taco-asado', 'Taco Asado'),
        ('taco-carnitas', 'Taco Carnitas'),
        ('taco-pastor', 'Taco Al Pastor'),
        ('taco-pollo', 'Taco Pollo'),
        ('taco-barbacoa', 'Taco Barbacoa'),
        ('taco-cabeza', 'Taco Cabeza'),
        ('taco-chicharron', 'Taco Chicharrón'),
        ('taco-nopal', 'Taco Nopal'),
        # Kids Menu
        ('nino-chicken', 'Niño Chicken'),
        ('nino-enchilada', 'Niño Enchilada')
    ]

    print("\n📷 Generating menu item images...")
    for filename, text in menu_items:
        image = create_rectangular_image(800, 800, text, "800x800")
        image.save(f'images/{filename}.jpg', quality=90)
        print(f"   ✓ images/{filename}.jpg")

    print("\n✅ All placeholder images generated successfully!")
    print(f"\n📁 Total images created: {1 + len(icons) + len(menu_items)}")
    print("\n💡 Note: These are placeholder images for testing.")
    print("   For production, use AI-generated food photography.")
    print("   See IMAGE-GENERATION-GUIDE.md for details.")
    print("\n🚀 You can now open index.html in your browser!")

if __name__ == '__main__':
    main()
