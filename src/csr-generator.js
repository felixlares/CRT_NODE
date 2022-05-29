module.exports = {
  generateCSR: (privateKey, publicKey) => {

    const forge = require("node-forge");
    const pki = forge.pki;


    const prKey = pki.privateKeyFromPem(privateKey);
    const pubKey = pki.publicKeyFromPem(publicKey);

    // generate a key pair
    // const keys = forge.pki.rsa.generateKeyPair(1024);

    // create a certification request (CSR)
    const csr = forge.pki.createCertificationRequest();
    csr.publicKey = pubKey;
    csr.setSubject([
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
        name: "serialNumber",
        value: '1555512',
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
      // {
      //   name: "guid",
      //   value: "YOUR CC OR NIT",
      // }
      // Identificación Suscriptor:
      // Identificación Organización:
      // https://github.com/digitalbazaar/forge
      // http://www.novell.com/documentation/novellaccessmanager/adminguide/data/certificates.html#b59qkzp
      // 
    ]);
    // set (optional) attributes 
    // csr.setAttributes([
      
    //   {
    //     name: "challengePassword",
    //     value: "password",
    //   },
    //   {
    //     name: "unstructuredName",
    //     value: "Santander Software",
    //   },
    //   {
    //     name: "extensionRequest",
    //     extensions: [
    //       {
    //         name: "subjectAltName",
    //         altNames: [
    //           {
    //             // 2 is DNS type
    //             type: 2,
    //             value: "ivan.ns.cloudflare.com",
    //           },
    //           {
    //             type: 2,
    //             value: "sneh.ns.cloudflare.com",
    //           },
    //           {
    //             type: 2,
    //             value: "santandersoftware.com",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ]);

    // sign certification request
    csr.sign(prKey);

    // verify certification request
    const verified = csr.verify();

    // convert certification request to PEM-format
    const pem = forge.pki.certificationRequestToPem(csr);

    // convert a Forge certification request from PEM-format
    // const csr = forge.pki.certificationRequestFromPem(pem);

    // get an attribute
    // csr.getAttribute({ name: "challengePassword" });

    // get extensions array
    // csr.getAttribute({ name: "extensionRequest" }).extensions;
    
    return pem;
  },
};