const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, 'assets', 'images');
const files = ['icon.png', 'splash-icon.png', 'adaptive-icon.png', 'favicon.png'];

// Minimal 1x1 Red PNG
const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
const buffer = Buffer.from(base64Png, 'base64');

files.forEach(file => {
    fs.writeFileSync(path.join(assetDir, file), buffer);
    console.log(`Generated ${file}`);
});
