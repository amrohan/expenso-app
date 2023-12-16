const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetPath = "./src/environments/environment.ts";
  require("dotenv").config({
    path: "./.env",
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    backend:{
      ApiUrl: '${process.env.API_URL}'
  }
}
    `;
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

setEnv();
