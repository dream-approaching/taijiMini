// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
const CloudBase = require('@cloudbase/manager-node')
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV,
})

const { storage } = new CloudBase({
    // secretId: 'Your SecretId',
    // secretKey: 'Your SecretKey',
    envId: 'dev-vza4u', // 云开发环境ID，可在腾讯云云开发控制台获取
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = async (event, context) => {
    const { path } = event
    const wxContext = cloud.getWXContext()

    const fileListRes = await storage.listDirectoryFiles(path)

    return {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        env: wxContext.ENV,
        fileList: fileListRes,
    }
}
