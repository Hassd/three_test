<template>
    <div class="user_tab pt15 pb15 start">
        <div 
            :class="['ml40','pl20','pr20',{select:index==num}]"
            v-for="(item, index) in tabData" 
            :key="index"
            @click="choice(index)"
            >
        {{item}}</div>
    </div>
</template>

<script>
export default {
    props:{
        tabData:{
            type:Array,
            default(){
                return ['要选择的tab']
            }
        },
        tabNum:{
            type:Number,
            default:0
        }
    },
    mounted(){
        this.tabNum>this.tabData.length-1?this.num=this.tabData.length-1:this.num=this.tabNum
    },
    watch:{
        tabNum(){
           this.tabNum>this.tabData.length-1?this.num=this.tabData.length-1:this.num=this.tabNum
        }
    },
    data(){
        return{
            num:0
        }
    },
    methods:{
        choice(index){
            this.num=index;
            this.$emit('change',index);
        }
    }
}
</script>

<style lang="less">
@import url("./../../assets/less/public.less");
.user_tab{
    width: 100%;
    
    position: relative;
    &::after{
        content: '';
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 1px;
        background: -webkit-linear-gradient(
        left,
        rgba(4, 143, 193, 0) 0%,
        rgba(4, 143, 193, 1) 10%,
        rgba(4, 143, 193, 1) 90%,
        rgba(4, 143, 193, 0) 100%
        );
        color: #fff;
    }
    & > div{
        .lh(40px,15px);
        color: rgba(32, 221, 255, 1);
        cursor: pointer;
        &:hover{
            background: -webkit-linear-gradient(
            left,
            rgba(4, 143, 193, 0) 0%,
            rgba(4, 143, 193, 1) 30%,
            rgba(4, 143, 193, 1) 70%,
            rgba(4, 143, 193, 0) 100%
            );
            color: #fff;
        }
    }
    .select{
        
        background: -webkit-linear-gradient(
        left,
        rgba(4, 143, 193, 0) 0%,
        rgba(4, 143, 193, 1) 30%,
        rgba(4, 143, 193, 1) 70%,
        rgba(4, 143, 193, 0) 100%
        );
        color: #fff;
    }   
}



</style>
