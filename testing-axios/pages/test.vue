<template>
  <div class="CountViewComponent">
    カウント={{ count }} <button @click="reset">リセット</button>
    <button @click="getFolderInfo">ゲットだぜ</button>
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
      folderUrl:
        "https://www.mindmeister.com/services/rest/oauth2?method=mm.maps.getList"
    };
  },
  methods: {
    // カウントをリセットします
    reset() {
      this.count = 0;
    },

    async fetchXml() {
      const config = {
        /*
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
        */
      };
      return axios.get(this.folderUrl, {
        responseType: "document", //'document'はブラウザ環境以外ではtextと同じ
        headers: {
          Authorization:
            "Bearer " +
            "ad9a02febfcff1bc433b8dc4128b384e68598185578f0bc2a36955cc5f8f4c4c"
        }
      });
    },

    getFolderInfo() {
      this.fetchXml()
        .then(response => console.log(JSON.stringify(response.data, null, 2)))
        .catch(e => console.error(e));
    }
  }
};
</script>
