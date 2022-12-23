## 安装
![](assets/MongoDB.assets/image-20220110102027574.png)
## Node连接mongoDB

```js
const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('test')
        const movies = database.collection('movies')
        await client.close()
    } finally {
        await client.close()
    }

}
run().catch(console.dir)
```

## Node增删改查

#### 1. find

collection.findOne()

collection.find()

```js
// import { MongoClient } from 'mongodb'
const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('test')
        const movies = database.collection('movies')
        // findOne
        // const movie =  await movies.findOne({})
        // console.log(movie)

        // find
        const query = { year: { $lt: 1999 } }
        const movie =  await movies.find(query, {
            sort: {year: -1},
            projection: { _id: 0, title: 1, year: 1 }
        })
        await movie.forEach(item => {
            console.log(item)
        })
        await client.close()
    } finally {
        await client.close()
    }

}
run().catch(console.dir)
```

#### 2. insert

```js
const { MongoClient }  = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const db = client.db('insertDB')
        const haiku = db.collection('haiku')

        // insertOne

        // const doc = {
        //     title: 'Record of a Shriveled Datum',
        //     content: "No bytes, no problem. Just insert a document, in MongoDB"
        // }

        // const result =  await haiku.insertOne(doc)
        // 返回值 result.insertedId  result.acknowledged
        // console.log(`插入成功 ${result}, ${result.insertedId} , ${result.acknowledged}`)

        // insertMany
        const docs = [
            { name: "cake", healthy: false },
            { name: "lettuce", healthy: true },
            { name: "donut", healthy: false }
        ]
        const options = { ordered: true }
        const result = await haiku.insertMany(docs, options)
        console.log(result.insertedCount, result.insertedIds, result.acknowledged)
    }finally {
        await client.close()
    }
}
run().catch(console.dir)
```

#### 3. update

```js
const { MongoClient }  = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('insertDB')
        const movies = database.collection('haiku')
        // updateOne
        // const filter = { name: 'cake' }
        // const options = { upsert: true }
        // const updateDoc = {
        //     $set: {
        //         content: 'updated',
        //         healthy: true
        //     }
        // }
        // const result = await movies.updateOne(filter, updateDoc, options)
        // console.log('result.matchedCount', result.matchedCount)
        // console.log('result.modifiedCount', result.modifiedCount)
        // console.log('result.upsertedCount', result.upsertedCount)
        // console.log('result.upsertedId', result.upsertedId)

        // updateMany
        const filter = {healthy: true}
        const updateDoc = {
            $set: {
                random_review: `update result：${Math.random()}`
            }
        }
        const result = await movies.updateMany(filter, updateDoc)
        console.log('result.modifiedCount', result.modifiedCount)
    }finally {
        await client.close()
    }
}
run().catch(console.dir)
```

#### 4. replace

```js
const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('test')
        const movies = database.collection('movies')
        // replaceOne
        const query = { title: { $regex: 'Titanic' } }
        const replacement = {
            title: `replacement title: ${Math.random() * 10}`
        }

        const result = await movies.replaceOne(query, replacement)
        console.log('result.modifiedCount', result.modifiedCount)
        await client.close()
    } finally {
        await client.close()
    }

}
run().catch(console.dir)
```

#### 5. delete

```js
const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('test')
        const movies = database.collection('movies')
        // deleteOne
        // const result = await movies.deleteOne({ title: 'replacement title: 2.578823792349114' })
        // console.log('result.deletedCount', result.deletedCount)
        // deleteMany
        const result = await movies.deleteMany({ languages: 'English' })
        console.log('result.deletedCount', result.deletedCount)
        await client.close()
    } finally {
        await client.close()
    }

}
run().catch(console.dir)
```

#### 6. count

```js
const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('insertDB')
        const haiku = database.collection('haiku')
        // const estimate = await haiku.estimatedDocumentCount()
        // console.log(`count is ${estimate}`)

        const count = await haiku.countDocuments({healthy: true})
        console.log(`healthy count is ${count}`)
        await client.close()
    } finally {
        await client.close()
    }

}
run().catch(console.dir)
```

#### 7. distinct 去重

```js
const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)

const run = async () => {
    try {
        await client.connect()
        const database = client.db('test')
        const movies = database.collection('movies')

        const fieldName = 'year'
        const query = { directors: 'James Cameron' }
        const distinctValues = await movies.distinct(fieldName, query)
        console.log(distinctValues)

        await client.close()
    } finally {
        await client.close()
    }

}
run().catch(console.dir)
```

