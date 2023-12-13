const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})

exports.main = async () => {
    return {
        version: '2.2.4',
        versionTips: '1、新增关于我 2、新增83式：庇身锤、青龙出水、双推掌、三换掌、肘底捶、倒卷肱、退步压肘  2023.12.13',
    }
}
