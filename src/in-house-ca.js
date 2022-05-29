// Este generador se ejecuta antes de index solo si no existen los CA.
const attrs = [
  {
    name: "commonName",
    value: "SANTANDER SOFTWARE",
  },
  {
    name: "countryName",
    value: "CO",
  },
  {
    shortName: "ST",
    value: "SANTANDER",
  },
  {
    name: "localityName",
    value: "BUCARAMANGA",
  },
  {
    name: "organizationName",
    value: "SANTANDER SOFTWARE",
  },
  {
    shortName: "OU",
    value: "FACTURA ELECTRONICA",
  },
  {
    name: "givenName",
    value: "FELIX",
  },
  {
    name: "surname",
    value: "LARES",
  },
  {
    name: "streetAddress",
    value: "YOUR ADDRESS",
  },
]

// Creating built-in CA store
// (() => {

// Libs
const fs = require("fs");
const rsaHandler = require("./rsa-handler");


const Keys = rsaHandler.generatePublicPrivatePairOfKeys();
const RootCAPrivateKey = Keys.privateKey;
const RootCAPublicKey = Keys.publicKey;

// Es necesario codigo para verificar si existe la carpeta /keys/root-ca si no existe crearla.

// Writing to files
fs.writeFileSync("C:/Users/felix/Desktop/crs_node/src/keys/root-ca/private-key.pem", RootCAPrivateKey, {
  encoding: "utf-8",
});
fs.writeFileSync("C:/Users/felix/Desktop/crs_node/src/keys/root-ca/public-key.pem", RootCAPublicKey, {
  encoding: "utf-8",
});

// Generate CA certificate
const certificatesGenerator = require("./certificate-generator");

const CA = certificatesGenerator.generateCertificate(
  RootCAPrivateKey,
  RootCAPublicKey,
  attrs
);

// Es necesario codigo para verificar si existe la carpeta /ssl/ca si no existe crearla.
// Writing to file
fs.writeFileSync("C:/Users/felix/Desktop/crs_node/src/ssl/ca/is-ca.pem", CA, {
  encoding: "utf-8",
});
// })();