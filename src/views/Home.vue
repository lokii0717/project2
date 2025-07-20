<template>
  <div>
    <!-- 总一行，20格 -->
    <el-row class="home" :gutter="20">
      <!-- 左边占8格 -->
      <el-col :span="8" style="margin-top: 20px;">
        <!-- 左上第一个卡片-用户信息 -->
        <el-card shadow="hover">
          <!-- 头像 -->
          <div class="user">
            <img :src="getImageUrl('user')" class="user">
            <div class="user-info">
              <p class="user-info-admin">Admin</p>
              <p class="user-info-p">超级管理员</p>
            </div>
          </div>
          <!-- 登录信息区域 -->
          <div class="login-info">
            <p>上次登陆时间：<span>2024-06-30</span></p>
            <p>上次登陆地点：<span>北京</span></p>
          </div>
        </el-card>
        
        <el-table :data="tableData" class="user-table">
          <el-table-column 
            v-for="(val,key) in tableLabel"
            :key="key"
            :prop="key" 
            :label="val"

          >
        </el-table-column>
        </el-table>


      </el-col>
      <!-- 右边16格 -->
       <el-col :span="16" style="margin-top: 20px;">
        <div class="num">
          <el-card
            :body-style="{display:'flex',padding:0}"
            v-for="item in countData"
            :key="item.name"
          >
            <component :is="item.icon" class="icons" :style="{background:item.color}"></component>
            <div class="detail">
              <p class="num">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <el-card>
          <div ref="oneEcharts" style="height: 280px;"></div>
        </el-card>
        <div class="graph">
          <el-card>
            <div ref="TwoEcharts" style="height: 240px;"></div>
          </el-card>
          <el-card>
            <div ref="ThreeEcharts" style="height: 240px;"></div>
          </el-card>
        </div>
       </el-col>

    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref,getCurrentInstance,reactive} from 'vue'
import * as echarts from 'echarts'
const {proxy} =getCurrentInstance()
// 创建一个 ResizeObserver 实例（用于监听 DOM 尺寸变化）
const observer=ref(null)
const getImageUrl=(user)=>{
    return new URL(`../assets/images/${user}.png`,import.meta.url).href
  }
  const tableData = ref([
])

const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})
const countData=ref([])
const chartData=ref([])
//请求左下数据
const getTableData=async()=>{
  const data =await proxy.$api.getTableData()

  tableData.value=data.tableData
}
//请求右上数据
const getCountData=async()=>{
  const data=await proxy.$api.getCountData()
  countData.value=data
}
//请求图表数据并渲染
const getChartData=async()=>{
  const {orderData,userData,videoData}=await proxy.$api.getChartData()
  //1.处理第一个图表(折线图)
  xOptions.xAxis.data=orderData.date
  xOptions.series=Object.keys(orderData.data[0]).map(val=>{
    return{
      name:val, //系列名称（如小米，苹果）
      data:orderData.data.map(item=>item[val]), //系列数据，一个数组（苹果的一组数据）
      type:"line",
    }
    // 在 map 的回调函数中，返回对象字面量时，必须显式用 return { ... }，否则会被解析成普通代码块（而非对象）
  })
  //初始化第一个echarts实例（对应dom中的ref="echart"）
  const oneEcharts=echarts.init(proxy.$refs['oneEcharts'])  
  oneEcharts.setOption(xOptions)//应用配置到图表

  //2.处理第二个图表（柱状图）
  //重新设置x轴为用户日期
  xOptions.xAxis.data=userData.map(item=>item.date)
  xOptions.series=[
    {
      name:'新增用户',
      data:userData.map(item=>item.new),
      type:"bar",//图表类型为柱状图
    },
    {
      name:'活跃用户',
      data:userData.map(item=>item.active),
      type:"bar"
    }
  ]
  //初始化第二个echarts实例（对应dom中的ref="userEchart"）
  const TwoEcharts=echarts.init(proxy.$refs["TwoEcharts"])
  TwoEcharts.setOption(xOptions)

  //3.处理第三个图表（饼图）
  pieOptions.series=[
    {
      data:videoData,//直接使用数据，格式为[{name:'',value: },]
      type:"pie",//饼图
    }
  ]
  //初始化第三个echarts实例（对应dom中ref="videoEchart"）
  const ThreeEcharts=echarts.init(proxy.$refs["ThreeEcharts"])
  ThreeEcharts.setOption(pieOptions)

  //4.创建监听容器尺寸变化
  observer.value=new ResizeObserver(()=>{
    oneEcharts.resize()
    TwoEcharts.resize()
    ThreeEcharts.resize()
  })
  //如果容器存在 开始监听第一个图表的容器尺寸变化
  if(proxy.$refs["oneEcharts"]){
    observer.value.observe(proxy.$refs["oneEcharts"])
  }

}
//这个是折线图和柱状图 两个图表共用的公共配置
// xOptions 是一个响应式对象（通过 reactive 创建），当修改其属性时，Vue 会自动更新依赖的 DOM
const xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {},
      // 图表距离容器左侧的距离，调整这个可以给坐标轴标签等留出空间
      grid: {
        left: "20%",
      },
      // 提示框,鼠标放到图表上显示的提示信息
      tooltip: {
        // 表示以坐标轴为触发条件
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],//横坐标的数据，后续会根据接口返回填充
        axisLine: {
          lineStyle: {
            color: "#17b3a3",// 横坐标轴线的颜色
          },
        },
        axisLabel: {
          // 坐标轴刻度标签的显示间隔，0 表示全部显示
          interval: 0,
          color: "#333",// 刻度标签的颜色
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      // 图表系列数据的颜色数组
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      // 图表的系列数据，比如折线图的每条线、柱状图的每个柱子对应的数据，后续填充
      series: [],
})
// 饼图和折线图的配置差异较大，主要区别在于：
// 饼图不需要 xAxis 和 yAxis（它是圆形布局）
// 饼图的 series 直接表示各个扇形的数据
//饼图的配置，定义基础样式，后续填充series数据来渲染饼图
const pieOptions = reactive({
  // 鼠标放到饼图的每个扇形上时显示提示信息
  tooltip: {
    trigger: "item",
  },
  legend: {},
  // 饼图每个扇形的颜色数组
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  // 饼图的系列数据，后续填充
  series: []
})

onMounted(()=>{
  getTableData()
  getCountData()
  getChartData()
})
</script>

<style scoped lang="less">
.home{
  height: 100%;
  overflow: hidden;
  .user{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info{
      p{
        line-height: 40px;
      }
      .user-info-p{
        color:#999
      }
      .user-info-admin{
        font-size: 35px;
      }
    }
  }
  
  .login-info{
     p{
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span{
        color: #666;
        margin-left: 60px;
      }
     }
  }
  .user-table{
    margin-top: 20px;
    height: 100%;
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-bottom: 20px;
    }
    .icons{
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num{
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt{
        font-size: 15px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
      height: 260px;
    }
  }
}
</style>