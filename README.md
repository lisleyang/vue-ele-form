# vue-ele-form | 一行代码搞定整个表单

## 说明

vue-ele-form 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装, 实现了表单生成、表单校检、表单布局、响应式表单, 并内置了上传图片, 上传视频, 富文本等 20 多款实用组件, 这一切的一切只需要一行 html 和 数据即可实现, 即保证了质量, 又使得开发速度仿佛坐上 🚀!

> 为了帮助你更好的理解, 如果 star 超过 100, 详细的视频源码讲解

## 目录

- [图片演示](#图片演示)
- [DEMO](#demo)
- [安装](#安装)
- [使用](#使用)
- [Props](#props)
  - [参数总览](#参数总览)
  - [响应式相关参数](#响应式相关参数)
  - [formDesc](#formdesc)
    - [type 类型列表](#type-类型列表)
    - [options](#options)
      - [对象数组](#对象数组)
      - [字符串数组](#字符串数组)
      - [Promise 对象](#promise-对象)
      - [函数](#函数)
  - [请求方式](#请求方式)
    - [外部请求](#外部请求)
    - [外部请求](#外部请求)
- [插槽](#插槽)
  - [默认插槽](#默认插槽)
  - [作用域插槽](#作用域插槽)
- [自定义组件(以 custom-url 组件为例)](#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E4%BB%A5-custom-url-%E7%BB%84%E4%BB%B6%E4%B8%BA%E4%BE%8B)
  - [第 1 步: 新建组件,并引入 mixin](#%E7%AC%AC-1-%E6%AD%A5-%E6%96%B0%E5%BB%BA%E7%BB%84%E4%BB%B6-%E5%B9%B6%E5%BC%95%E5%85%A5-mixin)
  - [第 2 步: 完善 html](#%E7%AC%AC-2-%E6%AD%A5-%E5%AE%8C%E5%96%84-html)
  - [第 3 步: 注册并使用](#%E7%AC%AC-3-%E6%AD%A5-%E6%B3%A8%E5%86%8C%E5%B9%B6%E4%BD%BF%E7%94%A8)

## 图片演示

<!-- [![演示图](./public/example.gif)](https://codepen.io/dream2023/pen/xoXKBq) -->

## DEMO

[https://codepen.io/dream2023/pen/xoXKBq](https://codepen.io/dream2023/pen/xoXKBq)

## 安装

```bash
npm install vue-ele-form --save
```

## 使用

```js
import EleForm from 'vue-ele-form'

Vue.use(EleForm)

// 在引入 EleForm 时，可以传入一个全局配置对象(可选), 例如:
Vue.use(EleForm, {
  // 上传相关(上传图片, 上传视频, 文件上传, 富文本中图片上传)
  upload: {
    action: 'https://www.xxx.com/posts' // 请求地址,
    data: { token: 'xxx' }, // 附带的参数,
    responseFn (response) { // 处理响应结果
      return 'https://www.xxx.com/upload/' + response.id
    }
  },
  // 每个组件单独的全局配置
  // 所有的input都会有 clearable: true 的属性
  input: {
    clearable: true
  },
  // 所有的上传图片都会有 limit: 3 的属性
  image: {
    limit: 3
  },
  // ...
})
```

## Props

### 参数总览

```js
props: {
  // 表单描述 (下面详细讲)
  formDesc: {
    type: Object,
    required: true
  },
  // 表单数据, 一个对象即可
  formData: {
    type: Object,
    required: true
  },
  // 校检规则, 同原 form 组件, 具体参考:
  // https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
  rules: Object,
  // 提交状态
  isLoading: {
    type: Boolean,
    default: false
  },
  // 服务器返回的错误信息
  formError: Object,
  // 提交函数 (下面详细讲)
  requestFn: Function,
  // 是否显示submit按钮
  isShowSubmitBtn: {
    type: Boolean,
    default: true
  },
  // 是否显示back按钮
  isShowBackBtn: {
    type: Boolean,
    default: true
  },
  // 提交按钮文本
  submitBtnText: {
    type: String,
    default: '提交'
  },
  // 返回按钮
  backBtnText: {
    type: String,
    default: '返回'
  },
  // 标签位置, 不填则响应式, 填则固定
  labelPosition: String,
  // 参考原 layout 组件, 不填则响应式, 填则固定
  // https://element.eleme.cn/#/zh-CN/component/layout
  span: Number
}
```

### 响应式相关参数

> width 指表单的包裹元素宽度

- 在指定 labelPosition 和 span 的情况下:
  按照指定的值进行渲染

- 在不指定 labelPosition 和 span 情况下:
  - <code>width < 768px</code> 时, labelPosition = 'top', span = 24
  - <code>768px ≤ width < 992px</code> 时, labelPosition = 'right', span = 18
  - <code>992px ≤ width < 1200px</code> 时, labelPosition = 'right', span = 16
  - <code>1200px ≤ width < 1920px</code> 时, labelPosition = 'right', span = 14
  - <code>1920px ≤ width </code> 时, labelPosition = 'right', span = 12

### formDesc

```js
formDesc: {
  field: {
    type: String, // 类型, 具体类型参考下面
    label: String, // `form-item` 的 `label` 属性值
    attrs: Object, // 所渲染组件的属性, `v-bind` 的 API 相同
    layout: Number, // 1-24, 默认是24, 占满一整行, 具体参考 https://element.eleme.cn/#/zh-CN/component/layout
    displayFormatter: Function, // 对显示的值做处理
    valueFormatter: Function, // 对请求的值做处理
    tip: String, // 表单项的提示
    options: Array | Function | Promise, // checkbox, select等组件的 options 部分, 具体细节参考下面
    slots: Object, // 插槽, 使用渲染函数 https://cn.vuejs.org/v2/guide/render-function.html
    'class': Mix, // 与 `v-bind:class` 的 API 相同，接受一个字符串、对象或字符串和对象组成的数组
    style: Object | Array // 与 `v-bind:style` 的 API 相同，接受一个字符串、对象，或对象组成的数组
    on: Object, // 事件监听器在 `on` 属性内
  },
  field2: {
    // ...
  },
  // ...
}
```

```js
// 示例
formDesc: {
  id: {
    type: 'hide', // hide类型, 表示不显示
  },
  avatar: {
    type: 'image', // 类型为 上传图片
    label: '头像', // 表单label为 头像
    default: 'https://www.xx.com/images/default-avatar.png', // 指定默认头像
    attrs: { // 指定属性
      limit: 5 // 设置上传图片大小不超过 5 Mb
    },
    tip: '图片大小最好为 200×200' // 提示
  },
  name: {
    type: 'input',
    label: '姓名',
    layout: 12, // name 和 region 共占一行,
    displayFormatter (value) { // 将显示的值转为 '我的名字是'  + value
      return '我的名字是'  + value
    },
    on: { // 时间监听
      change (value) {
        console.log(value)
      }
    }
  },
  birthday:{
    type: 'date',
    label: '出生日期',
    slots: { // 插槽
      prefix (h) {
        return h('i', {
          class: 'input__icon el-icon-date'
        })
      }
    }
  },
  region: {
    type: 'select',
    label: '地区',
    layout: 12,
    options: ['北京', '上海', '广州', '深圳'] // 普通数组
  },
  age: {
    type: 'number',
    label: '年龄',
    attrs: {
      min: 1 // 最小 1 岁
    },
    valueFormatter (value) { // 对请求的值进一步处理
      return value + 1 // 将发送的数据转为 value + 1
    },
    style: { // 指定样式
      maxWidth: '400px'
    }
  },
  best_friends: {
    type: 'checkbox',
    label: '最好的朋友',
    options: async function () {
      const response = await axios.get('http://jsonplaceholder.typicode.com/users')
      const data = response.data
      return data.map((item) => {
        return { text: item.username, value: item.id }
      })
    }
  },
  // ....
}
```

#### type 类型列表

| 类型      | 含义           | 属性参考                                                                                 |
| --------- | -------------- | ---------------------------------------------------------------------------------------- |
| hide      | 隐藏表单项     |                                                                                          |
| text      | 静态文本       |                                                                                          |
| input     | 输入框         | [element-ui input](https://element.eleme.cn/#/zh-CN/component/input)                     |
| number    | 数字           | [element-ui number](https://element.eleme.cn/#/zh-CN/component/input-number)             |
| checkbox  | 复选           | [element-ui checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox)               |
| radio     | 单选           | [element-ui radio](https://element.eleme.cn/#/zh-CN/component/radio)                     |
| date      | 日期           | [element-ui date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)         |
| time      | 时间           | [element-ui time-picker](https://element.eleme.cn/#/zh-CN/component/time-picker)         |
| datetime  | 日期时间       | [element-ui datetime-picker](https://element.eleme.cn/#/zh-CN/component/datetime-picker) |
| switch    | 开关           | [element-ui switch](https://element.eleme.cn/#/zh-CN/component/switch)                   |
| json      | JSON 对象/数组 | [v-jsoneditor](https://github.com/yansenlei/VJsoneditor)                                 |
| slider    | 滑块           | [element-ui slider](https://element.eleme.cn/#/zh-CN/component/slider)                   |
| password  | 密码           | [element-ui input](https://element.eleme.cn/#/zh-CN/component/input#mi-ma-kuang)         |
| color     | 颜色选择器     | [element-ui color-picker](https://element.eleme.cn/#/zh-CN/component/color-picker)       |
| select    | 选择器         | [element-ui select](https://element.eleme.cn/#/zh-CN/component/select)                   |
| cascader  | 级联选择器     | [element-ui cascader](https://element.eleme.cn/#/zh-CN/component/cascader)               |
| transfer  | 穿梭框         | [element-ui transfer](https://element.eleme.cn/#/zh-CN/component/transfer)               |
| image     | 上传图片       | [vue-ele-upload-image](https://github.com/dream2023/vue-ele-upload-image)                |
| video     | 上传视频       | [vue-ele-upload-video](https://github.com/dream2023/vue-ele-upload-video)                |
| file      | 上传文件       | [element-ui upload](https://element.eleme.cn/#/zh-CN/component/upload)                   |
| rate      | 评分组件       | [element-ui rate](https://element.eleme.cn/#/zh-CN/component/rate)                       |
| tags      | 标签           | [element-ui tags]()                                                                      |
| rich-text | 富文本         | [vue2-editor](https://github.com/davidroyer/vue2-editor)                                 |
| gallery   | 图片/视频展示  | [vue-ele-gallery](https://github.com/dream2023/vue-ele-gallery)                          |
| button    | 按钮           | [element-ui button](https://element.eleme.cn/#/zh-CN/component/button)                   |

#### options

##### 对象数组

```js
formDesc: {
  sex: {
    // 显示到屏幕上, 分别为男 和 女, 但发送数据分别为 0 和 1
    options: [{ text: '男', value: 0 }, { text: '女', value: 1 }]
  }
}
```

##### 字符串数组

```js
formDesc: {
  sex: {
    // 显示到屏幕上, 分别为男 和 女, 但发送数据分别为 男 和 女
    options: ['男', '女']
  }
}
```

##### Promise 对象

```js
formDesc: {
  city: {
    // 从服务器获取数据
    options: getCity('/api/city') // 返回的是Promise
  }
}
```

##### 函数

```js
formDesc: {
  city: {
    // 函数, 函数的返回值可以是以上三种类型: 字符串数组, 对象数组, Promise对象
    options: function () {
      return [{ text: '北京', value: 'beijing' }, {text: '深圳', value: 'shenzhen'}]
    }
  }
}
```

### 请求方式

#### 外部请求

当发起请求时, 会抛出 `$emit('request', data)`, 需要传递 `isLoading` 参数

```html
<!-- 伪代码 -->
<ele-table
  :isLoading="isLoading"
  :formError="formError"
  @request="handleRequest"
></ele-table>
<script>
  // 伪代码
  export default {
    data() {
      return {
        // 请求状态
        isLoading: false,
        // 表单错误消息
        formError: {}
      }
    },
    methods: {
      // 发起请求, 被注入 data
      async handleRequest(data) {
        if (this.isLoading) return // 判断状态
        try {
          this.isLoading = true // 更改状态
          const response = await axios.post(
            'https://jsonplaceholder.typicode.com/posts',
            data
          ) // 发送请求

          // 成功处理
          this.$message.success('添加成功')
          // this.$router.back() // 跳转回上一页
        } catch (error) {
          // 处理错误
          // 为了表单同步显示后端返回的错误, 需要将错误信息传递给表单
          this.$message.error('表单填写出错了')
          this.formError = { username: '用户名不存在', password: '密码错误' }
        } finally {
          this.isLoading = false
        }
      }
    }
  }
</script>
```

#### 内部请求

当发起请求时, 需要传递 `request-fn` 参数, 请求结束后, 会根据状态抛出: `$emit('request-success', data)` / `$emit('request-error', error)` / `$emit('request-finish')`

```html
<!-- 伪代码 -->
<ele-table
  :request-fn="handleRequest"
  @request-success="handleRequestSuccess"
></ele-table>
<script>
  // 伪代码
  export default {
    methods: {
      handleRequest(data) {
        // 1.必须返回一个Promise对象
        // 2.当出现异常的时候, 返回的错误信息, 必须是以字段为key, 错误原因为 message的对象或者错误:
        // { name: '用户名不存在', password: '密码不正确' } 或者 new Error(JSON.stringify({ name: '用户名不存在', password: '密码不正确' }))
        return new Promise(async (resolve, reject) => {
          try {
            await axios.post('https://jsonplaceholder.typicode.com/posts', data)
            resolve()
          } catch (error) {
            reject(
              new Error(
                JSON.stringify({ name: '用户名不存在', password: '密码不正确' })
              )
            )
          }
        })
      },
      handleRequestSuccess() {
        this.$message.success('添加成功')
        // this.$router.back()
      }
    }
  }
</script>
```

## 插槽

### 默认插槽

```html
<el-form :formDesc="formDesc" :formData="formData">
  <!-- 默认插槽, 将会作为表单的第1项 -->
  <!-- 此时表单有两个表单项 -->
  <el-form-item label="头像">
    <el-input v-model="formData.avatar"></el-input>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        formData: {},
        formDesc: {
          name: {
            type: 'input',
            label: '姓名'
          }
        }
      }
    }
  }
</script>
```

### 作用域插槽

```html
<el-form :formDesc="formDesc" :formData="formData">
  <!-- 作用域插槽会覆盖相应的表单项 -->
  <template v-slot:avatar>
    <el-input v-model="formData.avatar"></el-input>
  </template>
</el-form>
<script>
  export default {
    data() {
      return {
        formData: {},
        formDesc: {
          avatar: {
            type: 'image',
            label: '头像'
          },
          name: {
            type: 'input',
            label: '姓名'
          }
        }
      }
    }
  }
</script>
```

## 自定义组件(以 custom-url 组件为例)

### 第 1 步: 新建组件, 并引入 mixin

```html
<template> </template>

<script>
  import formMixin from 'vue-ele-form/mixins/formMixin'
  export default {
    name: 'custom-url', // name 属性必须填写, 在使用时, 需要和这里定义的 name 一致
    mixins: [formMixin] // 其实 mixin 做事很简单, 可以参考下面图片
  }
</script>
```

![image](<https://raw.githubusercontent.com/dream2023/images/master/carbon%20(1).1f9sbeq2f2p.png>)

### 第 2 步: 完善 html

```html
<template>
  <!-- 这里就需要注意了! -->
  <!-- 1.v-model 绑定的是 newValue -->
  <!-- 2.需要将改变值, 通过 handleChange 传递出去 -->
  <!-- 3.class 是绑定的类 -->
  <!-- 4.attrs 是绑定的属性 -->
  <!-- 5.style 是绑定的样式 -->
  <!-- 6.on 是绑定的事件 -->
  <el-input
    placeholder="请输入URL"
    v-model="newValue"
    @input="handleChange"
    :class="desc.class"
    :style="desc.style"
    v-bind="desc.attrs"
    v-model="newValue"
    v-on="desc.on"
  >
    <template slot="prepend"
      >Http://</template
    >
    <template slot="append"
      >.com</template
    >
  </el-input>
</template>
```

### 第 3 步: 注册并使用

```js
// 必须注册到全局
import CustomUrl from 'path/to/CustomUrl'
Vue.component(CustomUrl.name, CustomUrl)
```

```js
// 使用
export default: {
  formDesc: {
    blog: {
      type: 'custom-url',
      label: '博客地址'
    }
  }
}
```