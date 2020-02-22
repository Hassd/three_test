<template>
    <div class="editor" v-loading="loading">
        <input
            type="file"
            name="ql-file"
            id="editorFile"
            class="editorFile"
            ref="ql-file"
            @change="upload"
        />
        <quill-editor
            ref="myTextEditor"
            v-model="text"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
            class="quill-editor"
        ></quill-editor>
    </div>
</template>

<script>
import { upload } from "@/api/upload";
import { quillEditor } from "vue-quill-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { setTimeout } from "timers";
import { Signer } from "crypto";

const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"] // remove formatting button
];

export default {
    props: {
        content: {
            type: [String, Number],
            default: ""
        }
    },
    name: "ThreeTest",
    data() {
        return {
            text: "",
            editorOption: {
                placeholder: "",
                theme: "snow", // or 'bubble'
                modules: {
                    toolbar: {
                        container: toolbarOptions, // 工具栏
                        handlers: {
                            image: function(value) {
                                if (value) {
                                    // 触发input框选择图片文件
                                    document
                                        .getElementById("editorFile")
                                        .click();
                                } else {
                                    this.quill.format("image", false);
                                }
                            }
                        }
                    }
                }
            },
            loading: false
        };
    },
    components: {
        quillEditor
    },
    mounted() {
        this.text = this.content;
    },
    watch: {
        content() {
            this.$refs.myTextEditor.quill.enable(false);
            this.text = this.content;
            //富文本编辑器神坑处理
            this.$nextTick(() => {
                this.$refs.myTextEditor.quill.enable(true);
                this.$refs.myTextEditor.quill.blur();
            });
        }
    },
    methods: {
        async upload(e) {
            // 显示loading动画
            this.loading = true;
            let file = e.target.files[0];
            let data = await upload(file, "goodsDetails");
            if (data.code == 1) {
                let quill = this.$refs.myTextEditor.quill;
                // loading动画消失
                this.loading = false;
                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片
                quill.insertEmbed(length, "image", data.url);
                // 调整光标到最后
                quill.setSelection(length + 1);
            } else {
                // 富文本图片上传失败
                // loading动画消失
                this.loading = false;
                this.alert1({
                    tiem: 1500,
                    text: "提示",
                    content: "图片添加失败"
                });
            }
        },
        onEditorBlur(data) {
            this.$emit("change", data.container.innerHTML);
            this.$emit("blur");
            // console.log(data);
        },
        onEditorFocus(data) {
            this.$emit("focus");
            // this.$emit('change',data.container.innerHTML);
        },
        onEditorReady(data) {
            // this.$emit('change',data.container.innerHTML);
        },
        onEditorChange({ editor, html, text }) {
            // this.$emit("change", html);
        }
    }
};
</script>
<style lang="less">
.editor {
    min-height: 200px;
    color: #fff;
    .editorFile {
        position: fixed;
        top: -1000px;
        left: -1000px;
    }
    .ql-container {
        min-height: 200px;
    }
}
.ql-picker-label {
    color: #fff !important;
}
.ql-fill {
    fill: #fff !important;
}

text,
polygon,
ellipse,
circle,
polyline,
rect,
line,
path {
    stroke: #fff !important;
}
</style>
