import { useEffect, useRef } from 'react';

// Custom hook for not calling input function after initial rendering.
const useDidUpdateEffect = (func: () => void, dependencies: string[]) => {
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
          } else {
              func();
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}

export default useDidUpdateEffect;