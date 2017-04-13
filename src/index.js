(function () {
    $(document)
        .ready(function () {
            var baseSeed  = 12 * 1920 / 380.600;
            var appVm = new Vue({
                    el: 'body > .app',
                    data: {
                        navIndex: 0,
                        navs:[
                            { name: '人事服务', icons: 'service1.png' },
                            { name: '科研服务', icons: 'service2.png' },
                            { name: '财务服务', icons: 'service3.png' },
                            { name: '后勤服务', icons: 'service4.png' },
                            { name: '招生服务', icons: 'service5.png' },
                            { name: '教学服务', icons: 'service6.png' },
                            { name: '就业服务', icons: 'service7.png' },
                            { name: '网信服务', icons: 'service8.png' },
                        ],
                        services: [
                            { name: '本专科奖学金申请' ,icon:'action1.png'},
                            { name: '本科课程表查询' ,icon:'action2.png'},
                            { name: '研究生中文成绩' ,icon:'action3.png'},
                            { name: '本专科奖学金申请' ,icon:'action4.png'},
                            { name: '教师借用' ,icon:'action5.png'},
                            { name: '校内讲座审批' ,icon:'action6.png'},
                            { name: '校园一卡通挂失' ,icon:'action7.png'},
                            { name: '车辆临时进' ,icon:'action8.png'},
                            { name: '财务服务' ,icon:'action9.png'},
                            { name: '本科生学籍证明' ,icon:'action10.png'},
                            { name: '校内讲座审批' ,icon:'action11.png'},
                            { name: '奖学金申请' ,icon:'action12.png'},
                            { name: '教师借用' ,icon:'action13.png'},
                            { name: '校内讲座审批' ,icon:'action14.png'},
                            { name: '校内讲座审批' ,icon:'action1.png'},
                            { name: '车辆临时进' ,icon:'action15.png'},
                            { name: '财务服务' ,icon:'action16.png'},
                            { name: '本科生学籍证明' ,icon:'action17.png'},
                            { name: '博士后基本信息维护' ,icon:'action18.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                        ], 
                        apps: [
                            { name : '本专科生学费减免申请', icon:'person2-btn1.png'},
                            { name : '车辆临时进校门卫查询', icon:'person2-btn2.png'},
                            { name : '校内讲座审批', icon:'person2-btn3.png'},
                            { name : '本科课程表查询', icon:'person2-btn4.png'},
                            { name : '本专科奖学金申请', icon:'person2-btn5.png'},
                            { name : '奖学金申请', icon:'person2-btn6.png'},
                        ],
                        //主页面状态
                        visible: true,

                        /**
                         * 搜索状态
                         */

                        //搜索条状态
                        search: false,
                        //搜索中
                        searching: false,
                        //是否搜索过
                        searched: false,

                        /**
                         * 侧边菜单状态
                         */
                        sider: false,

                        /**
                         * 毛玻璃状态
                         */
                        glass: false,

                        mainMaxHeight: 0,
                        searchMaxHeight: 0
                    },

                    computed: {
                        mainContainerStyle: function () {
                            return {
                                'max-height': this.mainMaxHeight + 'px'
                            }
                        },
                        mainSearchContentStyle: function(){
                            return {
                                'height': this.searchMaxHeight + 'px'
                            }
                        }
                    },
                    methods:{
                        navChange:function(index){
                            this.navIndex = index;
                        },
                        openSearch:function(){
                            this.visible = false;
                            setTimeout(function(){
                                this.search = true;
                                setTimeout(function(){
                                    $('#searchInput').focus();
                                }.bind(this),500)
                            }.bind(this),200)
                        },
                        closeSearch:function(){
                            this.search = false;
                            setTimeout(function(){
                                this.visible = true;
                                this.searched = false;
                            }.bind(this),200)
                        },
                        doSearch:function(){
                            this.searching = true;
                            setTimeout(function(){
                                this.searching = false;
                                this.searched = true;
                            }.bind(this),2000)
                        },

                        openSider:function(){
                            this.siderOpening = true;
                            this.sider = true;
                        },
                        sideAfterEnter:function(){
                            this.glass = true;
                            this.siderOpening = false;
                        },
                        sideBeforeLeave:function(){
                            this.glass = false;
                        },
                        closeSider:function(){
                            if(!this.sider || this.siderOpening) return;
                            this.sider = false;
                        }
                    }
                })

                var docEl = document.documentElement,
                    fontSize,
                    resizeEvt = 'orientationchange' in window
                        ? 'orientationchange'
                        : 'resize',
                    recalc = (function recalc() {
                        var clientWidth = docEl.clientWidth;
                        var docHeight = document.documentElement.offsetHeight;
                        if (!clientWidth) 
                            return;
                        fontSize = 12 * clientWidth / 380.600;
                        docEl.style.fontSize = fontSize + 'px';
                        appVm.mainMaxHeight = docHeight - ( 383 / baseSeed ) * fontSize;
                        appVm.searchMaxHeight = docHeight - ( (280 + 175) / baseSeed ) * fontSize;
                        return recalc;
                    })();
                if (!document.addEventListener) 
                    return;
                window.addEventListener(resizeEvt, recalc, false);
                document.getElementById('app').style.display = "block";
            })
    })(jQuery)