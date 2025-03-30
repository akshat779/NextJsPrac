/* eslint-disable @next/next/no-img-element */

import React from "react";

type Props = {
    image:string,
    alt?:string,
}

const Avatar:React.FC<Props> = ({image,alt}) => {
    return(
        <div className="rounded-full overflow-hidden w-full pt-[100%] relative">
            <div className="absolute inset-0">
                <img src={image} alt={alt || image} />
            </div>
        </div>
    )
}

export default Avatar;