// Regenerates songs.json, the static track manifest the frontend reads.
// Run with: node scripts/generate-songs.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const musicsDir = path.join(root, "musics");
const isAudio = f => f.toLowerCase().endsWith(".mp3");

const entries = fs.readdirSync(musicsDir);

const musics = entries.filter(isAudio).sort();
const folders = {};

for (const entry of entries) {
    const full = path.join(musicsDir, entry);
    if (!fs.statSync(full).isDirectory()) continue;
    folders[entry] = fs.readdirSync(full).filter(isAudio).sort();
}

const manifest = { musics, folders };
fs.writeFileSync(
    path.join(root, "songs.json"),
    JSON.stringify(manifest, null, 4) + "\n"
);

console.log(
    `songs.json written: ${musics.length} root track(s), ${Object.keys(folders).length} folder(s)`
);
