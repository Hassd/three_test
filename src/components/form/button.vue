<template>
    <div class="button">
        <button :class="[{btn1:type==1},{btn2:type==2},{btn3:type==3}]" @click="btnClick">
            <i v-if="icon!=''" :class="['iconfont',icon]"></i>
            <span class="ml5">{{text}}</span>
        </button>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        text: {
            type: String,
            default: "按钮字"
        },
        icon: {
            type: String,
            default: ""
        }
    },
    data() {
        return {};
    },
    components: {},
    methods: {
        btnClick() {
            this.$emit("change");
        }
    }
};
</script>
<style lang="less">
.button {
    button {
        min-width: 118px;
        height: 42px;
        line-height: 42px;
        border-radius: 22px;
        text-align: center;
        box-sizing: content-box;
        font-size: 12px;
        display: flex;
        justify-content: center;
        box-shadow: 0px 6px 8px 1px rgba(255, 90, 90, 0.2);
    }
    i {
        display: block;
        font-size: 16px;
        line-height: 42px;
        height: 42px;
    }
    span {
        display: block;
        line-height: 42px;
        height: 42px;
        letter-spacing: 2px;
    }
    .btn1 {
        background-color: rgba(68, 181, 250, 1);
        border: 1px solid rgba(68, 181, 250, 1);
        color: #fff;
    }
    .btn2 {
        background-color: rgba(255, 90, 90, 1);
        border: 1px solid rgba(255, 90, 90, 1);
        color: #fff;
    }
    .btn3 {
        background-color: rgba(219, 241, 254, 1);
        border: 1px solid rgba(219, 241, 254, 1);
        color: rgba(68, 181, 250, 1);
    }
}
</style>