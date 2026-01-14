import 'dotenv/config';
import { Client } from 'pg';
export const db = new Client({
    connectionString: process.env.PGURI,
    ssl: {
        rejectUnauthorized: false,
    },
});
db.connect();
//# sourceMappingURL=database.js.map