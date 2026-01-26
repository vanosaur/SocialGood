import { MongoClient } from 'mongodb';
import { crops } from './seed_data';
import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.DATABASE_URL || "mongodb://localhost:27017/crop_recommendation";

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('CropInfo');

        for (const crop of crops) {
            // Check if exists
            const exists = await collection.findOne({ name: crop.name });
            if (!exists) {
                await collection.insertOne(crop);
                console.log(`Inserted ${crop.name}`);
            } else {
                console.log(`Skipped ${crop.name} (already exists)`);
            }
        }
        console.log('Seeding complete');

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();
