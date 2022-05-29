// console.log("inicio");
const fs = require("fs");
// Certificate Signing Request handler
const createCSR = (privateKey, publicKey) => {
  // Initiating certificate signing request
  const csrGenerator = require("./src/csr-generator");
  const CSR = csrGenerator.generateCSR(privateKey, publicKey);

  console.log(CSR);

  // verifying csr by certification authority and getting a CA certificate certificate-verifier
  const certificatesVerifier = require("./src/certificate-verifier");
  const cert = certificatesVerifier.verifiyCSR(CSR);

  // Writting CA certificate to a file, so we can use it a bit latter
  fs.writeFileSync("./src/ssl/is-cert.pem", cert, { encoding: "utf-8" });
};

const rsaHandler = require('./src/rsa-handler.js');
 const {
    privateKey,
    publicKey,
  } = rsaHandler.generatePublicPrivatePairOfKeys();

createCSR(privateKey, publicKey);