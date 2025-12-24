# Server Banner Images

Drop your server banner images here. Each server card will automatically use them if present.

## Naming Convention

Name your images to match your server IDs in `src/config.ts`:

```
{server_id}.jpg        # Primary banner image
{server_id}_2.jpg      # Optional additional images
```

## Examples

For the test server (ID: 8854155):
- `8854155.jpg` - Main banner (displayed on card)

For Rustborne NA 5x (ID: 12345):
- `12345.jpg` - Main banner

## Image Specifications

- **Format**: JPG, PNG, WebP
- **Size**: 400x200px minimum (4:2 aspect ratio recommended)
- **File Size**: < 500KB for optimal performance
- **Quality**: 72-96 DPI

## How It Works

The ServerCard component will:
1. Look for `/public/servers/{server_id}.jpg`
2. Fall back to generated SVG graphic if image not found
3. Display the image in the card header

## Supported Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## Rust Game Asset Tips

Capture screenshots from Rust with:
- Server name overlaid
- Key features visible
- Action/drama (raids, buildings, events)
- High contrast for visibility at small sizes

You can also use Rust promotional materials or commission custom graphics.
