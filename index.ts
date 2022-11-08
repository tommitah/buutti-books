import { createServer } from 'http';
import app from './app';
import { dbPromise } from './services/db';

const server = createServer(app);

const PORT = 9000;

const launchRocket = async () => {
	const db = await dbPromise;
	await db.migrate();
	server.listen(PORT, () => console.log(`rocket is launched from port: ${PORT}`));
};

launchRocket();
