<template>
    <div class="regionChoice start">
        <el-select class="mr10" v-model="provinceLabel" @change="provinceChange" placeholder="省">
            <el-option
                v-for="(item, index) in provinceData"
                :key="index"
                :label="item.label"
                :value="index"
            ></el-option>
        </el-select>
        <el-select class="mr10" v-model="cityLabel" @change="cityChange" placeholder="市">
            <el-option
                v-for="(item, index) in cityData"
                :key="index"
                :label="item.label"
                :value="index"
            ></el-option>
        </el-select>
        <el-select v-model="areaLabel" @change="areaChange" placeholder="区">
            <el-option
                v-for="(item, index) in areaData"
                :key="index"
                :label="item.label"
                :value="index"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
import province from "@/assets/js/province";
import city from "@/assets/js/city";
import area from "@/assets/js/area";

export default {
    props: {
        area: {
            type: [Number, String],
            default: 0
        }
    },
    data() {
        return {
            provinceNum: 0,
            cityNum: 0,
            areaNum: 0,
            provinceData: [],
            cityData: [],
            areaData: [],
            provinceLabel: "",
            cityLabel: "",
            areaLabel: ""
        };
    },
    mounted() {
        this.init();
    },
    watch: {
        area() {
            this.init();
        }
    },
    methods: {
        init() {
            if (this.area != 0 && this.area != null && this.area != undefined) {
                let arr = this.queryRegion(this.area);
                this.provinceNum = arr[0];
                this.cityNum = arr[1];
                this.areaNum = arr[2];

                this.provinceLabel = province[arr[0]].label;
                this.cityLabel = city[arr[0]][arr[1]].label;
                this.areaLabel = area[arr[0]][arr[1]][arr[2]].label;

                this.provinceData = province;
                this.cityData = city[arr[0]];
                this.areaData = area[arr[0]][arr[1]];
            } else {
                this.provinceData = province;
                this.cityData = [];
                this.areaData = [];

                this.provinceNum = 0;
                this.cityNum = 0;
                this.areaNum = 0;

                this.provinceLabel = "";
                this.cityLabel = "";
                this.areaLabel = "";
            }
        },
        provinceChange(item) {
            this.provinceNum = item;
            this.cityNum = 0;
            this.areaNum = 0;
            this.cityData = city[this.provinceNum];
            this.areaData = area[this.provinceNum][this.cityNum];

            this.setLabel();
        },
        cityChange(item) {
            this.cityNum = item;
            this.areaData = area[this.provinceNum][this.cityNum];
            this.areaNum = 0;

            this.setLabel();
        },
        areaChange(item) {
            this.areaNum = item;
            this.setLabel();
        },
        setLabel() {
            this.provinceLabel = province[this.provinceNum].label;
            this.cityLabel = city[this.provinceNum][this.cityNum].label;
            this.areaLabel =
                area[this.provinceNum][this.cityNum][this.areaNum].label;

            this.$emit(
                "change",
                area[this.provinceNum][this.cityNum][this.areaNum]
            );
        },
        queryRegion(data) {
            let arr = [data.substr(0, 2), data.substr(0, 4), data.substr(0, 6)];
            let pnum, cnum, anum;
            for (let i in province) {
                if (province[i].value == arr[0]) {
                    pnum = i;
                    break;
                }
            }
            for (let i in city[pnum]) {
                if (city[pnum][i].value == arr[1]) {
                    cnum = i;
                    break;
                }
            }
            for (let i in area[pnum][cnum]) {
                if (area[pnum][cnum][i].value == arr[2]) {
                    anum = i;
                    break;
                }
            }
            return [pnum, cnum, anum];
        }
    }
};
</script>

<style lang="less">
@import url("./../../assets/less/public.less");
.regionChoice {
    width: 460px;
    .el-input {
        width: 120px;
    }
    .el-input__inner {
        width: 120px;
    }
    .el-select {
        width: 120px;
        input {
            display: block;
            background-color: transparent;
            color: #fff;
            .lh(52px, 13px);
            width: 120px !important;
            text-align: center;
            text-align-last: center;
            border: 1px solid #fff;
            border-radius: 5px;
        }
    }
}
</style>
