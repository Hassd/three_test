<template>
    <section class="pictureSwiper_layer" v-if="state">
        <div class="mask"></div>
        <div class="pictureSwiper">
            <div
                class="pictureSwiper_close iconfont zIndex800 wt-delete"
                @click="close"
            ></div>
            <swiper class="swiper_div" :options="options" ref="mySwiper">
                <swiper-slide
                    class="swiper-slide flex"
                    v-for="(item, index) in sollData"
                    :key="index"
                >
                    <img :src="item" alt />
                </swiper-slide>
            </swiper>
            <div class="swiper-button-prev"></div>
            <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <div class="swiper-button-next"></div>
            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <div class="swiper-pagination"></div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        sollData: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            options: Object.assign({
                pagination: {
                    el: ".swiper-pagination",
                    bulletElement: "li",
                    clickable: true,
                    bulletActiveClass: "my-bullet-active"
                },
                zoom: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                observer: true, //数据刷新子模块刷新
                observeParents: true, //数据刷新父模块刷新
                observeSlideChildren: true //子slide更新时，swiper是否更新
            }),
            state: false
        };
    },
    mounted() {},
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    methods: {
        show() {
            this.state = true;
        },
        close() {
            this.state = false;
        }
    }
};
</script>
<style lang="less">
.pictureSwiper_layer {
    .mask {
        background-color: #000;
        opacity: 0.8;
        z-index: 150;
    }
}
.pictureSwiper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    z-index: 300;
    .swiper_div {
        height: 100%;
        width: 100%;
    }
    .swiper-slide {
        height: 100%;
        img {
            min-width: 500px;
            max-width: 100%;
            max-height: 100%;
            margin: auto;
        }
    }
    .pictureSwiper_close {
        position: fixed;
        top: 10px;
        right: 10px;
        color: #fff;
        font-size: 38px;
        cursor: pointer;
        z-index: 300;
    }
}
.swiper-pagination {
    width: 100%;
    display: block;
    margin: 0 auto;
    li {
        margin-left: 10px;
    }
}
</style>
