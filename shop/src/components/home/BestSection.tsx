import React from 'react'
import ProductSwiper from '../ProductSwiper'
import { BestSectionProducts, regularBreakPoints } from '@/data'

export default function BestSection() {
    return (
        <div>
            <ProductSwiper mainTitle='Best of Air Max' shopLink='/' shopTitle='Shop' products={ BestSectionProducts } breakPoints={ regularBreakPoints } />
        </div>
    )
}
