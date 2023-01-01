<template>

  <van-cell title="ID" :value="user.id"/>
  <van-cell title="名称" :value="user.username"/>
  <van-cell title="昵称" is-link :value="user.userAccount" @click="editUser('userAccount','昵称',user.userAccount)"/>
  <van-cell title="头像" is-link @click="editUser('avatarUrl','头像',user.avatarUrl)">
    <img :src="user.avatarUrl" alt="修改">
  </van-cell>
  <van-cell title="性别" is-link :value="user.gender" @click="show = true"/>
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect"/>

  <van-cell title="手机号" is-link :value="user.phone" @click="editUser('phone','手机号',user.phone)"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="editUser('email','邮箱',user.email)"/>
  <van-cell title="单元格" :value="user.createTime()"/>
</template>

<script lang="ts" setup>
//定义路由
import {useRouter} from "vue-router";

import {ref} from 'vue';
import {Toast} from 'vant';


const show = ref(false);
const actions = [
  {name: '男'},
  {name: '女'},
];
const onSelect = (item: any) => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  show.value = false;
  // Toast(item.name);
  console.log(item)
};
// return {
//   show,
//   actions,
//   onSelect,
// };


//传参路由
const route = useRouter();
//注意string
const editUser = (editKey: string, editName: string, currentValue: string) => {
  route.push({
    //url
    path: '/user/edit',
    //参数
    params: {
      a: 1
    },
    //
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
};

// 定义用户数据
const user = {
  id: '001',
  username: 'bowen',
  userAccount: 'wenTesla',
  avatarUrl: 'https://avatars.githubusercontent.com/u/88094223?s=40&v=4',
  gender: '男',
  phone: '15586397775',
  email: 'WenTesla@163.com',
  userStatus: 1,
  userRole: 1,
  planetCode: '',
  tags: '',
  createTime: Date,
}


</script>

<style scoped>

</style>