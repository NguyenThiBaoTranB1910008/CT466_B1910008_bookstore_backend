const app = require("./app");
const config = require("./app/config");


async function startServer(){
    try{
        const PORT = config.app.port;
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error){
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();