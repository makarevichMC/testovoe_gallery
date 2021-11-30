
export type ImgInfo = {
    src:string
    alt:string
}

export const images = new Array(30).fill(null)

    .map((image, number)=>{

        const name = number > 8 ? `${number+1}-min` : `0${number+1}-min`

        return {
            src: process.env.PUBLIC_URL + `/images/min/${name}.jpg`,
            alt:name
        }

    })