<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username} (${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini" @click="contact(user.phone,user.email)">联系我</van-button>
    </template>
  </van-card>
<!--  弹出联系方式-->
<!--  &lt;!&ndash; 中划线命名 &ndash;&gt;-->
<!--  <van-dialog v-model:show="show" title="标题" show-cancel-button>-->
<!--    <img src="https://unpkg.com/@vant/assets/apple-3.jpeg" />-->
<!--  </van-dialog>-->
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>


<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

import myAxios from "../plugins/AxiosConfig.js";
import qs from 'qs'
import { Dialog } from 'vant';


const route = useRoute();
const {tags} = route.query;

const userList = ref([]);


onMounted(async () => {
  // 为给定 ID 的 user 创建请求
  const userListData = await myAxios.get('/user/search/tags', {
    withCredentials: false,
    params: {
      tagNameList: tags
    },
    // paramsSerializer: params =>{
    //   return qs.stringify(params,{indices: false})
    // }
    //序列化
    paramsSerializer: {
      serialize: params => qs.stringify(params, {indices: false}),
    }
  })
      .then(function (response) {
        // console.log('/user/search/tags succeed', response);
        // Toast.success('请求成功');
        return response.data?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error', error);
        // Toast.fail('请求失败');
      });
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    console.log("userList:" + userList)
  }
})
//获取联系方式
function contact(phone,email){
  alert("phone:"+phone+"\n"+"email:"+email)
  // const VanDialog = Dialog.Component;
  // Dialog.alert({
  //   message: '生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。',
  // }).then(() => {
  //   // on close
  // });

}

</script>
<style scoped>

</style>