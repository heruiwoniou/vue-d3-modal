<template>
    <div class="vue-modal">
        <div class="vue-modal-container"
             :style="styleContainer">
            <div class="vue-modal-title"
                 :style="styleTitle">
                {{ title }}
                <a href="javascript:;"
                   :style="styleTitleClose"
                   @click="close"></a>
            </div>
            <div class="vue-modal-content"
                 :style="styleContent"
                 ref="content">
                <slot>
                    <iframe v-if="src" :src="src" frameborder="0"></iframe>
                </slot>
            </div>
        </div>
        <div class="vue-modal-background"></div>
    </div>
</template>
<script>
import mask from '../common/mask.js';
export default {
    mixins: [mask],

    data() {
        return {
            distance: 10,
            offsetLeft: 0,
            offsetTop: 0,
            baseWidth: 50,
            baseHeight: 50,
            screenWidth: 0,
            screenHeight: 0,

            closeIconMinSize: 20
        }
    },

    props: {
        title: String,
        width: Number,
        height: Number,
        borderRadius: {
            type: Number,
            default: 8
        },
        titleHeight: {
            type: Number,
            default: 60
        },
        titleAlign: {
            type: String,
            default: 'left'
        },
        closeIconSize: {
            type: Number,
            default: 20
        },
        background: {
            default: 'white',
            type: String
        },
        src: {
            default: '',
            type: String
        }
    },

    created() {
        this.closeIconSize = (this.closeIconSize < this.closeIconMinSize ? this.closeIconSize : this.closeIconMinSize);
    },

    mounted() {
        let resizeEvt = 'orientationchange' in window
            ? 'orientationchange'
            : 'resize';
        window.addEventListener(resizeEvt, this.svgResize.bind(this), false);
    },

    computed: {
        styleTitleClose() {
            let w = this.closeIconSize;
            let d = (this.titleHeight - this.closeIconSize) / 2;
            return {
                height: w + 'px',
                width: w + 'px',
                top: d + 'px',
                right: d + 'px'
            }
        },
        styleTitle() {
            return {
                height: this.titleHeight + 'px',
                width: this.width + 'px',
                paddingRight: this.titleHeight + 'px',
                lineHeight: this.titleHeight + 'px',
                textAlign: this.titleAlign,
                paddingLeft: (this.titleAlign == 'center' ? this.titleHeight : 30) + 'px'
            }
        },
        styleContent() {
            return {
                height: this.height - this.titleHeight + 'px',
                width: this.width + 'px',
            }
        },
        styleContainer() {
            return {
                height: this.height + 'px',
                width: this.width + 'px',
                marginLeft: -this.width / 2 + 'px',
                marginTop: -this.height / 2 + 'px'
            }
        },
        runtimeWidth() {
            return this.width;
        },
        runtimeHeight() {
            return this.height;
        }
    },
    methods: {
        gPath(width, height, normal, outer) {
            var wd = (width - 2 * this.borderRadius) / 3;
            var hd = (height - 2 * this.borderRadius) / 3;
            var d = normal ? 0 : ((outer ? -1 : 1) * this.distance);
            var dd = -1 * d;
            return `M${(this.screenWidth - width) / 2} ${((this.screenHeight - height) / 2 + this.borderRadius)}` +
                `q0,${-this.borderRadius} ${this.borderRadius},${-this.borderRadius}` +
                `c${wd},${d} ${wd * 2},${d} ${wd * 3},0` +
                `q${this.borderRadius},0 ${this.borderRadius},${this.borderRadius}` +
                `c${dd},${hd}, ${dd},${hd * 2} ,0,${hd * 3}` +
                `q0,${this.borderRadius} ${-this.borderRadius},${this.borderRadius}` +
                `c-${wd},${dd} -${wd * 2},${dd} -${wd * 3},0` +
                `q${-this.borderRadius},0 ${-this.borderRadius},${-this.borderRadius}` +
                `c${d},-${hd} ${d},-${hd * 2}, 0,-${hd * 3}`
        },
        svgResize() {
            var el = this.$el.querySelector('.vue-modal-background');
            this.screenWidth = el.offsetWidth;
            this.screenHeight = el.offsetHeight;
            this.svg
                .attr('width', this.screenWidth)
                .attr('height', this.screenHeight);
            this.path
                .attr('d', this.gPath(this.runtimeWidth, this.runtimeHeight, true))
        },
        svgAnimateStart() {
            var el = this.$el.querySelector('.vue-modal-background');
            this.screenWidth = el.offsetWidth;
            this.screenHeight = el.offsetHeight;
            this.svg = d3.select(el).append('svg')
                .attr('width', this.screenWidth)
                .attr('height', this.screenHeight);
            this.path = this.svg.append('g').append('path');

            this.path.attr('fill', this.background)
                .attr('d', this.gPath(this.baseWidth, this.baseHeight, true))
                .style('opacity', '0')
                .transition()
                .duration(100)
                .attr('d', this.gPath(this.baseWidth, this.baseHeight, false, false))
                .transition()
                .delay(100)
                .duration(200)
                .ease(d3.easeExpIn)
                // .duration(500)
                // .ease(d3.easeElasticOut)
                .style('opacity', '1')
                .attr('d', this.gPath(this.runtimeWidth, this.runtimeHeight, true))
            setTimeout(() => {
                this.$el.className = 'vue-modal is-show';
            }, 400)
        },
        svgAnimateEnd() {
            return new Promise((resolve, reject) => {
                this.path
                    .attr('d', this.gPath(this.runtimeWidth, this.runtimeHeight, true))
                    .transition()
                    .duration(100)
                    .attr('d', this.gPath(this.runtimeWidth, this.runtimeHeight, false, true))
                    .transition()
                    .delay(100)
                    .duration(200)
                    .ease(d3.easeExpOut)
                    .style('opacity', '0')
                    .attr('d', this.gPath(this.baseWidth, this.baseHeight, true));
                setTimeout(() => {
                    resolve();
                }, 300)
            })
        },
        afterOpen() {
            return this.svgAnimateStart();
        },
        beforeClose() {
            this.$el.className = 'vue-modal';
            return this.svgAnimateEnd();
        }
    }
}
</script>
<style lang="sass">
    .vue-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .vue-modal-container{
            position:absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
        }
        .vue-modal-title{
            font-size: 18px;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #161616;
            font-weight: bold;
            a{
                position: absolute;
                transform: rotate3d(0,0,1,45deg) scale3d(0, 0, 0);
                transition: transform .2s cubic-bezier(0.2,1,0.3,1); 
                &:before,&:after{
                    content: '';
                    background: #161616;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                }
                &:before{
                    content: '';
                    width: 140%;
                    height: 2px;
                    margin-left: -70%;
                    margin-top: -1px;
                }
                &:after{
                    height: 140%;
                    width: 2px;
                    margin-left: -1px;
                    margin-top: -70%;
                }
            }
        }
        .vue-modal-content{
            iframe{
                height: 100%;
                width: 100%;
            }
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

            .vue-modal-title a{
                transform: rotate3d(0,0,1,45deg) scale3d(1, 1, 1);
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