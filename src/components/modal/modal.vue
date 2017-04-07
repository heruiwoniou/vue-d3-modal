<template>
<div class="vue-modal">
    <div class="vue-modal-title">
    </div>
    <div class="vue-modal-content" :style="styleObject" ref="content">
    </div>
    <div class="vue-modal-background"></div>
</div>
</template>
<script>
import mixins from './mixins.js';
export default {
    mixins: [mixins],

    data() {
        return {
            distance: 10,
            offsetLeft: 0,
            offsetTop: 0,
            baseWidth: 50,
            baseHeight: 50,
            screenWidth: 0,
            screenHeight: 0
        }
    },

    props: {
        title: String,
        width: Number,
        height: Number,
        titleHeight: {
            type: Number,
            default: 30
        },
        background: {
            default: 'black',
            type: String
        }
    },

    computed: {
        styleObject() {
            return {
                height: this.height - this.titleHeight + 'px',
                width: this.width + 'px',
                marginLeft: -1 * this.width / 2 + 'px',
                marginTop: -1 * this.height / 2 + this.titleHeight + 'px'
            }
        },
        runtimeWidth() {
            return this.width;
        },
        runtimeHeight() {
            return this.height;
        }
    },
    watch: {
        visible() {
            if (this.visible) {
                this.svgAnimateStart();
            } else this.svgAnimateEnd();
        }
    },
    methods: {
        gPath(width, height, normal, outer) {
            var wd = width / 3;
            var hd = height / 3;
            var d = normal ? 0 : ((outer ? -1 : 1) * this.distance);
            var dd = -1 * d;
            return `M${ ( this.screenWidth - width ) / 2 } ${ ( this.screenHeight - height ) / 2 }` +
                `c${ wd },${ d } ${ wd * 2 },${ d } ${ wd * 3 },0` +
                `c${ dd },${ hd }, ${ dd },${ hd * 2 } ,0,${ hd * 3 }` +
                `c-${ wd },${ dd } -${ wd * 2 },${ dd } -${ wd * 3 },0` +
                `c${ d },-${ hd } ${ d },-${ hd * 2 }, 0,-${ hd * 3 }`;
        },
        svgAnimateStart() {
            var el = this.$el.querySelector('.vue-modal-background');
            this.screenWidth = el.offsetWidth;
            this.screenHeight = el.offsetHeight;
            this.svg = d3.select(el).append('svg')
                .attr('width', this.screenWidth)
                .attr('height', this.screenHeight);
            this.path = this.svg.append('g').append('path')
                .attr('fill', this.background)
                .attr('d', this.gPath(this.baseWidth, this.baseHeight, true))
                .transition()
                .duration(150)
                .attr('d', this.gPath(this.baseWidth, this.baseHeight, false, false))
                .transition()
                .delay(150)
                .duration(850)
                .ease(d3.easeElastic)
                .attr('d', this.gPath(this.runtimeWidth, this.runtimeHeight, true));
            setTimeout(() => {
                this.$el.className = 'vue-modal is-show';
            }, 800)
        },
        svgAnimateEnd() {

        }
    }
}
</script>
<style lang="sass">
    .vue-modal {
        .vue-modal-title{
        }
        .vue-modal-content{
            h1{
                line-height: 50px;
                color:red;
            }
            position:absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            background: blue;
        }
        .vue-modal-title,
        .vue-modal-content{
            opacity: 0;
            transition: opacity .2s ease-out;
        }
        &.is-show{
            .vue-modal-title,
            .vue-modal-content{
                opacity: 1;
            }
        }
        .vue-modal-background{
            position:fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
    .vue-mask {
        position:fixed;
        top: 0;
        left:0;
        bottom:0;
        right:0;
        background: black;
        opacity: .1;
    }
</style>