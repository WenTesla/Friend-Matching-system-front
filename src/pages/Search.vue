<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入标签"
        @search="onSearchTag"
        @cancel="onCancel"
    />
  </form>

  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    已选择的标签
  </van-divider>

  <div v-if="activeIds.length===0">请选择标签</div>
  <!--  展示标签内容-->
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <!--  搜索按钮-->
  <div style="padding: 12px">
    <van-button icon="search" type="primary" size="large" @click="search">搜索</van-button>
  </div>
</template>

<script setup>

import {ref} from 'vue';
//定义路由
import {useRouter} from "vue-router";

//传参路由
const route = useRouter();

const searchText = ref('');

//搜索TAG标签
const onSearchTag = () => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item =>
        item.text.includes(searchText.value)
    );
    return tempParentTag;
  })
};

//清空搜索栏
const onCancel = () => {
  searchText.value = '';
  tagList = [...originTagList];
}

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
    ],
  },
  {
    text: '语言',
    children: [
      {text: 'java', id: 'java'},
      {text: 'C++', id: 'C++'},
      {text: 'python', id: 'python'},
    ],
  }
]
/**
 * 注意这里，不是SearchText
 */
const search = () => {
  console.log('Search:' + activeIds.value)
  route.push({
    path: '/user/searchPage',
    //踩坑：定义tags属性，不然无法传入参数
    query: {
      tags: activeIds.value
    }

  })
}

let tagList = ref(originTagList);
//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter((item) => {
    return item !== tag;
  })
}
</script>

<style scoped>

</style>