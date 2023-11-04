import { CacheRepository } from "@src/frameworks/databases/redis/cache-repository";

export const cacheRepositoryInterface = (repository: ReturnType<CacheRepository>) => {

    const setCache = ({
        key,
        expireTimeSec,
        data
    }: {
        key: string;
        expireTimeSec: number;
        data: string;
    }) => repository.setCache({ key, expireTimeSec, data })

    const getCache = (key:string) => repository.getCache(key)

    const clearCache = (key: string) => repository.clearCache(key)


    return {
        setCache,
        getCache,
        clearCache
    }

}

export type CacheRepositoryInterface = typeof cacheRepositoryInterface