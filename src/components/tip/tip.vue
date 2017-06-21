<template>
    <transition name="fade">
        <div v-if="visible"
             :style="tipStyles"
             v-clickoutside:click="close"
             class="vue-tip">
            <div class="vue-tip-content"
                 ref="content">
                 <iframe :src="src" frameborder="no" border="0" marginwidth="0" marginheight="0" ></iframe>
                 </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        src:{
            type:String,
            default:'about:blank;'
        },
        x: [Number, String],
        y: [Number, String]
    },
    data() {
        return {
            isOpening: false,
            visible: false
        }
    },
    computed: {
        tipStyles() {
            return {
                left: this.x + 'px',
                top: this.y + 'px'
            }
        }
    },
    methods: {
        open() {
            this.visible = true;
            this.isOpening = true;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
            })
        },
        close() {
            if(this.isOpening){
                this.isOpening = false;
                return;
            }
            this.visible = false;
            this.resolve();
        }
    }
}
</script>
<style lang="sass">
    .vue-tip{
        position: absolute;
        background: white;
        border-radius: 8px;
        margin-top: -10px;
        margin-left: 10px;
        padding: 10px;
        z-index: 10;
        &:before{
            content:'';
            position: absolute;
            left: -5px;
            top: 10px;
            width: 0;
            height: 0;
            border:20px solid transparent;
            border-width: 5px 5px 5px 0;
            border-right-color: white;
        }
        .vue-tip-content{
            width: 400px;
            height: 300px;
            iframe{
                width: 100%;
                height: 100%;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>