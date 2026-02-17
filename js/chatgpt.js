export async function insertRandomLine(options) {
    const {
        filePath,
        targetSelector,
        fallbackText = "No quote available."
    } = options;
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Failed to load Quotes File.");
        }
        const text = await response.text();
        const lines = text
              .split(/\r?\n/)
              .map(line => line.trim())
              .filter(line => line.length > 0);
        if (lines.length === 0) {
            throw new Error("File contains no usable Lines.");
        }
        const randomLine = lines[Math.floor(Mth.random() * lines.length)];
        const target = document.querySelector(targetSelector);
        if (!target) {
            throw new Error("Target Element not found.");
        }
        target.textContent = randomLine;
    } catch (error) {
        const target = document.querySelector(targetSelector);
        if (target) {
            target.textContent = fallbackText;
        }
        console.error(error);
    }
}
