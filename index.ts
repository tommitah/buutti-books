import app from './app';
import { dbPromise } from './services/db';

const PORT = 9000;

const launchRocket = async () => {
	const db = await dbPromise();
	await db.migrate();
	const server = app.listen(PORT, () => console.log(`rocket is launched from port: ${PORT}`));

	process.on('SIGINT' || 'SIGTERM' || 'SIGQUIT', () => {
		console.log('Received interrupting signal --> closing...');
		db.close();
		console.log('Database closed!');
		server.close(() => {
			console.log('Server closed!');
			process.exit(0);
		});
	});
};

launchRocket();
