<template>
    <div>
        <div class="alert1" v-show="visible">{{content}}</div>
    </div>
</template>

<script>
import { setTimeout, clearTimeout } from "timers";
export default {
    data() {
        return {
            visible: true,
            content: "",
            stt: null,
            tiem: 0
        };
    },
    mounted() {},
    methods: {
        close() {
            clearTimeout(this.stt);
            this.visible = false;
        },
        show() {
            this.visible = true;
            clearTimeout(this.stt);
            // console.log(this.tiem && typeof this.tiem == "number");
            if (this.tiem && typeof this.tiem == "number") {
                this.stt = setTimeout(() => {
                    this.visible = false;
                }, this.tiem);
            }
        }
    }
};
</script>

<style lang="less">
.alert1 {
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translate(0, -50%);
    z-index: 1000;
    font-size: 14px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 8px;
}
</style>

