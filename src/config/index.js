// const ssoUrl = "http://login.wt.gzwing.cn/"; //测试单点登录地址
// const ssoUrl = "http://localhost:8081/"; //本地单点登录地址
const ssoUrl = "http://login.sso.topsgd.cn/"; //正式单点登录地址

// const baseUrl = "http://trade.api.gzwing.cn/"; //测试环境
const baseUrl = "http://trade.api.topsgd.cn/"; //外网正式环境
// const baseUrl = "http://tradesysapi/"; //内网开发环境

// const workSysUrl = "http://localhost:8082/"; //测试工单系统
const workSysUrl = "http://work.sys.topsgd.cn/"; //工单系统

// const spareSysUrl = "http://localhost:8083/"; //测试备件系统
const spareSysUrl = "http://spare.sys.topsgd.cn/"; //备件系统

// const assetSysUrl = "http://localhost:8084/"; //测试资产管理系统
const assetSysUrl = "http://asset.sys.topsgd.cn/"; //资产管理系统

const pushUrl = "ws://trade.push.gzwing.cn:2141/"; //测试推送地址
// const pushUrl = "ws://trade.push.topsgd.cn:2141/"; //正式推送地址

const platformName = "拓普思";

//一页多少条数据
const pageNum = 8;

//渠道ID:1,官方
const channelID = 1;

//来源:0,无;1,官网pc;2,官网移动端;3,app;4,小程序;5,公众号;
const sourceFlag = 1;

//是否加密:1是;0否
const cryptFlag = 1;

//日志输出:1,开启;0,关闭
const logFlag = 1;

//线上不显示模块:1,是;0,否
const onlineFlag = 0;

//加密密钥
const encryptKey = "4IWZL*J33W*UVDY)X9XAYLRNG7J";

export {
    ssoUrl,
    baseUrl,
    pushUrl,
    workSysUrl,
    spareSysUrl,
    assetSysUrl,
    platformName,
    pageNum,
    encryptKey,
    cryptFlag,
    sourceFlag,
    channelID,
    logFlag,
    onlineFlag
};