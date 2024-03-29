<template>
    <div class="vue-modal">
        <div class="vue-modal-container"
             :style="styleContainer">
            <div class="vue-modal-title"
                 :style="styleTitle" ref="title">
                {{ title }}
                <a href="javascript:;"
                   :style="styleTitleClose"
                   @click="close"></a>
            </div>
            <div class="vue-modal-status" :style="styleContent" v-show="moving">
                <svg t="1493353365923" class="icon" style="" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5966" xmlns:xlink="http://www.w3.org/1999/xlink" height="20%" fill="rgba(0,0,0,.1)"><defs><style type="text/css"></style></defs><path d="M507.723027 639.47369C576.326639 639.47369 638.176327 582.659169 638.176327 512.574903 638.176327 442.490637 576.326639 385.676112 507.723027 385.676112 439.119415 385.676112 383.505198 442.490635 383.505198 512.574901 383.505198 582.659166 439.119415 639.47369 507.723027 639.47369Z" p-id="5967"></path><path d="M333.10379 257.010049C320.464977 242.392432 318.039349 213.583993 330.933492 198.647214L482.381569 11.362984C495.339544-3.637628 516.021238-3.829125 528.91538 11.043822L690.840233 199.413203C703.734375 214.03082 703.734375 242.137102 690.840233 257.010049L333.10379 257.010049Z" p-id="5968"></path><path d="M691.23233 771.300256C703.998808 782.024097 703.871143 804.480415 691.23233 815.204256L531.213346 1013.339991C518.255371 1024 497.701342 1024 484.934864 1013.339991L333.955618 815.204256C321.18914 804.480415 321.18914 782.151762 333.955618 771.427921L691.23233 771.300256Z" p-id="5969"></path><path d="M825.863653 338.950803 1013.147882 486.148292C1028.084661 499.553093 1028.33999 521.319938 1013.530876 534.660907L825.352994 688.560797C810.799209 701.774101 783.580025 702.029431 768.770911 688.560797L768.770911 338.567816C768.770911 338.567816 810.990706 325.546001 825.863653 338.950803Z" p-id="5970"></path><path d="M256.661324 691.369415C242.043707 704.710385 212.753558 704.582726 198.135941 691.369422L10.979377 534.405578C-3.702072 520.936944-3.702072 499.361596 11.234707 485.892962L196.859294 335.440022C211.476911 322.226717 241.979878 322.099048 256.661328 335.440017L256.661324 691.369415Z" p-id="5971"></path></svg>
            </div>
            <div class="vue-modal-content" v-show="!moving"
                 :style="styleContent"
                 ref="content">
                <slot>
                    <iframe v-if="src" :src="src" frameborder="0" :style="iframeStyle"></iframe>
                </slot>
            </div>
        </div>
        <div class="vue-modal-background"></div>
    </div>
</template>
<script>
import mask from '../common/mask.js';
import draggable from '../common/draggable.js';

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

            closeIconMinSize: 20,

            moving:false,
            moveOffset:{
                x: 0,
                y: 0
            }
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
        draggable:{
            type: Boolean,
            default:true
        },
        offset:{
            type:Object,
            default:function(){
                return {
                    left: 0,
                    top: 0
                }
            }
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
        if(this.draggable) this.$nextTick(() => this.bindMove(this.$refs.title));
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
        iframeStyle(){
            return {
                width: this.width - this.offset.left + 'px',
                height: this.height - this.titleHeight - this.offset.top + 'px',
                marginLeft: this.offset.left + 'px',
                marginTop: this.offset.top + 'px'
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
                marginLeft: ( -this.width / 2 + this.moveOffset.x ) + 'px',
                marginTop: ( -this.height / 2 + this.moveOffset.y ) + 'px'
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
            this.g = this.svg.append('g')
            this.path = this.g.append('path');

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
        translateSVG(){
            this.g.attr('transform','translate(' + this.moveOffset.x + ',' + this.moveOffset.y + ')');
        },
        afterOpen() {
            return this.svgAnimateStart();
        },
        beforeClose() {
            this.$el.className = 'vue-modal';
            return this.svgAnimateEnd();
        },
        bindMove(el) {
            var dx,
                dy,
                ox,
                oy,
                maxw,
                maxh,
                minw,
                minh,
                timer,
                movetimes;
            if (!el) {
                return;
            }
            draggable(el, {
                start: (e) => {
                    movetimes = 0;
                    ox = this.moveOffset.x
                    oy = this.moveOffset.y
                    dx = e.pageX - ox;
                    dy = e.pageY - oy;
                    maxw = (document.documentElement.offsetWidth  - this.width ) / 2;
                    maxh = (document.documentElement.offsetHeight - this.height ) / 2;
                    minw = -1 * maxw;
                    minh = -1 * maxh;
                },
                drag: (e) => {
                    if(movetimes > 1){
                        this.moving = true;
                        if (e.pageX - dx < minw) {
                            this.moveOffset.x = minw;
                        } else if (e.pageX - dx > maxw) {
                            this.moveOffset.x = maxw;
                        } else {
                            this.moveOffset.x = (e.pageX - dx);
                        }
                        if (e.pageY - dy < minh) {
                            this.moveOffset.y = minh;
                        } else if (e.pageY - dy > maxh) {
                            this.moveOffset.y = maxh;
                        } else {
                            this.moveOffset.y = (e.pageY - dy);
                        }
                        this.translateSVG();
                    }else{
                        movetimes ++;
                    }
                    
                },
                end: () => {
                    this.moving = false
                }
            })
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
        .vue-modal-status{
            white-space: nowrap;
            text-align: center;
            &:before{
                content: '';
                height: 100%;
                width: 1px;
                display: inline-block;
                vertical-align: middle;
            }
            svg{
                display:inline-block;
            }
        }
        .vue-modal-content{
            overflow: hidden;
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