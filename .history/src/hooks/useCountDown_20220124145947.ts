import React, { FC, useEffect, useState } from 'react';

/**
 * 倒计时组件
 * @param timestr
 * @returns 
 */
let timerId: any = null
const useCountDown = (t: number) => {
    let [time, setTime] = useState<number>(t)
    useEffect(() => {
        timerId = setTimeout(() => {
            setTime(time - 1)
            if (time === 0) {
                clearTimeout(timerId)
            }
        }, 1000)
        return () => clearTimeout(timerId)
    }, [time])

    return [time]
};

export default useCountDown;
