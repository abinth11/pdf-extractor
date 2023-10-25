import { Server } from "http";
import ENVIRONMENT_VARIABLES from "../../config";

const serverConfig = (server:Server) => {
    const startServer = () => { 
        server.listen(ENVIRONMENT_VARIABLES.PORT, () => {
            console.log(`Server listening on Port ${ENVIRONMENT_VARIABLES.PORT}`.bgBlue.bold);
        })
    }
    return {
        startServer
    }
}

export default serverConfig