"ui";

auto.waitFor();
var color = "#000000";

let mod = require("./src/modules.js");

//数据源
var _golDataSource;
var _golHasBind = false;    //是否绑定数据
var _golFolder = "./src/";
/**
 * 当前刷新app的索引
 */
var _golRunIndex = 0;

/**
 * card按钮宽度
 */
var _golCardWidth = 0;
/**
 * card按钮高度
 */
var _golCardHeigth = 200
/**
 * 共通方法类
 */
var golRunComm = null;
/**
 * 主线程
 */
var _golThread;
/**
 * 保存窗口数据和窗口状态
 */
var _golStorage = null;

/**小窗体的大小 */
var floaty_window_W;
var floaty_window_H;
/**按钮名称 */
var floaty_window_BtnStr;
//-----窗口数据结束

var key = "default";


/**img */
var img_gt = "file://./src/gt.jpg"
var img_ktgt = "file://./src/ktgt.jpg"

_golCardWidth = parseInt(device.width * 0.155);


Main();//主入口

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar bg="#FF5c50e6" id="toolbar" title="自动学习" paddingTop="2dp" h="auto" >
                    <button bg="#FF00CED1" id="BtnExit" layout_gravity="right" textColor="#ffffff" text="退出" style="Widget.AppCompat.Button.Borderless.Colored" w="auto" />
                </toolbar>
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                {/* 第一级 */}
                <frame>
                    <scroll>
                        <vertical>
                            <horizontal gravity="center_vertical">
                                <card w="{{_golCardWidth}}" h="{{_golCardHeigth}}"
                                    layout_width="0dp" layout_weight="3"
                                    margin="4" cardCornerRadius="15dp" cardBackgroundColor="#f5f5f5"
                                    cardElevation="15dp" gravity="left" foreground="?selectableItemBackground">
                                    <vertical>
                                        <linear margin="0 40 0 0">
                                            <View bg="#2196f3" h="*" w="10" />
                                            <text id="name" w="*" h="40" hint="欢迎使用" />
                                        </linear>
                                        <button id="BtnStart" text="开始任务" w="{{_golCardWidth}}" />
                                    </vertical>
                                </card>

                                <card w="{{_golCardWidth}}" h="{{_golCardHeigth}}"
                                    layout_width="0dp" layout_weight="3"
                                    margin="4" cardCornerRadius="15dp" cardBackgroundColor="#f5f5f5"
                                    cardElevation="15dp" gravity="right" foreground="?selectableItemBackground">
                                    <vertical>
                                        <linear margin="0 40 0 0">
                                            <img w="30" h="30" src="@drawable/ic_person_black_48dp" />
                                            <text id="name" w="*" h="40" hint="第一次使用需要修改配置" />
                                        </linear>
                                        <button id="BtnHorWin" text="横向窗体" w="{{_golCardWidth}}" />
                                    </vertical>
                                </card>
                            </horizontal>

                            <horizontal gravity="center_vertical">
                                <card w="{{_golCardWidth}}" h="{{_golCardHeigth}}"
                                    layout_width="0dp" layout_weight="3"
                                    margin="4" cardCornerRadius="15dp" cardBackgroundColor="#f5f5f5"
                                    cardElevation="15dp" gravity="left" foreground="?selectableItemBackground">
                                    <vertical>
                                        <linear margin="0 40 0 0">
                                            <img w="120" h="120" src="{{img_gt}}" />
                                        </linear>
                                        <text id="name" w="*" h="40" hint="欢迎使用" />
                                    </vertical>
                                </card>

                                <card w="{{_golCardWidth}}" h="{{_golCardHeigth}}"
                                    layout_width="0dp" layout_weight="3"
                                    margin="4" cardCornerRadius="15dp" cardBackgroundColor="#f5f5f5"
                                    cardElevation="15dp" gravity="right" foreground="?selectableItemBackground">
                                    <vertical>
                                        <linear margin="0 40 0 0">
                                            <img w="120" h="120" src="{{img_ktgt}}" />
                                        </linear>
                                        <text id="name" w="*" h="40" hint="关注" />
                                    </vertical>
                                </card>
                            </horizontal>

                        </vertical>
                    </scroll>
                </frame>
                {/*
                第二级
                 注释：
                 -修改排序内容 */}
                <frame>
                    <vertical>
                        <horizontal weightSum="8" bg='#FF5c50e6'>
                            <button layout_width="0dp" layout_weight="4" id="BtnSave" text="手动保存" />
                            <button layout_width="0dp" layout_weight="4" id="BtnBegin" text="执行任务" />
                        </horizontal>
                        <scroll>
                            <vertical>

                                <card id="card0" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#000080" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName0" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath0" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app0" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid0" text="" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t0" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done0" marginLeft="4" marginRight="6" checked="true" />
                                    </horizontal>
                                </card>

                                <horizontal weightSum="8" bg='#000080'>
                                    <text gravity="center" textSize="20sp" typeface="monospace" textStyle="bold" textColor="white" id="text1">
                                        是否要做四人赛？
                                    </text>
                                    {/* <switch id="switch0">

                                    </switch> */}
                                </horizontal>

                                <card id="card1" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#00008B" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName1" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath1" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app1" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid1" text="" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t1" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done1" marginLeft="4" marginRight="6" checked="false" />
                                    </horizontal>
                                </card>

                                <card id="card2" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#0000CD" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName2" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath2" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app2" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid2" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t2" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done2" marginLeft="4" marginRight="6" checked="false" />
                                    </horizontal>
                                </card>
                                <checkbox id="cb2" checked="true" text="完成每日任务" />
                                <radiogroup>
                                    <radio text="单选框1" />
                                    <radio text="单选框2" />
                                    <radio text="单选框3" />
                                </radiogroup>
                                <card id="card3" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#0000FF" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName3" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath3" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app3" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid3" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t3" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done3" marginLeft="4" marginRight="6" checked="false" />
                                    </horizontal>
                                </card>

                                <card id="card4" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#00BFFF" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName4" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath4" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app4" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid4" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t4" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done4" marginLeft="4" marginRight="6" checked="false" />
                                    </horizontal>
                                </card>

                            </vertical>
                        </scroll>
                    </vertical>
                </frame>
                {/*
                    第三级
                 ？第二层结束？ */}
                <frame>
                    <com.stardust.autojs.core.console.ConsoleView id="console" h="*" />
                </frame>
                {/*
                    第四级
                 ？第四层结束？ */}
                <frame>
                    <card id="card4" w="*" h="100" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                        <horizontal gravity="center_vertical">
                            <View bg="#00BFFF" h="*" w="10" />
                            <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                <text w="auto" color="#111111" size="16" text="1.需要启动无障碍服务。" />
                                <text w="auto" color="#111111" size="16" text="2.允许app显示在其他应用的上层。" />
                                <text w="auto" color="#111111" size="16" text="3.更多内容请参考：https://hyb1996.github.io/AutoJs-Docs/。" />
                            </vertical>

                        </horizontal>
                    </card>
                </frame>
                {/*
                    第五级
                 ？第五层结束？ */}
                <frame>
                    <vertical>
                        <card id="card5" w="*" h="100" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                            <horizontal gravity="center_vertical">
                                <View bg="#ff000c" h="*" w="10" />
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" color="#111111" size="26" text="仅供学习交流使用。" />
                                    <text w="auto" color="#111111" size="26" text="不得用于任何商业用途！" />
                                </vertical>
                            </horizontal>
                        </card>

                        <card id="card6" w="*" h="100" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                            <horizontal gravity="center_vertical">
                                <View bg="#ff000c" h="*" w="10" />
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" color="#ff000c" size="20" text="界面待开发，仅供参考。" />
                                </vertical>
                            </horizontal>
                        </card>
                    </vertical>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" />
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);



/**复选框 开始*/
//绑定勾选框事件
ui.done0.on("check", function (checked) {
    log("ck-" + checked);

    if (checked) {
        ui.card0.attr("bg", "#F5f5f5");
    } else {
        ui.card0.attr("bg", "#999999");
    }

});
/**复选框 结束*/
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["主页", "配置", "日志", "帮助", "警告"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

/**
 * 页面头部选项卡更改侦听器
 * */
ui.viewpager.setOnPageChangeListener({
    //已选定页面发生改变时触发
    onPageSelected: function (index) {
        if (index == 1 && _golHasBind == false) {
            /**
            * 绑定，填充数据
            */
            // bindDdata();
        } else if (index == 2) {
            /**控制台 */
            ui.console.setConsole(runtime.console);
            // ui.console.findViewById(org.autojs.autojs.R.id.input_container).setVisibility(android.view.View.GONE);
            //ui.console.setConsole(org.autojs.autojs.autojs.AutoJs.getInstance().getGlobalConsole());            

            // 设置控制台字体颜色
            let c = new android.util.SparseArray();
            let Log = android.util.Log;
            c.put(Log.VERBOSE, new java.lang.Integer(colors.parseColor("#dfc0c0c0")));
            c.put(Log.DEBUG, new java.lang.Integer(colors.parseColor("#cc000000")));
            c.put(Log.INFO, new java.lang.Integer(colors.parseColor("#ff64dd17")));
            c.put(Log.WARN, new java.lang.Integer(colors.parseColor("#ff2962ff")));
            c.put(Log.ERROR, new java.lang.Integer(colors.parseColor("#ffd50000")));
            c.put(Log.ASSERT, new java.lang.Integer(colors.parseColor("#ffff534e")));
            ui.console.setColors(c);
            /**控制台 */
        }

    }
})

/**
 * 主入口程序
 */
function Main() {
    log("main");

    engines.all().slice(1).forEach(script => {
        if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
            toastLog("脚本正在运行中");
            engines.myEngine().forceStop();
        }
    });

    ui.statusBarColor(color);

    // _golDataSource = LoadConfig();
    _golStorage = storages.create("KleverX@github.com:win");

    _golStorage.put("winW", 123);
    _golStorage.put("winH", 456);
    _golStorage.put("btnText", 789);

    log("winW=" + _golStorage.get("winW"));
    log("winH=" + _golStorage.get("winH") + "-btnText-" + _golStorage.get("btnText"));


    floaty_window_W = 120;
    floaty_window_H = 120;
    floaty_window_BtnStr = "小化";
}


/**
 * 将数据填充到UI中
 */
function bindDdata() {

    for (let k = 0; k < _golDataSource.length; k++) {

        ui["filepath" + k].setText(_golDataSource[k].filepath);

        let appEn = _golDataSource[k].app;
        ui["app" + k].setText(appEn);


        let appCn = getAppName(appEn);
        if (null == appCn) {

            ui["done" + k].checked = false;
            ui["card" + k].attr("bg", "#999999");
            ui["appCnName" + k].setText(appEn);
        }
        else {

            ui["done" + k].checked = true;
            ui["card" + k].attr("bg", "#F5f5f5");
            ui["appCnName" + k].setText(appCn);
        }

        let isRun = _golDataSource[k].Run;
        if ("0" == isRun) {
            ui["done" + k].checked = false;
            ui["card" + k].attr("bg", "#A9A9A9");
        }

        ui["sortid" + k].setText(_golDataSource[k].sortid);
        ui["t" + k].setText(_golDataSource[k].t);
    }
    _golHasBind = true;
}

/**
 * 读取config文件
 */
function LoadConfig() {

    let _txtFile = _golFolder + "config.txt";

    if (files.exists(_txtFile)) {

        toast('读取文件' + _txtFile);

        var jsonStr = files.read(_txtFile);
        setTimeout(() => {
            toastLog("读取文件。");
        }, 400);
        var commFun = require(_golFolder + "CommonFun.js");
        golRunComm = new commFun();

        /**
        *对数组重新排序
        */
        let obj = golRunComm.ReSort(eval('(' + jsonStr + ')'));
        setTimeout(() => {
            toastLog("文件解析完成。");
        }, 400);

        return obj;
    }

}

/**保存按钮 */
ui.BtnSave.on("click", function () {

    let str = "[";

    for (let k = 0; k < _golDataSource.length; k++) {

        str += "{\"filepath\":\"" + ui["filepath" + k].text() + "\",";
        str += "\"app\":\"" + ui["app" + k].text() + "\","
        str += "\"sortid\":\"" + ui["sortid" + k].text() + "\",";
        str += "\"t\":\"" + ui["t" + k].text() + "\"}";
        if (k < _golDataSource.length - 1) {
            str += ",";
        }
    }

    str += "]";

    _golDataSource = golRunComm.ReSort(eval('(' + str + ')'));

    let _txtFile = _golFolder + "config.txt";
    files.write(_txtFile, str);

    setTimeout(() => {
        toastLog("修改文件。");
    }, 1500);

    // bindDdata();
    setTimeout(() => {
        toastLog("更新UI界面。");
    }, 1500);
});

ui.cb2.on("check", (checked) => {
    if (checked) {
        toast("取消每日任务");
    } else {
        toast("完成每日任务");
    }
});

/**
 * 启动刷新程序
 */
ui.BtnStart.on("click", () => {
    ui.BtnStart.setText("暂停");
    ui.BtnBegin.setText("暂停");
    _golThread = threads.start(function () {
        log("Start日志");
        mod.print_info();
        log("启动子线程");
        ThreadStart();
    });
});
ui.BtnBegin.on("click", () => {
    ui.BtnStart.setText("暂停");
    ui.BtnBegin.setText("暂停");
    _golThread = threads.start(function () {
        log("Start日志");
        mod.log_info();
        log("启动子线程");
        ThreadStart();
    });
});
/**
 * 退出程序
 */
ui.BtnExit.on("click", () => {
    if (_golThread && _golThread.isAlive()) {
        log("线程" + _golThread.isAlive());
        _golThread.interrupt();
    }
    ui.finish();
});

function ThreadStart() {
    log("线程启动>>" + _golDataSource[0].filepath);

    Help(_golFolder + _golDataSource[_golRunIndex].filepath,
        _golDataSource[_golRunIndex].app,
        _golDataSource[_golRunIndex].t,
        getAppName(_golDataSource[_golRunIndex].app));
}

/**
* 
* [url=home.php?mod=space&uid=952169]@Param[/url] {js路径} _path 
* @param {app包名称} _appName 
* @param {执行时间长度} _times 
* @param {包中文名} _cn 
*/
function Help(_path, _appName, _times, _cn) {
    var myObj = require(_path);
    var unlock = new myObj(_appName, _times, _cn, golRunComm);
    unlock.RunApp();
    Calc_golRunIndex();
    ThreadStart();
}