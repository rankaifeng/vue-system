<template>
  <div @click="loginAjax">
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
import { userLogin } from "../api/allApis";
import dd from "dingtalk-jsapi";

export default {
  name: "login",

  setup() {
    /**
     * 登录
     */
    const loginAjax = () => {
      userLogin().then(res => {
        console.log(res);
      });
      // dd.ready(() => {
      //   dd.runtime.permission.requestAuthCode({
      //     corpId: "ding9e70d1106e493f9f35c2f4657eb6378f",
      //     onSuccess: result => {
      //       console.log(result);
      //       const credentials = { authcode: result.code };
      //       userLogin(credentials).then(res => {
      //         localStorage.setItem("token", res.data.auth_token);
      //       });
      //     },
      //     onFail: error => {
      //       message.error(JSON.stringify(error));
      //     }
      //   });
      // });
    };

    return {
      loginAjax
    };
  }
};
</script>

<style></style>
