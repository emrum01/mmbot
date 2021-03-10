<template>
  <div class="CountViewComponent">
    <img :src="dataUrl" />
    カウント={{ count }} <button @click="reset">リセット</button>
    {{ info }}
  </div>
</template>

<script>
import axios from "axios";
import xml2js from "xml2js";

export default {
  props: {
    // 表示するカウント値
    count: { type: Number, default: 3 }
  },
  data() {
    return {
      apiUrl: "https://www.mindmeister.com/api/v2/maps/1804019690.png",
      folderUrl:
        "https://www.mindmeister.com/services/rest/oauth2?method=mm.maps.getList",
      authUrl: "https://www.mindmeister.com/oauth2/token",
      dataUrl: "",
      info: {}
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
      })
      .catch(e => console.error(e));

    axios
      .get(this.folderUrl, {
        headers: {
          Authorization:
            "Bearer " +
            "ad9a02febfcff1bc433b8dc4128b384e68598185578f0bc2a36955cc5f8f4c4c"
        }
        // transformResponse: [
        //   data => {
        //     let jsonData;
        //     const parser = new xml2js.Parser({
        //       async: false,
        //       explicitArray: false
        //     });
        //     parser.parseString(data, (error, json) => {
        //       jsonData = json;
        //     });
        //     return jsonData;
        //   }
        // ]
      })
      .then(response => {
        // let self = this;
        // console.log(JSON.stringify(response, null, 2));
        // self.info = JSON.stringify(response, null, 2);
        console.log(response.data);
        this.info = response.data;
      })
      .catch(e => console.error(e));
  },
  methods: {
    // カウントをリセットします
    reset() {
      this.count = 0;
    }
    /*
    async fetchXml() {
      const config = {

        transformResponse: [
          data => {
            let jsonData;
            const parser = new xml2js.Parser({
              async: false,
              explicitArray: false
            });
            parser.parseString(data, (error, json) => {
              jsonData = json;
            });
            return jsonData;
          }
        ]

      };
      return
      });
    },
    */
  }
};
</script>
