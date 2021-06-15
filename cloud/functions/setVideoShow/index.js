const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()
const videoShow = db.collection('videoShow')

exports.main = async (event, context) => {
    const { needShow } = event
    const res = await videoShow.doc('28ee4e3e60be0e5b20878c8549c48ddb').update({
        data: {
            videoShow: needShow,
        },
    })
    return res
}
