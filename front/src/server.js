// exports.server = 'http://localhost:8080/';



const isDevelopment = process.env.NODE_ENV === "development";
const api = isDevelopment ? "http://localhost:8081" : "";

console.log("API: ", api);
console.log(process.env.NODE_ENV);

exports.server =  api;

