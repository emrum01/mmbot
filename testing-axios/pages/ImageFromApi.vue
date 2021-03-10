<template>
  <div>
    なぜ表示されないのか...
    <img :src="dataUrl" />
    {{ dataUrl }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ImageFromApi",

  data: function() {
    return {
      apiUrl: "https://www.mindmeister.com/api/v2/maps/1804019690.png",
      folderUrl22:
        "https://www.mindmeister.com/services/rest/oath2?api_key=009bad31c404b966490e591540d528e8&auth_token=WPWCg1QVXJEBRIQcJHg7&folder_id=1681651&method=mm.folders.contents&response_format=xml&api_sig=2ccc05e9642320d7fe946b414384229b",
      dataUrl: ""
    };
  },
  mounted() {
    axios
      .get(this.apiUrl, {
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
        this.dataUrl = prefix + base64;
        console.log(this.dataUrl);
      })
      .catch(e => console.error(e));
  }
};
</script>
