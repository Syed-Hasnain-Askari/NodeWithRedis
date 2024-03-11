const { json } = require('body-parser');
const Redis = require('ioredis');


const redisClient = new Redis({
    host: 'redis',
    port: 6379
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

class RedisWrapper {
    getPosts = async () => {
        return new Promise((resolve, reject) => {
            redisClient.get('post', (err, reply) => {
                if (err) {
                    console.error('Error:', err);
                    reject(err);
                } else {
                    console.log('Retrieved JSON data from Redis:', reply);
                    resolve(reply);
                }
            });
        });
    }
    addPost = async (key, value) => {
        console.log(key, value, "key ,value");
        try {
            return await redisClient.set(key,JSON.stringify(value)); // Stringify the data before storing in Redis
        } catch (error) {
            throw new Error("addkey redis error", error);
        }
    }
    setExpiry = async (key,time)=>{
        try{
            return await redisClient.expire(key,time)
        }catch(error){
            throw new Error(" expiry redis error" ,error)
        }
    }

    
}
module.exports = new RedisWrapper();