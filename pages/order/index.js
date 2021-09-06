// 1 当页面被打开时候 onShow 
//     onShow 不同于onLoad 无法行参上接收 options参数(onShow只要页面显示就重新请求，onLoad只会请求一次)
//   1 获取url上的参数type
//   2 根据type 去发送请求获取订单数据
//     根据type来决定页面标题的数组元素 那个被激活选中
//   3 渲染页面
// 2 点击不同的标题 重新发送请求来获取和渲染数据




Page({
  data:{
    tabs: [
      {
        id:0,
        value:"全部",
        isActive: true
      },
      {
        id:1,
        value:"代付款",
        isActive: false
      },
      {
        id:2,
        value:"代发货",
        isActive: false
      },
      {
        id:3,
        value:"退货",
        isActive: false
      },
    ]
  },
  onShow(options){
    // token 为空不能用

    // const token = wx.getStorageSync("token");
    // if(!token){
    //   wx.navigateTo({
    //     url:'/pages/auth/index'
    //   });
    //   return;
    // }
    // 1 获取当前小程序的页面栈-数组 长度最长为10页面
    let pages = getCurrentPages();
    // 2 数组中 索引最大的就是当前页面 
    let currentPage=pages[pages.length-1];
    console.log(currentPage.options);
    // 3 获取url上的type参数
    // const {type}=currentPage.options;
    // 调用方法
    // this.changeTitleByIndex(type-1);
    // this.getOrders(type);
  },
  // 获取订单列表的方法
  async getOrders(type){
    const res=await request({url:"/my/orders/all",header,data:{type}});
    this.setData({
      orders:res.orders
      // 遍历时间 改成正确格式的时间
      // orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  // 封装后 根据标题索引激活选中
  // changeTitleByIndex(index){
  //   let {tabs}=this.data;
  //   tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
  //   this.setData({
  //     tabs
  //   })
  // },
  // handleTabsItemChange(e){
  //   const {index}=e.detail;
  //   this.changeTitleByIndex(index);
  // }

  // 封装前
  handleTabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index} =e.detail;
    // 2 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  }
})