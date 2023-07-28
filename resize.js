const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./input";
const outputDir = "./output";

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir);
}

const resizeOptions = [
	{ width: 1920, suffix: "_1x" },
	{ width: 1280, suffix: "_2x" },
	{ width: 1024, suffix: "_3x" },
	{ width: 768, suffix: "_4x" },
	{ width: 450, suffix: "_5x" },
	{ width: 20, suffix: "_blurhash" },
];

fs.readdirSync(inputDir).forEach(async (file) => {
	const inputImagePath = path.join(inputDir, file);

	// Check if the file is an image (optional)
	const isImage = [".webp"].some((ext) => file.toLowerCase().endsWith(ext));

	if (isImage) {
		for (const options of resizeOptions) {
			const { width, suffix } = options;

			const outputImagePath = path.join(outputDir, path.basename(file, path.extname(file)) + suffix + path.extname(file));

			await sharp(inputImagePath).resize({ width: width, withoutEnlargement: true, interpolation: "lanczos" }).toFile(outputImagePath);

			console.log(`Image ${file} resized to ${width} width successfully!`);
		}
	}
});
