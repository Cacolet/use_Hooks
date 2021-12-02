import {useEffect, useCallback, useRef} from "react";

interface throttle {
    fn:any,
    timer:NodeJS.Timeout | null
}
function useThrottle(fn:any, delay:number, dep : any[]) {

    const { current } = useRef<throttle>({ fn, timer: null }); //useRef 保证数据的唯一性
    useEffect(function () {
        current.fn = fn;
    }, [fn]);

    return useCallback(function f(...args) {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer;
            }, delay);
            current.fn(...args);
        }
    }, dep);
}

export default useThrottle;
