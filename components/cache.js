import LRUCache from 'lru-cache';
import fetch from 'node-fetch'


const cache = new LRUCache({
    max: 100,
    maxAge: 1000 * 30 //0.5 minute
});


const ssrCache = async (req, res, url) => {

    if(!cache.has(url)){
        
        const response = await fetch(url);
        const data = await response.json();

        if(!"data" in data){
            res.setHeader('x-cache', 'SKIP');
            return data;
        }

        res.setHeader('x-cache', 'MISS');
        cache.set(url, data)
        return data;
    }else{
        res.setHeader('x-cache', 'HIT');
        return cache.get(url)
    }
}

export default ssrCache
