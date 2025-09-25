import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import { EJSON } from 'bson';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'Pawsitive-Home';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');

const DROP_FIRST =
  String(process.env.DROP_FIRST || 'true').toLowerCase() === 'true';

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    const files = fs
      .readdirSync(DATA_DIR)
      .filter((f) => f.toLowerCase().endsWith('.json'));

    if (files.length === 0) {
      throw new Error(`No JSON files found in ${DATA_DIR}`);
    }

    for (const file of files) {
      const colName = path.basename(file, '.json');
      const fullPath = path.join(DATA_DIR, file);
      const raw = fs.readFileSync(fullPath, 'utf8');

      const docs = EJSON.parse(raw, { relaxed: false });
      if (!Array.isArray(docs)) {
        throw new Error(
          `${file} is not a JSON array. Re-export with --jsonArray.`
        );
      }

      const col = db.collection(colName);

      if (DROP_FIRST) {
        await col.deleteMany({});
        console.log(`[${colName}] cleared`);
      }

      if (docs.length > 0) {
        const result = await col.insertMany(docs, { ordered: false });
        console.log(`[${colName}] inserted ${result.insertedCount} documents`);
      } else {
        console.log(`[${colName}] no documents to insert`);
      }
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();
