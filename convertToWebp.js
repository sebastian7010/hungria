const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'images');

fs.readdir(inputDir, async(err, files) => {
    if (err) {
        console.error('Error leyendo la carpeta:', err);
        return;
    }

    const validExts = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff'];

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        const baseName = path.basename(file, ext);
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(inputDir, `${baseName}.webp`);

        if (validExts.includes(ext)) {
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`Convertido: ${file} → ${baseName}.webp`);

                // Eliminar archivo original
                fs.unlinkSync(inputPath);
                console.log(`Eliminado: ${file}`);
            } catch (err) {
                console.error(`Error con ${file}:`, err);
            }
        }
    }
});