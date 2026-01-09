# AI Food Image Generation Guide for Birrieria Chalio

This guide will help you generate all the required food images for the Birrieria Chalio website using AI image generation tools like DALL-E, Midjourney, Stable Diffusion, or similar services.

## Image Requirements

### Technical Specifications
- **Format**: JPG (for photographs)
- **Quality**: High resolution (at least 1024x1024 for menu items, 1920x1080 for hero)
- **Style**: Professional food photography, warm lighting, appetizing composition
- **Color Temperature**: Warm tones to enhance appeal

### Image List

#### 1. Hero Background Image
**Filename**: `hero-bg.jpg`
**Dimensions**: 1920x1080 (landscape)
**Prompt**: "Blurred background of authentic Mexican food, birria tacos and consomé on rustic wooden table, warm ambient lighting, shallow depth of field, professional food photography, appetizing atmosphere"

#### 2. Category Icons (Circular - 200x200px)

**Filename**: `birria-icon.jpg`
**Prompt**: "Close-up of authentic Mexican birria in red consomé broth, rich brown-red color, tender meat, professional food photography, circular crop, top view"

**Filename**: `taco-icon.jpg`
**Prompt**: "Close-up of authentic Mexican taco with meat and cilantro, professional food photography, circular crop, top view"

**Filename**: `kids-icon.jpg`
**Prompt**: "Close-up of kid-friendly Mexican food, colorful and appealing, professional food photography, circular crop, top view"

#### 3. Signature Birria Items (800x800px minimum)

**Filename**: `birria-combo.jpg`
**Prompt**: "Authentic Mexican birria combo plate, tender birria meat in rich red consomé, served with rice, refried beans, fresh tortillas, lime wedges, cilantro, onions, professional food photography, overhead view, rustic wooden table"

**Filename**: `plato-birra.jpg`
**Prompt**: "Traditional Mexican birria plate (plato birra), slow-cooked meat in rich red-brown consomé, garnished with cilantro and onions, lime wedges on side, professional food photography, close-up view"

**Filename**: `birria-pound.jpg`
**Prompt**: "Mexican birria meat by the pound in takeout container, tender shredded beef in rich red consomé, professional food photography, top view"

**Filename**: `consome-birra.jpg`
**Prompt**: "Bowl of authentic Mexican birria consomé broth, rich red-brown color, cilantro and onion garnish, steam rising, professional food photography, close-up"

#### 4. Tacos (800x800px minimum)

**Filename**: `taco-birria.jpg`
**Prompt**: "Authentic Mexican birria taco (quesabirria), crispy golden tortilla with melted cheese, tender birria meat, served with small cup of red consomé for dipping, cilantro and onion garnish, professional food photography"

**Filename**: `taco-asado.jpg`
**Prompt**: "Mexican carne asada taco, grilled beef strips on corn tortilla, fresh cilantro, diced onions, lime wedge, professional food photography, close-up"

**Filename**: `taco-carnitas.jpg`
**Prompt**: "Mexican carnitas taco, slow-cooked crispy pork on corn tortilla, cilantro, onions, salsa verde, professional food photography, close-up"

**Filename**: `taco-pastor.jpg`
**Prompt**: "Mexican al pastor taco, marinated pork with grilled pineapple, cilantro, onions on corn tortilla, professional food photography, close-up"

**Filename**: `taco-pollo.jpg`
**Prompt**: "Mexican grilled chicken taco (taco de pollo), seasoned chicken breast on corn tortilla, lettuce, tomatoes, cilantro, professional food photography, close-up"

**Filename**: `taco-barbacoa.jpg`
**Prompt**: "Mexican barbacoa taco, tender shredded beef on corn tortilla, cilantro, onions, lime, professional food photography, close-up"

**Filename**: `taco-cabeza.jpg`
**Prompt**: "Mexican taco de cabeza (beef head meat taco), traditional preparation on corn tortilla, cilantro, onions, salsa, professional food photography, close-up"

**Filename**: `taco-chicharron.jpg`
**Prompt**: "Mexican chicharrón taco, crispy fried pork skin with salsa verde on corn tortilla, professional food photography, close-up"

**Filename**: `taco-nopal.jpg`
**Prompt**: "Mexican nopales taco, grilled cactus paddles on corn tortilla, cilantro, onions, queso fresco, professional food photography, close-up"

#### 5. Kids Menu Items (800x800px minimum)

**Filename**: `nino-chicken.jpg`
**Prompt**: "Kids meal chicken fingers with golden crispy breading, served with French fries and ketchup on colorful plate, kid-friendly presentation, professional food photography"

**Filename**: `nino-enchilada.jpg`
**Prompt**: "Kids cheese enchilada plate, rolled tortilla with melted cheese, red enchilada sauce, served with Mexican rice and refried beans, kid-friendly presentation, professional food photography"

## How to Generate Images

### Option 1: Using DALL-E (OpenAI)
1. Go to [https://openai.com/dall-e-3](https://openai.com/dall-e-3)
2. Copy each prompt from above
3. Paste into DALL-E interface
4. Generate and download the image
5. Rename according to the filename specified
6. Resize if needed to meet specifications

### Option 2: Using Midjourney
1. Join Midjourney Discord
2. Use `/imagine` command with each prompt
3. Add `--ar 1:1` for square images (menu items)
4. Add `--ar 16:9` for hero background
5. Add `, professional food photography, 8k, highly detailed` to improve quality
6. Upscale your favorite generation
7. Download and rename according to specifications

### Option 3: Using Stable Diffusion (Free)
1. Use [DreamStudio](https://beta.dreamstudio.ai/) or local installation
2. Paste prompts with additional parameters:
   - Steps: 50
   - CFG Scale: 7-9
   - Sampler: DPM++ 2M Karras
3. Generate multiple versions and select best
4. Download and rename

### Option 4: Using Leonardo.AI (Free tier available)
1. Go to [https://leonardo.ai](https://leonardo.ai)
2. Select "PhotoReal" model for realistic food photography
3. Paste prompts from this guide
4. Generate and download images
5. Rename according to specifications

## Post-Processing Tips

After generating images:

1. **Crop**: Use circular crop for category icons
2. **Optimize**: Compress images using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
3. **Adjust**: Enhance warmth and saturation slightly for more appetizing look
4. **Resize**: Ensure proper dimensions for web optimization

## Batch Processing Script

You can use the included `generate-placeholders.html` file to:
- See all required images in one place
- Track which images you've generated
- Preview images before adding to site

## Final Steps

1. Generate all images using your preferred AI tool
2. Save them in the `images/` folder with exact filenames
3. Optimize for web (compress without losing quality)
4. Open `index.html` in browser to see the complete website
5. Verify all images load correctly

## Alternative: Placeholder Images

If you want to test the layout before generating AI images, you can use:
- [Unsplash](https://unsplash.com/s/photos/mexican-food) for free food photos
- [Pexels](https://www.pexels.com/search/mexican%20food/) for stock images
- The included placeholder generator

## Notes

- All prompts are optimized for authentic Mexican cuisine aesthetics
- Images should look professional and appetizing
- Maintain consistent lighting and style across all images
- Birria should have characteristic red-brown consomé
- Tacos should be on authentic corn tortillas where applicable
