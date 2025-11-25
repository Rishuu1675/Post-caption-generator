const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
});

async function uploadFile(file, filename) {
  const response = await imagekit.upload({
    file: file,
    fileName: filename,
    folder: "first_app",
  });

  return response;
}

module.exports = uploadFile;
