import Http from './httpClass'

let _http = new Http();

//登录接口
export const shopOrders = (data) => {
    return _http.post('shop-orders.html', data)
}

//修改金额
export const shopOrderAmount = (data) => {
    return _http.post('shop-orderAmount.html', data)
}

//物流渠道信息
export const shopLogistics = (data) => {
    return _http.post('shop-logistics.html', data)
}

//删除商品属性
export const shopDelGoodsAttribute = (data) => {
    return _http.post('shop-delGoodsAttribute.html', data)
}

//店铺商品
export const shopGoods = (data) => {
    return _http.post('shop-goods.html', data)
}
//店铺商品搜索列表
export const userGoodsList = (data) => {
    return _http.post('user-goodsList.html', data)
}

//发货
export const shopSendGoods = (data) => {
    return _http.post('shop-sendGoods.html', data)
}

//优惠券管理
export const shopCoupon = (data) => {
    return _http.post('shop-coupon.html', data)
}

//团购商品
export const shopShopGroupBuying = (data) => {
    return _http.post('shop-shopGroupBuying.html', data)
}

//秒杀商品
export const shopSecondKill = (data) => {
    return _http.post('shop-secondKill.html', data)
}

//评论列表
export const shopCommentList = (data) => {
    return _http.post('shop-commentList.html', data)
}

//评论审核
export const shopComment = (data) => {
    return _http.post('shop-comment.html', data)
}

//店铺商品分类
export const shopClassify = (data) => {
    return _http.post('shop-classify.html', data)
}

//品牌
export const shopBrand = (data) => {
    return _http.post('shop-brand.html', data)
}

//商品标签
export const shopLabel = (data) => {
    return _http.post('shop-label.html', data)
}

//店铺商品属性
export const shopAttribute = (data) => {
    return _http.post('shop-attribute.html', data)
}

//店铺商品属性值
export const shopAttributeItem = (data) => {
    return _http.post('shop-attributeItem.html', data)
}

//店铺首页
export const shopIndex = (data) => {
    return _http.post('shop-index.html', data)
}

//行业/分类信息
export const shopConfigClassify = (data) => {
    return _http.post('shop-configClassify.html', data)
}
//店铺首页
export const shopShop = (data) => {
    return _http.post('shop-shop.html', data)
}
//搜索模块数据
export const shopSearch = (data) => {
    return _http.post('shop-search.html', data)
}
//关联商品
export const shopGoodsRelation = (data) => {
    return _http.post('shop-goodsRelation.html', data)
}
//商品属性关联商品
export const shopGoodsRelationList = (data) => {
    return _http.post('shop-goodsRelationList.html', data)
}
// 商品数据统计
export const shopStatGoods = (data) => {
    return _http.post('shop-statGoods', data)
}
// 订单数据统计
export const shopStatOrder = (data) => {
    return _http.post('shop-statOrder', data)
}

// 退款
export const shopRefund = (data) => {
    return _http.post('shop-refund.html', data)
}

// 供求信息
export const shopSupply = (data) => {
    return _http.post('shop-supply.html', data)
}

// 供求分类信息
export const shopSupplyClassify = (data) => {
    return _http.post('shop-supplyClassify.html', data)
}
// 供求分类信息
export const shopVerifyInvoice = (data) => {
    return _http.post('shop-verifyInvoice.html', data)
}




// 采购数据打印
export const shopExcelStatPurchase = (data) => {
    return _http.post('shop-excelStatPurchase.html', data)
}
// 销售数据打印
export const shopExcelStatSale = (data) => {
    return _http.post('shop-excelStatSale.html', data)
}




//用户地址
export const userAddress = (data) => {
    return _http.post('user-address.html', data)
}
//用户订单
export const userOrders = (data) => {
    return _http.post('user-orders.html', data)
}
//用户订单详情
export const userOrderDetail = (data) => {
    return _http.post('user-orderDetail.html', data)
}
//用户确认收货
export const userConfirmOrder = (data) => {
    return _http.post('user-confirmOrder.html', data)
}
//商品详情
export const userGoods = (data) => {
    return _http.post('user-goods.html', data)
}
//用户商品评价
export const userComment = (data) => {
    return _http.post('user-comment.html', data)
}
//用户商品评价
export const userDetailedList = (data) => {
    return _http.post('user-detailedList.html', data)
}
//订单合同
export const userContract = (data) => {
    return _http.post('user-contract.html', data)
}
//再来一单
export const userGetOneOrder = (data) => {
    return _http.post('user-getOneOrder.html', data)
}
//取消订单
export const userDelOrder = (data) => {
    return _http.post('user-delOrder.html', data)
}

//用户优惠券
export const userCoupon = (data) => {
    return _http.post('user-coupon.html', data)
}
//用户收藏关注列表
export const userCollectList = (data) => {
    return _http.post('user-collectList.html', data)
}
//用户收藏关注
export const userCollect = (data) => {
    return _http.post('user-collect.html', data)
}
//用户消息列表
export const userSysNotice = (data) => {
    return _http.post('user-sysNotice.html', data)
}
//购物车操作
export const userCartOperate = (data) => {
    return _http.post('user-cartOperate.html', data)
}
//购物车列表
export const userCartList = (data) => {
    return _http.post('user-cartList.html', data)
}
//购物车提交订单
export const userCommitOrder = (data) => {
    return _http.post('user-commitOrder.html', data)
}
//购物车提交全部订单
export const userConfirmOrderAll = (data) => {
    return _http.post('user-confirmOrderAll.html', data)
}
//购买页面地址信息
export const userAddressDefault = (data) => {
    return _http.post('user-addressDefault.html', data)
}
//立即购买
export const userBuyNow = (data) => {
    return _http.post('user-buyNow.html', data)
}
//支付接口
export const userPay = (data) => {
    return _http.post('user-pay.html', data)
}
//用户详细信息
export const userUserDetail = (data) => {
    return _http.post('user-userDetail.html', data)
}
//用户详细信息修改
export const userUserInfoSet = (data) => {
    return _http.post('user-userInfoSet.html', data)
}
//订单地址修改
export const userAddressOrder = (data) => {
    return _http.post('user-addressOrder.html', data)
}
//订单地址修改
export const userInvoice = (data) => {
    return _http.post('user-invoice.html', data)
}

//订单地址修改
export const userCreditList = (data) => {
    return _http.post('user-creditList.html', data)
}


// 申请退款
export const refund = (data) => {
    return _http.post('user-refund.html', data)
}
// 取消退款
export const refundDel = (data) => {
    return _http.post('user-refundDel.html', data)
}
// 退款订单详情
export const refundDetail = (data) => {
    return _http.post('user-refundDetail.html', data)
}
// 退款协商操作历史
export const refundLog = (data) => {
    return _http.post('user-refundLog.html', data)
}
// 退款上传单号 
export const refundTrackingNo = (data) => {
    return _http.post('user-refundTrackingNo.html', data)
}

// 资讯/供求
export const userNew = (data) => {
    return _http.post('user-new.html', data)
}
// 资讯/供求
export const userSupply = (data) => {
    return _http.post('user-supply.html', data)
}
// 资讯/供求
export const userSupplyClassify = (data) => {
    return _http.post('user-supplyClassify.html', data)
}

//团购商品列表
export const goodsGroupGoodsList = (data) => {
    return _http.post('goods-groupGoodsList.html', data)
}
//团购商品详情
export const goodsGroupGoodsDetail = (data) => {
    return _http.post('goods-groupGoodsDetail.html', data)
}
//团购订单详情
export const goodsOrderGroupDetail = (data) => {
    return _http.post('user-orderGroupDetail.html', data)
}

//秒杀商品列表
export const goodsSecondKillGoodsList = (data) => {
    shop - verifyInvoice
    return _http.post('goods-secondKillGoodsList.html', data)
}
//秒杀商品详情
export const goodsSecondKillDetail = (data) => {
    return _http.post('goods-secondKillDetail.html', data)
}
//秒杀时间列表
export const goodsSecondKill = (data) => {
    return _http.post('goods-secondKill.html', data)
}


//练习
export const commonTest = (data) => {
    return _http.post('common-test', data)
}
//首页
export const commonIndex = (data) => {
    return _http.post('common-index.html', data)
}