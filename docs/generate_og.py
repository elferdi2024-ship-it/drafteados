import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630

# Create base canvas
img = Image.new("RGBA", (W, H), (12, 12, 14, 255))

# 1. Background radial glow (Brand orange #FF5A1F)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
center_x, center_y = 600, 220
max_r = 460
for r in range(max_r, 0, -8):
    alpha = int(55 * (1 - (r / max_r) ** 1.3))
    glow_draw.ellipse(
        [center_x - r, center_y - int(r * 0.75), center_x + r, center_y + int(r * 0.75)],
        fill=(255, 90, 31, alpha)
    )

glow = glow.filter(ImageFilter.GaussianBlur(55))
img = Image.alpha_composite(img, glow)

# 2. Basketball court aesthetic lines (subtle in background)
court_lines = Image.new("RGBA", (W, H), (0, 0, 0, 0))
cl_draw = ImageDraw.Draw(court_lines)

# Subtle center circle
cl_draw.ellipse([600 - 360, 315 - 360, 600 + 360, 315 + 360], outline=(255, 255, 255, 12), width=2)
cl_draw.ellipse([600 - 140, 315 - 140, 600 + 140, 315 + 140], outline=(255, 255, 255, 18), width=2)
cl_draw.line([(600, 0), (600, H)], fill=(255, 255, 255, 12), width=2)

# Subtle grid pattern
for x in range(0, W, 75):
    cl_draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 5), width=1)
for y in range(0, H, 75):
    cl_draw.line([(0, y), (W, y)], fill=(255, 255, 255, 5), width=1)

img = Image.alpha_composite(img, court_lines)

# 3. Load official logo
logo_path = "public/images/logo.png"
logo = Image.open(logo_path).convert("RGBA")
logo_size = 205
logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

# Create logo shadow / glow
logo_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ls_draw = ImageDraw.Draw(logo_shadow)
lx = (W - logo_size) // 2
ly = 48
ls_draw.ellipse([lx - 25, ly - 15, lx + logo_size + 25, ly + logo_size + 25], fill=(255, 90, 31, 95))
logo_shadow = logo_shadow.filter(ImageFilter.GaussianBlur(30))
img = Image.alpha_composite(img, logo_shadow)

# Paste logo
img.paste(logo, (lx, ly), logo)

# 4. Load Fonts
font_path = "docs/BebasNeue-Regular.ttf"
font_title = ImageFont.truetype(font_path, 108)
font_brand = ImageFont.truetype(font_path, 42)
font_badge = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 14)
font_sub = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 20)
font_pills = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 13)

draw = ImageDraw.Draw(img)

# 5. Brand text above title: "DRAFTEADOS"
brand_text = "D R A F T E A D O S"
b_bbox = draw.textbbox((0, 0), brand_text, font=font_brand)
bw = b_bbox[2] - b_bbox[0]
bx = (W - bw) // 2
by = 270
draw.text((bx, by), brand_text, fill=(255, 122, 69, 255), font=font_brand)

# 6. Main Title: "TU CASA NBA" in massive bold display typography
title_text = "TU CASA NBA"
t_bbox = draw.textbbox((0, 0), title_text, font=font_title)
tw = t_bbox[2] - t_bbox[0]
tx = (W - tw) // 2
ty = 315

# Deep drop shadow for maximum punch
draw.text((tx, ty + 5), title_text, fill=(0, 0, 0, 240), font=font_title)
draw.text((tx, ty), title_text, fill=(255, 255, 255, 255), font=font_title)

# 7. Subtitle / Eyebrow Pill
badge_text = "DESDE 2017  •  +880.000 BUQUES  •  ESPAÑA & LATAM"
bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
baw = bbox[2] - bbox[0]
bah = bbox[3] - bbox[1]
bax = (W - baw) // 2
bay = 438

# Pill background
pad_x, pad_y = 16, 6
pill_rect = [bax - pad_x, bay - pad_y, bax + baw + pad_x, bay + bah + pad_y + 2]
draw.rounded_rectangle(pill_rect, radius=14, fill=(25, 25, 30, 220), outline=(255, 90, 31, 140), width=1)
draw.text((bax, bay), badge_text, fill=(240, 240, 245, 255), font=font_badge)

# 8. Description line
sub_text = "Marcadores en directo • Clasificación • Calendario oficial • Podcast 3+1 • Pick'em"
s_bbox = draw.textbbox((0, 0), sub_text, font=font_sub)
sw = s_bbox[2] - s_bbox[0]
sx = (W - sw) // 2
sy = 485
draw.text((sx, sy), sub_text, fill=(185, 185, 195, 255), font=font_sub)

# 9. Bottom Pill Badges with clean bullet styling (No missing emoji glyphs)
pills = [
    "NBA HUB EN VIVO",
    "HORARIOS HISPANO",
    "PODCAST 3+1",
    "PRONÓSTICOS PICK'EM"
]

pill_gap = 14
pill_widths = []
for p in pills:
    p_box = draw.textbbox((0, 0), p, font=font_pills)
    pill_widths.append(p_box[2] - p_box[0] + 34)

total_pills_w = sum(pill_widths) + pill_gap * (len(pills) - 1)
px = (W - total_pills_w) // 2
py = 538

for i, p in enumerate(pills):
    pw = pill_widths[i]
    draw.rounded_rectangle(
        [px, py, px + pw, py + 36],
        radius=8,
        fill=(22, 22, 26, 240),
        outline=(255, 255, 255, 22),
        width=1
    )
    p_box = draw.textbbox((0, 0), p, font=font_pills)
    ptw = p_box[2] - p_box[0]
    draw.text((px + (pw - ptw) // 2, py + 10), p, fill=(220, 220, 230, 255), font=font_pills)
    px += pw + pill_gap

# 10. Top accent brand strip
draw.line([(0, 0), (W, 0)], fill=(255, 90, 31, 255), width=5)

# 11. Save outputs
output_png = "public/images/og-main.png"
output_jpg = "public/images/og-main.jpg"
img_rgb = img.convert("RGB")

img.save(output_png, "PNG", optimize=True)
img_rgb.save(output_jpg, "JPEG", quality=92, optimize=True)

img.save("public/og-image.png", "PNG", optimize=True)
img_rgb.save("public/og-image.jpg", "JPEG", quality=92, optimize=True)

print("Generated refined OG Images successfully!")
