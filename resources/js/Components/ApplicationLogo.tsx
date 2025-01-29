import {ImgHTMLAttributes} from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            className="h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]"
            viewBox="0 0 62 65"
            fill="none"
            src={"https://cdn-icons-png.flaticon.com/512/7118/7118499.png"}
            alt={"icon"}
        />
    );
}
