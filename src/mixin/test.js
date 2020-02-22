export default {
    data() {
        return {
            name: 'mixin',
            liuxiuhui: '你是傻逼吧'
        }
    },
    created() {
        // console.log('mixin...', this.name);
    },
    mounted() {

    },
    methods: {
        qwe() {
            console.log(this.liuxiuhui);
        }
    }
}