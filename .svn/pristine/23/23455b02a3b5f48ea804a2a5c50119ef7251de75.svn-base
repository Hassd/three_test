<template>
    <div class="search">
        <input
            type="text"
            v-model="text"
            :placeholder="placeholder"
            @keydown.enter="search"
        />
        <i class="iconfont wt-sousuo" @click="search"></i>
    </div>
</template>
<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: "请输入标题查询"
        }
    },
    data() {
        return {
            text: ""
        };
    },
    components: {},
    methods: {
        search() {
            this.$emit("change", this.text);
        }
    }
};
</script>
<style lang="less">
.search {
    background-color: rgba(62, 149, 201, 0.8);
    height: 40px;
    width: 318px;
    border-radius: 5px;
    border: 1px solid #eee;
    display: flex;
    justify-content: flex-start;
    input {
        width: 100px;
        line-height: 40px;
        height: 40px;
        font-size: 16px;
        margin-left: 20px;
        flex: 1;
        color: #fff;
    }
    i {
        display: block;
        width: 40px;
        color: #fff;
        line-height: 40px;
        height: 40px;
        font-size: 22px;
        cursor: pointer;
        text-align: center;
    }
}
</style>
