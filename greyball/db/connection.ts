import mongoose from "mongoose"
const connection = async () => {
    const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/store'
    await mongoose.connect(MONGO_URL).then(() => {
        console.log('DB is running correctly')
    }).catch((err) => {
        console.log(err)
    });
}

export default connection