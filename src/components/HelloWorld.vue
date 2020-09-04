<template>
  <div class="hello">
    <h1>{{ te }}</h1>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props) {
    const te = ref("ss");
    const menus = reactive([
      {
        path: "/helloWorld",
        name: "世界，你好",
        children: [
          {
            path: "/helloWorld/home",
            name: "首页"
          },
          {
            path: "/helloWorld/about",
            name: "关于"
          }
        ]
      },
      {
        path: "/test",
        name: "测试",
        children: [
          {
            path: "/test",
            path: "/test1",
            name: "测试",
            meta: {
              breadcrumbs: ["测试"]
            }
          }
        ]
      },
      {
        path: "/table",
        name: "table",
        children: [
          {
            path: "/table/chartTable",
            name: "图表",
            meta: {
              breadcrumbs: ["table", "chartTable"]
            }
          },
          {
            path: "/table/userTable",
            name: "人员列表",
            meta: {
              breadcrumbs: ["table", "userTable"]
            }
          }
        ]
      }
    ]);

    const searchTitle = (arr, path) => {
      var findPath = function(i, n) {
        if (i && i.length > 0) {
          for (let v of i) {
            if (v.path === n) {
              return v;
            } else {
              if (v.children && v.children.length > 0) {
                let re = findPath(v.children, n);
                if (re) {
                  return v;
                }
              }
            }
          }
        }
      };
      return findPath(arr, path).children.filter(item => item.path === path);
    };

    const btnClick = () => {
      let c = searchTitle(menus, "/table/userTable");
      console.log(c);
    };
    return {
      te,
      btnClick
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  background-color: red;
  & button {
    width: 300px;
  }
}
</style>
