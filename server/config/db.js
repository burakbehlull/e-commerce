import mongoose from 'mongoose'

export default function db(){
    const conn = mongoose.connect(process.env.MONGO_URI).then(()=> {
        console.log('Veritabanına bağlandı.')
    }).catch((err)=>{
        console.error("Veritabanı hatası: ", err)
    })
    return conn
}