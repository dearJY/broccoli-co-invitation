import { useEffect, useRef } from 'react';

const useDidUpdateEffect = (func: () => void, dependencies: Array<any>) => {
    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
          } else {
              func();
          }
    }, dependencies);
}

export default useDidUpdateEffect;