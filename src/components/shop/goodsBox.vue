<template>
    <div>
        <!-- <div  class="goodsBox2 pt11 pl12 pb15 pr10">
            <div class="goods_title start">
                <div class="order_num">{{goodsData.goods_code}}</div>
                <div class="order_details ml10">现货</div>
            </div>
            <div class="goods_box start mt17">
                <img
                    @click="openPage('/goodsDetails',{goods_id:goodsData.goods_id?goodsData.goods_id:goodsData.id,second_kill_id:goodsData.second_kill_price?goodsData.id:'',group_buying_id:goodsData.group_buying_price?goodsData.id:'',shop_id:goodsData.shop_id})"
                    :src="goodsData.img"
                    alt
                />
                <div class="goods_p ml11">
                    <div class="goods_name">{{goodsData.goods_name}}</div>
                    <div class="attr mt18">
                        ￥
                        <span>{{goodsData.price}}</span>
                    </div>
                </div>
                <div class="goods_btn ml60">
                    <button @click="clickBtn('purchase')">购买</button>
                    <div class="between mt22">
                        <i class="iconfont wt-gouwuche2 ml4" title="购物车" @click="clickBtn('cart')"></i>
                        <i
                            class="iconfont"
                            title="收藏"
                            :class="goodsData.is_collect==1?'wt-shoucang':'wt-shoucang2'"
                            @click="collection"
                        ></i>
                        <i class="iconfont wt-dianji mr4" title="货比三家" @click="compare"></i>
                    </div>
                </div>
            </div>
        </div>-->
        <div class="goodsBox2 goodsBox2_type2 pt11 pl12 pb15 pr10">
            <div class="goods_box mt10">
                <div class="goods_logo" @click="openPage('/shop',{shop_id:goodsData.shop_id})">
                    <img src="../../assets/images/tops_icon.png" title="拓普思（广州）信息科技有限公司" />
                </div>
                <img @click="openPage('/goodsDetails')" src="../../assets/images/shop/flower.jpg" />
                <div class="goods_p mt10">
                    <div class="goods_name nowrap">云南满天星干花大束勿忘我家居摆设小清新装饰鲜花真花干花束摆件</div>
                    <!-- <div
                        class="goods_type center mt22"
                        v-if="goodsData.group_buying_price||goodsData.second_kill_price"
                    >
                        <div class="activity">
                            {{goodsData.group_buying_price?'团购:':''}}
                            {{goodsData.second_kill_price?'秒杀:':''}}
                            <span>{{goodsData.group_buying_price||goodsData.second_kill_price}}</span>
                        </div>
                        <div class="Original ml10">
                            原价:
                            <span>{{goodsData.price}}</span>
                        </div>
                    </div>-->
                    <div
                        class="attr mt22"
                        v-if="!(goodsData.group_buying_price||goodsData.second_kill_price)"
                    >
                        ￥
                        <span>12</span>
                    </div>
                </div>
                <div class="goods_btn">
                    <button @click="clickBtn('purchase')">购买</button>
                    <div class="between mt22">
                        <i class="iconfont wt-gouwuche2 ml4" title="购物车" @click="clickBtn('cart')"></i>
                        <i
                            class="iconfont"
                            title="收藏"
                            :class="goodsData.is_collect==1?'wt-shoucang':'wt-shoucang2'"
                            @click="collection"
                        ></i>
                        <i class="iconfont wt-dianji mr4" title="货比三家" @click="compare"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
// import { userCollect } from "@/api/shop";

import Liu from "@/assets/js/myMethod";
const liu = new Liu();

export default {
    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        goodsData: {
            type: Object,
            default() {
                return {};
            }
        },
        index: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {
            quantity: 1
        };
    },
    mounted() {},
    computed: {
        ...mapState({ userData: state => state.userData }),
        goodsCompareNum: {
            get() {
                return this.$store.state.goodsCompareNum;
            },
            set(val) {
                this.$store.state.goodsCompareNum = val;
            }
        }
    },
    methods: {
        clickBtn(type) {
            this.$emit("clickBtn", type, this.index);
        },
        async collection() {
            let obj = {
                account: this.userData.account,
                type: 1,
                content: this.goodsData.goods_id
                    ? this.goodsData.goods_id
                    : this.goodsData.id
            };
            let { code, data, msg } = await userCollect(obj);
            this.alert1({
                tiem: 1500,
                text: "提示",
                content: msg
            });
            if (code == 1) {
                this.$emit("clickBtn", "collect", this.index);
            }
        },
        compare() {
            let data = [];
            if (liu.getStoring("goodsCompare")) {
                data = liu.getStoring("goodsCompare");
            }
            let num = 0;
            data.forEach((data, index) => {
                if (data.id == this.goodsData.id) {
                    num++;
                }
            });
            if (num == 0) {
                data.push(this.goodsData);
                liu.setStoring("goodsCompare", data);
                this.alert1({
                    tiem: 1500,
                    text: "提示",
                    content: "加入成功"
                });
                this.goodsCompareNum = liu.getStoring("goodsCompare").length;
            } else {
                this.alert1({
                    tiem: 1500,
                    text: "提示",
                    content: "已经在对比列表"
                });
            }
        }
    }
};
</script>
<style lang="less">
.goodsBox2 {
    box-sizing: border-box;
    width: 420px;
    border: 1px solid rgba(240, 240, 240, 1);
    background-color: #fff;
    border-radius: 10px;
    .goods_title {
        .order_num {
            line-height: 14px;
            height: 14px;
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
        }
        .order_details {
            line-height: 14px;
            height: 14px;
            font-size: 12px;
            color: rgba(255, 108, 80, 1);
        }
    }
    .goods_box {
        img {
            width: 80px;
            height: 80px;
            flex-shrink: 0;
        }
        .goods_p {
            width: 100%;
        }
        .goods_name {
            width: 100%;
            height: 34px;
            overflow: hidden;
            line-height: 17px;
            font-size: 13px;
            color: rgba(102, 102, 102, 1);
            font-weight: 700;
        }
        .attr {
            // width: 100%;
            line-height: 14px;
            height: 14px;
            font-size: 13px;
            overflow: hidden;
            color: rgba(50, 51, 51, 1);
            span {
                font-size: 16px;
            }
        }
        .goods_type {
            width: 100%;
            line-height: 14px;
            height: 14px;
            overflow: hidden;
            .activity {
                color: rgba(253, 151, 69, 1);
                font-size: 14px;
                span {
                    font-size: 15px;
                }
            }
            .Original {
                font-size: 12px;
                text-decoration: line-through;
            }
        }
    }
    .goods_btn {
        button {
            width: 98px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background-color: rgba(253, 151, 69, 1);
            color: #fff;
            border: 1px solid rgba(253, 151, 69, 1);
            border-radius: 17px;
            font-size: 13px;
            box-shadow: 0px 4px 8px 0px rgba(255, 90, 90, 0.27);
            span {
                font-size: 14px;
            }
        }
        span {
            font-size: 16px;
        }
        i {
            font-size: 16px;
            cursor: pointer;
        }
        .wt-gouwuche2 {
            color: rgba(253, 151, 69, 1);
        }
        .wt-shoucang {
            color: rgba(253, 151, 69, 1);
        }
        .wt-shoucang2 {
            color: rgba(204, 204, 204, 1);
        }
        .wt-dianji {
            color: rgba(17, 152, 231, 1);
        }
    }
}
.goodsBox2_type2 {
    position: relative;
    width: 248px;
    .goods_box {
        img {
            display: block;
            margin: 0 auto;
            width: 100px;
            height: 100px;
        }
        .goods_p {
            .goods_name {
                width: 224px;
                height: 17px;
                text-align: center;
            }
            .attr {
                width: 224px;
                text-align: center;
            }
        }
    }
    .goods_logo {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid rgba(240, 240, 240, 1);
        img {
            position: absolute;
            display: block;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 25px;
            height: 25px;
        }
    }
    .goods_btn {
        width: 100px;
        margin: 0 auto;
        margin-top: 22px;
    }
}
</style>