import { useEffect } from 'react'

export const useOnClickOutside = (ref, handler) => {
    useEffect(() =>  {

        const listener = (e) => {
            console.log('ref current', ref.current);
            if(!ref.current || ref.current.contains(e.target)){
                return ;
            }
            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
        }
    }, []);

    return useOnClickOutside;
};
