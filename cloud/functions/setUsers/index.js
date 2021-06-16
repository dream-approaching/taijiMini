const cloud = require('wx-server-sdk')
const dayjs = require('dayjs')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()
const users = db.collection('users')

const _ = db.command
// 视频的状态
const STATUS = { show: 1, hide: 2 }
exports.main = async (event, context) => {
    const { userInfo, updateObj, type } = event
    let { OPENID = userInfo.openId, UNIONID } = await cloud.getWXContext()
    // 先查询用户是否存在
    const filterList = await users
        .where({
            openId: OPENID || userInfo.openId,
        })
        .get()
    console.log('%cfilterList:', 'color: #0e93e0;background: #aaefe5;', filterList)
    let res
    if (!filterList.data.length) {
        const newRecordData = {
            ...userInfo.userInfo,
            cloudID: userInfo.cloudID,
            encryptedData: userInfo.encryptedData,
            signature: userInfo.signature,
            openId: OPENID,
            unionId: UNIONID,
            createTime: dayjs().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            updateTime: dayjs().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            lastLogin: dayjs().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            left: 10, // 默认允许10次下载，否则弹出赞赏提示
            ...updateObj,
        }
        res = await users.add({
            data: newRecordData,
        })
    } else {
        const record = filterList.data[0]
        const datas = {
            ...updateObj,
            updateTime: dayjs().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        }

        res = await users.doc(record._id).update({ data: datas })
    }
    return res
}
