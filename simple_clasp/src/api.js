import axios from "axios";

    
var apiUrl = "https://www.mindmeister.com/api/v2/maps/1804019690.docx?votes=false&tasks=false"
var dataUrl = "";
axios
  .get(apiUrl, {
    responseType: "arraybuffer",
    headers: {
      Authorization:
        "Bearer " +
        "ad9a02febfcff1bc433b8dc4128b384e68598185578f0bc2a36955cc5f8f4c4c"
    }
  })
  .then(response => {
    const prefix = `data:${response.headers["content-type"]};base64,`;
    const base64 = new Buffer(response.data, "binary").toString("base64");
    dataUrl =  prefix + base64;
  });


