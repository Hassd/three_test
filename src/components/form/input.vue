<template>
    <div class="wt-input" :style="`width:${this.width}px;height:${this.height}px;`">
        <div :class="`input-icon iconfont ${icon}`"></div>
        <input
            :type="type"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            :placeholder="placeholder"
            :maxlength="maxlength"
            @keydown.enter="enter"
        />
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: "text",
            required: false,
            validator: function(value) {
                if (value === "text" || value === "password") {
                    return value;
                } else {
                    return "text";
                }
            }
        },
        icon: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        width: {
            type: [String, Number],
            default: "340",
            required: false,
            validator: function(value) {
                if (typeof value === "number") {
                    return value;
                }
                if (value.indexOf("px") == -1) {
                    return value;
                } else {
                    return value.substring(0, value.indexOf("px"));
                }
            }
        },
        height: {
            type: [String, Number],
            default: "48",
            required: false,
            validator: function(value) {
                if (typeof value === "number") {
                    return value;
                }
                if (value.indexOf("px") == -1) {
                    return value;
                } else {
                    return value.substring(0, value.indexOf("px"));
                }
            }
        },
        value: {
            type: [String, Number],
            default: ""
        },
        maxlength: {
            type: [Number, String],
            default: "100"
        }
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        enter() {
            this.$emit("enter");
        }
    }
};
</script>
<style lang="less" scope>
.wt-input {
    width: 340px;
    height: 48px;
    font-size: 14px;
    background-color: #026495;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    .input-icon {
        width: 52px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        color: #00d2ff;
        font-size: 24px;
        flex-shrink: 0;
    }
    input {
        flex: 1;
        height: 52px;
        font-size: 12px;
        text-indent: 10px;
        color: #01c2d3;
    }

    textarea,
    input::-webkit-input-placeholder {
        color: #01c2d3;
        font-size: 12px;
    }
    textarea,
    input::-moz-placeholder {
        color: #01c2d3;
        font-size: 12px;
    }
    textarea,
    input:-ms-input-placeholder {
        color: #01c2d3;
        font-size: 12px;
    }
}
</style>