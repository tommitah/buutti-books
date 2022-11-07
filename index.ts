import { createServer } from "http";
import app from "./app"

const server = createServer(app)

const PORT = 9000
server.listen(PORT, () => console.log(`server is running on port: ${PORT}`))
