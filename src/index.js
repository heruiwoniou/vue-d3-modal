(function () {
    $(document)
        .ready(function () {
            var baseSeed  = 12 * 1920 / 380.600;
            var dockPostion,indexResizeTimer,centerResizeTimer;
            var appVm = new Vue({
                    el: 'body > .app',
                    data: {
                        appPageIndex: 0,
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
                            //{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},{ name: '本专科奖学金申请' ,icon:'action1.png'},
                            
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
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
                            { name: '奖学金申请' ,icon:'action19.png'},
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
                        mainCenterMaxHeight: 0,
                        searchMaxHeight: 0,

                        //doc内的内容项
                        taskBar:[
                            { caseid: 1, name: '博士后基本信息维护' ,icon:'action18.png'},
                            { caseid: 2,name: '奖学金申请' ,icon:'action19.png'}
                        ],
                        insertTaskIndex: -1,
                        //删除app面板的状态控制
                        deletePanel: false,
                        //drop后是否执行删除
                        deleteAction: false,
                        //是否已经初始化的状态控制
                        isInit: false,
                        //加载进度条的状态控制
                        loading: true,
                        //弹框的状态控制
                        modalStatus:false,
                        modalURI:'about:blank;',
                        //dock的状态控制
                        footBarStatus: true
                    },

                    computed: {
                        mainContainerStyle: function () {
                            return {
                                'max-height': this.mainMaxHeight + 'px'
                            }
                        },
                        mainCenterContainerStyle:function(){
                            return {
                                'max-height': this.mainCenterMaxHeight + 'px'
                            }
                        },
                        mainSearchContentStyle: function(){
                            return {
                                'height': this.searchMaxHeight + 'px'
                            }
                        }
                    },
                    watch:{
                        appPageIndex:function(){
                            if(this.appPageIndex == 1){
                                this.$nextTick(function(){
                                    this.calendarInit();
                                }.bind(this))
                            }
                        },
                        mainContainerStyle:function(){
                            clearTimeout(centerResizeTimer);
                            centerResizeTimer = setTimeout(function(){
                                var $parent = $('#df-self .main > div');
                                if($parent.is(':visible')){
                                    $parent.find('div:first').css({
                                        maxHeight: $parent.css('maxHeight')
                                    })
                                }
                            }.bind(this))
                        },
                        mainCenterContainerStyle:function(){
                            clearTimeout(indexResizeTimer);
                            indexResizeTimer = setTimeout(function(){
                                var $parent = $('#main .main-container');
                                if($parent.is(':visible')){
                                    $parent.find('div:first').css({
                                        maxHeight: $parent.css('maxHeight')
                                    })
                                }
                            }.bind(this))
                        }
                    },
                    mounted:function(){
                        function clickTab(a,b,_this){
                            if($(_this).hasClass(a)){
                                return
                            }else{
                                $(_this).siblings().removeClass(a);
                                $(_this).addClass(a);
                                $(b).not($(_this).index()).fadeOut(100);
                                $(b).eq($(_this).index()).fadeIn(100);
                            }
                        }
                        $('.server .lists ul').eq(0).show();
                        $('.right .r-listBox ul').eq(0).show();

                        $('.server .list').click(function(){
                            var _this = this;
                            clickTab('active','.server .lists ul',_this);
                        });
                        $('.right .r-head a').click(function(){
                            var _this = this;
                            clickTab('active','.right .r-listBox ul',_this);
                        });

                        var $dock = $('#dock');
                        
                        $('#main .action').draggable({
                            helper: "clone",
                            appendTo:'body',
                            containment:'.app',
                            start:function( event, ui ){
                                dockPostion = $dock.offset();
                                dockPostion.width = $dock.width() + 20;
                                dockPostion.itemWidth = dockPostion.width / $dock.find('>div').length;
                            },
                            drag:function( event, ui ){
                                if(appVm.insertTaskIndex!=-1){
                                    appVm.insertTaskIndex = Math.floor(( event.clientX - dockPostion.left + dockPostion.itemWidth / 2 ) / dockPostion.itemWidth)
                                }
                            }
                        });
                        $dock.droppable({
                             accept: ".action",
                             over:function( event, ui ){
                                 appVm.insertTaskIndex = 0;
                             },
                             out:function( event, ui ){
                                 appVm.insertTaskIndex = -1;
                             },
                             drop:function( event, ui ){
                                 var index = (ui.helper.data('index'));
                                 appVm.taskBar.splice(appVm.insertTaskIndex,0,$.extend({caseid : Math.round(Math.random() * 1e5)},appVm.services[index]));
                                 appVm.$nextTick(function(){
                                     appVm.taskBarInit();
                                 })
                                 appVm.insertTaskIndex = -1;
                                 return false;
                             }
                        });
                        this.taskBarInit();
                        this.deletePanelInit();
                        document.getElementById('app').style.display = "block";
                        setTimeout(function(){
                            this.isInit = true; //设置初始化完成
                            this.loading = false; //设置进度条状态
                        }.bind(this),200)
                    },
                    methods:{
                        modal:function(src){
                            return new Promise(function(resolve,reject){
                                this.resolve = resolve;
                                this.modalURI = src;
                                this.visible = false;
                                this.footBarStatus = false;
                                setTimeout(function(){
                                    this.modalStatus = true;
                                }.bind(this),200)
                            }.bind(this));
                        },
                        closeModal:function(){
                            this.resolve();
                            this.modalStatus = false;
                            setTimeout(function(){
                                this.visible = true;
                                this.footBarStatus = true;
                                this.modalURI = "about:blank;"
                            }.bind(this),200)
                        },
                        gotoNews:function(){
                            this.modal('news.html').then(function(){
                                // alert('modal closed')
                            });
                        },
                        deletePanelInit:function(){
                            $(this.$refs.deletepanel).droppable({
                                accept: ".task",
                                over:function( event, ui ){
                                    appVm.deleteAction = true;
                                },
                                out:function( event, ui ){
                                    appVm.deleteAction = false;
                                },
                                drop:function(event,ui){
                                    if(appVm.deleteAction) {
                                        var index = +ui.helper.data('index');
                                        appVm.taskBar.splice(index,1);
                                    }
                                    appVm.deletePanel = false;
                                    appVm.deleteAction = false;
                                    return false;
                                }
                            })
                        },
                        taskBarInit:function(){
                            $(this.$refs.dock).find('div:not(.draggable)').draggable({
                                revert : 'invalid',
                                revertDuration: 200,
                                containment:'window',
                                start:function(){
                                    console.log('s')
                                    appVm.deletePanel = true;
                                },
                                stop:function(){
                                    console.log('stop')
                                    appVm.deletePanel = false;
                                }
                            });
                        },
                        calendarInit:function(){
                            if(this.calendarInited) return;
                            this.calendarInited = true;
                            var date = new Date();
                            var d = date.getDate();
                            var m = date.getMonth();
                            var y = date.getFullYear();

                            $('#calendar').fullCalendar({
                                header: {
                                    left: '',
                                    center: 'title',
                                    right: 'prev today next '
                                },
                                firstDay:1,
                                editable: false,
                                timeFormat: 'H:mm',
                                axisFormat: 'H:mm',
                                events: [
                                    {
                                        title: '全天计划\r\n#####\r\n写代码',
                                        start: new Date(y, m, 2)
                                    },
                                    {
                                        title: '张家界四日游',
                                        start: new Date(y, m, d-5),
                                        end: new Date(y, m, d-2)
                                    },
                                    {
                                        id: 999,
                                        title: '电话回访客户',
                                        start: new Date(y, m, d-6, 16, 0),
                                        allDay: false
                                    },
                                    {
                                        id: 999,
                                        title: '电话回访客户',
                                        start: new Date(y, m, d+4, 16, 0),
                                        allDay: false
                                    },
                                    {
                                        title: '视频会议',
                                        start: new Date(y, m, d, 10, 30),
                                        allDay: false
                                    },
                                    {
                                        title: '中秋放假',
                                        start: '2013-09-19',
                                        end: '2013-09-21',
                                    },
                                    {
                                        title: '午饭',
                                        start: new Date(y, m, d, 12, 0),
                                        end: new Date(y, m, d, 14, 0),
                                        allDay: false
                                    },
                                    {
                                        title: '生日聚会',
                                        start: new Date(y, m, d+1, 19, 0),
                                        end: new Date(y, m, d+1, 22, 30),
                                        allDay: false
                                    },
                                    {
                                        title: '访问Helloweba主页',
                                        start: new Date(y, m, 28),
                                        end: new Date(y, m, 29),
                                        url: 'http://helloweba.com/'
                                    },
                                    {
                                        title: '实战训练课',
                                        start: new Date(y, m, d+23)
                                    },
                                ],
                                eventClick:function(jsEvt,event){
                                    // var $target = $(event.target).closest('.fc-event-inner');
                                    // var offset = $target.offset();
                                    // var width = $target.width();
                                    // if(offset){
                                        jsEvt.backgroundColor="#ea5532";
                                        $('#calendar').fullCalendar( 'updateEvent', jsEvt )
                                        WebApi.modal({
                                            title:'新建日程',
                                            src: 'calendar.html',
                                            width: 500,
                                            height: 410
                                        }).then(function(cmd){
                                            // this.modal('news.html').then(function(){
                                            // // alert('modal closed')
                                            // });
                                            if(cmd == 'success'){
                                                alert('保存成功，进行更新！')
                                            }
                                            delete jsEvt.backgroundColor;
                                            $('#calendar').fullCalendar( 'updateEvent', jsEvt )
                                        }.bind(this))
                                    // }
                                }
                            });

                            
                        },

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
                        openShare:function(){
                             WebApi.modal({
                                title:'请选择你需要分享的同学',
                                src: 'share.html',
                                width: 510,
                                height: 830,
                                offset:{
                                    left: -100
                                }
                            }).then(function(cmd){
                                console.log(cmd);
                                // this.modal('news.html').then(function(){
                                // // alert('modal closed')
                                // });
                            }.bind(this))
                        },
                        openSider:function(){
                            this.siderOpening = true;
                            this.sider = true;
                            setTimeout(function(){
                                this.glass = true;
                                this.siderOpening = false;
                            }.bind(this))
                        },
                        sideBeforeLeave:function(){
                            this.glass = false;
                        },
                        closeSider:function(){
                            if(!this.sider || this.siderOpening) return;
                            this.sider = false;
                        },
                        dialog(){
                            WebApi.modal({
                                title:'校内讲座审批',
                                src: 'comments.html',
                                width: 710,
                                height: 730
                            }).then(function(cmd){
                                // this.modal('news.html').then(function(){
                                // // alert('modal closed')
                                // });
                            }.bind(this))
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
                        appVm.mainMaxHeight = docHeight - ( 423 / baseSeed ) * fontSize;
                        appVm.mainCenterMaxHeight = docHeight - ( 322 / baseSeed ) * fontSize;
                        appVm.searchMaxHeight = docHeight - ( (280 + 175) / baseSeed ) * fontSize;
                        return recalc;
                    })();
                if (!document.addEventListener) 
                    return;
                window.addEventListener(resizeEvt, recalc, false);
                
            })
    })(jQuery)