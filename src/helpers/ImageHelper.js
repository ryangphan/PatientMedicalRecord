export const prepareBlob = async (imageUri) => {
  const blob = await new Promise((resolve, reject) => {
    //new request
    const xml = new XMLHttpRequest();

    //success resolved it
    xml.onload = function () {
      resolve(xml.response);
    };

    //error threw new error
    xml.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Image Upload failed'));
    };

    //set the response type to get the blob
    xml.responseType = 'blob';
    xml.open('GET', imageUri, true);
    //send the request
    xml.send();
  });

  return blob;
};
