<template>
    <div class="uploadPicture">
        <label :for="'picture'+index">
            <slot></slot>
        </label>
        <input
            type="file"
            class="picture"
            name="file"
            @change="uploadPicture"
            :id="'picture'+index"
        />
    </div>
</template>
<script>
import { upload } from "@/api/upload";

export default {
    props: {
        index: {
            type: [String, Number],
            default: 0
        },
        path: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "picture"
        }
    },
    data() {
        return {
            text: ""
        };
    },
    components: {},
    methods: {
        async uploadPicture(e) {
            let file = e.target.files[0];
            let data = await upload(
                file,
                this.path == "" ? "user" : this.path,
                this.type
            );
            // this.log("data = " + JSON.stringify(data));
            if (data.code == 1) {
                this.$emit("change", data, this.index);
            }
        }
    }
};
</script>
<style lang="less">
.picture {
    position: fixed;
    top: -1000px;
    left: -1000px;
}
</style>