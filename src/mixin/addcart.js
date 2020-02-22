
import { userCartOperate } from "@/api/shop";
import { mapState } from "vuex";
export default {
    data() {
        return {

        }
    },
    created() {
        // console.log('mixin...', this.name);
    },
    computed: mapState(["user"]),
    mounted() {

    },
    methods: {
        async addCart(data) {
            console.log(data);
            let goods_id =
                this.isDataNull(data.second_kill_price)
                    ? data.goods_id
                    : data.id;
            let obj = {
                operate: "add",
                account: this.user.account,
                goods_id: goods_id,
                shop_id: data.shop_id,
                nums: data.nums,
                attribute_item_value_id: data.attribute_item_value_id,
                id: 0
            };
            let { code, msg } = await userCartOperate(obj);
            if (code == 1) {
                this.alert1({
                    tiem: 1500,
                    text: "提示",
                    content: msg
                });
            }
        }
    }
}