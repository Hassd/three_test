<template>
    <div class="index" :style="`width:${width};height:${height}`">
        <div class="pie" :id="id" :style="`width:${width};height:${height}`" :option="option"></div>
    </div>
</template>
<script>
import HighCharts from "highcharts";
export default {
    props: {
        width: {
            type: String,
            default: "500px"
        },
        height: {
            type: String,
            default: "300px"
        },
        id: {
            type: String,
            default: "id"
        },
        option: {
            type: Object,
            default() {
                return {
                    chart: {
                        type: "pie", //饼图
                        options3d: {
                            enabled: true, //使用3d功能
                            alpha: 60, //延y轴向内的倾斜角度
                            beta: 0
                        }
                    },
                    title: {
                        text: "测试用" //图表的标题文字
                    },
                    subtitle: {
                        text: "" //副标题文字
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true, //每个扇块能否选中
                            cursor: "pointer", //鼠标指针
                            depth: 35, //饼图的厚度
                            dataLabels: {
                                enabled: true //是否显示饼图的线形tip
                            }
                        }
                    },
                    series: [
                        {
                            type: "pie",
                            name: "测试用1", //统一的前置词,非必须
                            data: [
                                ["测试1", 12], //模块名和所占比，也可以{name: '测试1',y: 12}
                                ["测试2", 23],
                                ["测试3", 19],
                                ["测试4", 29],
                                ["测试5", 5]
                            ]
                        }
                    ]
                };
            }
        }
    },
    data() {
        return {};
    },
    mounted() {
        HighCharts.chart(this.id, this.option);
    },
    components: {},
    methods: {}
};
</script>
<style lang="less" scoped>
.index {
    width: 200px;
    height: 200px;
}
</style>