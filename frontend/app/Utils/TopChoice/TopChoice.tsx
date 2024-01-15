import React from 'react'
import ItemBox from '../ItemBox/ItemBox'

export default function TopChoice() {
    return (
        <div className='w-full flex flex-col items-center gap-[20px] my-[30px]'>
            <div className='text-3xl md:text-5xl font-bold'>
                Top Choices
            </div>

            <div className='w-full flex flex-wrap justify-evenly'>
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    isSale={true}
                    rating={4}
                    url='https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    url='https://static.wixstatic.com/media/84770f_93e10a5b8f154b1b993cfb0f4df193eb~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_93e10a5b8f154b1b993cfb0f4df193eb~mv2.jpg'
                    rating={4} />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    url='https://static.wixstatic.com/media/84770f_3cf0de513f3e4c03a3be0896bb0c0f11~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_3cf0de513f3e4c03a3be0896bb0c0f11~mv2.jpg'
                    rating={4} />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    url='https://static.wixstatic.com/media/84770f_6264810d5d5149f5843345861de980dc~mv2_d_1920_1920_s_2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_6264810d5d5149f5843345861de980dc~mv2_d_1920_1920_s_2.jpg'
                    rating={4} />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    url='https://static.wixstatic.com/media/84770f_ba4f8df71337480a8f1efceb81fba56c~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_ba4f8df71337480a8f1efceb81fba56c~mv2.jpg'
                    rating={4} />
            </div>
        </div>
    )
}
