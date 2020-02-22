<template>
    <div class="swiper relative">
        <swiper class="swiper_div" :options="options" ref="mySwiper">
            <swiper-slide class="swiper-slide" v-for="(item, index) in sollData" :key="index">
                <slot :name="'swiper'+index"></slot>
            </swiper-slide>
        </swiper>
        <div class="swiper-button-prev" v-if="navigation"></div>
        <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <div class="swiper-button-next" v-if="navigation"></div>
        <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <div class="swiper-pagination" v-if="pagination"></div>
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
        option: {
            type: Object,
            default() {
                return {};
            }
        },
        navigation: {
            type: Boolean,
            default: false
        },
        pagination: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            options: Object.assign(
                {
                    loop: false,
                    autoplay: {
                        delay: 3000, //1秒切换一次
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        bulletElement: "li",
                        clickable: true,
                        bulletActiveClass: "my-bullet-active"
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    observer: true, //数据刷新子模块刷新
                    observeParents: true, //数据刷新父模块刷新
                    observeSlideChildren: true //子slide更新时，swiper是否更新
                },
                this.option
            )
        };
    },
    mounted() {},
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    methods: {}
};
</script>
<style lang="less">
.swiper-pagination {
    width: 100%;
    display: block;
    margin: 0 auto;
    li {
        margin-left: 10px;
    }
}
.swiper-pagination-bullet {
    opacity: 1;
    background-color: rgba(230, 230, 230, 1);
}
.my-bullet-active {
    background-color: rgba(204, 204, 204, 1);
    transform: scale(1.3);
}
</style>