<template>
  <img :src="dataUrl" />
  <form
    action="https://www.mindmeister.com/external/show"
    target="new"
    method="POST"
    enctype="multipart/form-data"
  >
    MindMeister File: <input type="file" name="file[content]" /> Id:
    <input type="text" name="file[id]" value="-1" /> Name:
    <input type="text" name="file[name]" value="some map" />
    API Key:
    <input
      type="text"
      name="api_key"
      value="009bad31c404b966490e591540d528e8"
    />
    Allow export: <input type="checkbox" name="file[allow_export]" />
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "ImageFromApi"
  /*
  data: function() {
    return {
      apiUrl:
        "https://www.mindmeister.com/api/v2/maps/1804019690.docx?votes=false&tasks=false",
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
      });
  }
  */
};
</script>
