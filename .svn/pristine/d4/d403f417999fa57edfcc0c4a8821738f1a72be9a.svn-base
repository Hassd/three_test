<template>
    <div class="form_count start">
        <button @click.stop.prevent="reduce">-</button>
        <input type="text" maxlength="4" v-model="quantity" @blur="blur" />
        <button @click.stop.prevent="increase">+</button>
    </div>
</template>
<script>
export default {
    props: {
        maxNum: {
            type: [String, Number],
            default: 9999
        },
        num: {
            type: [String, Number],
            default: 1
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
    watch: {
        num() {
            this.quantity = this.num;
        },
        quantity(n, p) {
            try {
                this.quantity = this.quantity.replace(/[^\d]/g, "");
            } catch (err) {}
        }
    },
    mounted() {
        this.init();
    },
    components: {},
    methods: {
        reduce() {
            if (this.quantity > 1) {
                this.quantity--;
                this.$emit("change", this.quantity, this.index);
            }
        },
        increase() {
            if (this.quantity < 9999 && this.quantity < parseInt(this.maxNum)) {
                this.quantity++;
                this.$emit("change", this.quantity, this.index);
            } else {
                this.alert1({
                    tiem: 1500,
                    text: "",
                    content: "不能大于这个数了"
                });
            }
        },
        blur() {
            if (this.quantity > parseInt(this.maxNum)) {
                this.alert1({
                    tiem: 1500,
                    text: "",
                    content: "没有那么大的数量"
                });
                this.quantity = this.num;
            }
            if (this.quantity == 0 || this.quantity == "") {
                this.quantity = 1;
            }
            this.$emit("change", this.quantity, this.index);
        },
        init() {
            this.quantity = 1; //this.num
        }
    }
};
</script>
<style lang="less">
.form_count {
    width: 80px;
    button {
        height: 17px;
        width: 18px;
        line-height: 17px;
        background-color: rgba(245, 245, 245, 1);
        color: rgba(151, 152, 153, 1);
        margin-top: 2px;
    }
    input {
        width: 44px;
        height: 21px;
        line-height: 21px;
        background: rgba(229, 229, 229, 1);
        font-size: 14px;
        color: rgba(101, 102, 102, 1);
        text-align: center;
    }
}
</style>