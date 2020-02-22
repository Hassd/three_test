<template>
    <div class="paging1 start">
        <button :disabled="num==1" @click="previous">上一页</button>
        <button v-if="total>3&&num>2" @click="num=1">1</button>
        <span v-if="total>3&&num>3">···</span>
        <ul class="start">
            <li
                v-for="(item, index) in pageData"
                :key="index"
                @click="choiceNum(item)"
                :class="[{pagingselect:item==num}]"
            >{{item}}</li>
        </ul>
        <span v-if="total>3&&num< total-2 ">···</span>
        <button v-if="total>3&&num < total-1" @click="num=total">{{total}}</button>
        <button :disabled="num==total" @click="Next">下一页</button>
    </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            default: 10
        },
        pagNum: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            num: 1,
            pageData: [1, 2, 3]
        };
    },
    watch: {
        num(val, i) {
            this.init();
            if (val != i) {
                this.$emit("change", this.num);
            }
        },
        total() {
            this.num = this.pagNum;
            this.init();
        },
        pagNum() {
            this.num = this.pagNum;
            this.init();
        }
    },
    mounted() {
        this.num = this.pagNum;
        this.init();
    },
    methods: {
        previous() {
            if (this.num > 1) {
                this.num--;
            }
        },
        Next() {
            if (this.num < this.total) {
                this.num++;
            }
        },
        choiceNum(index) {
            this.num = index;
        },
        init() {
            this.pageData = [];
            if (this.total <= 3) {
                for (let i = 0; i < this.total; i++) {
                    this.pageData.push(i + 1);
                }
            } else {
                if (this.num <= 2) {
                    for (let i = 0; i < 3; i++) {
                        this.pageData.push(i + 1);
                    }
                } else if (this.num > 2 && this.num <= this.total - 2) {
                    for (let i = 0; i < 3; i++) {
                        this.pageData.push(i + this.num - 1);
                    }
                } else if (
                    this.num > this.total - 2 &&
                    this.num <= this.total
                ) {
                    for (let i = 0; i < 3; i++) {
                        this.pageData.push(this.total - 2 + i);
                    }
                }
            }
        }
    }
};
</script>

<style lang="less">
@import url("./../../assets/less/public.less");
.paging1 {
    span,
    button,
    li {
        display: block;
        .lh(30px, 13px);
        color: rgba(1, 187, 225, 1);
        padding: 0 8px;
        margin:8px 0 0 10px;
        box-sizing: content-box;
    }
    button,
    li {
        border: 1px solid rgba(1, 187, 225, 1);
        cursor: pointer;
    }
    span {
        font-size: 20px;
        letter-spacing: 1px;
    }
    .pagingselect {
        background: -webkit-linear-gradient(
            top,
            rgba(1, 168, 214, 1) 0%,
            rgba(0, 114, 181, 1) 50%,
            rgba(1, 168, 214, 1) 100%
        );
        color: #fff;
    }
}
</style>
