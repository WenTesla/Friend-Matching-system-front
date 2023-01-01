<template>
<!--  顶部栏-->
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="搜索"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
<!--中部内容-->
  <div id="content">
    <router-view/>
  </div>
<!--底部栏-->
  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="friends-o">队伍</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-o">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import {Toast} from 'vant';
import {useRouter} from 'vue-router'

const router=useRouter();
// 回到上一页面
const onClickLeft = () => (
    router.back()
);
const onClickRight = () => (
    router.push('/search')
);


// const active = ref("index");
const onChange = (index) => Toast(`标签 ${index}`);

</script>