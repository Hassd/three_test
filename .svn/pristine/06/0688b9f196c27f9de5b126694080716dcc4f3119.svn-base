<template>
    <div class="scroll_shell start">
        <div class="swiper-prev">
            <i
                v-if="navigation&&sollData.length>3"
                class="swiper_i iconfont wt-shuangxianyoujiantou"
            ></i>
        </div>
        <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <swiper class="levelScroll flex1" :options="option" ref="swiperTop">
            <swiper-slide class="levelSoll" v-for="(item, index) in sollData" :key="index">
                <slot :name="'soll'+index"></slot>
            </swiper-slide>
        </swiper>
        <div class="swiper-next">
            <i
                v-if="navigation&&sollData.length>3"
                class="swiper_i iconfont wt-shuangxianzuojiantou"
            ></i>
        </div>
        <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
</template>
<script>
export default {
    props: {
        sollData: {
            type: Array,
            default() {
                return [];
            }
        },
        navigation: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            option: {
                slideToClickedSlide: true, //设置为true则点击slide会过渡到这个slide
                slidesPerView: "auto", //一个框下有多少个slide
                // spaceBetween: 10, //每个slide相隔多少
                observer: true, //数据刷新子模块刷新
                observeParents: true, //数据刷新父模块刷新
                observeSlideChildren: true, //子slide更新时，swiper是否更新
                navigation: {
                    nextEl: ".swiper-next",
                    prevEl: ".swiper-prev"
                }
            }
        };
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="less">
.scroll_shell {
    position: relative;
    width: 100%;
    height: 100%;
    .swiper-prev,
    .swiper-next {
        position: relative;
        height: 100%;
        width: 40px;
        color: #fff;
    }
    .swiper_i {
        display: block;
        position: absolute;
        text-align: center;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        font-size: 28px;
    }
}
.levelScroll {
    .levelSoll {
        width: auto;
        height: auto;
    }
}
</style>