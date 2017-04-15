module.exports = {
    connect: (MongoClient, url, cb) => {
        MongoClient.connect(url, (err, database) => {
            if (err) console.error(`Unable to connect MLab. ${err}`)
            cb(database)
        })
    }
}