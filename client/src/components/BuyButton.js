import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'

const BuyButton = () => {

    const [buy, setBuy] = useState(false)

    const handleBuy = () => {
        toast.success('Item Purchased!')
        setBuy(true)
    }

    return (
        <>
            {
                buy ? 
                <Button primary disabled>Purchased</Button>
                :
                <Button primary onClick={handleBuy}>Purchase</Button>
            }
            <ToastContainer/>
        </>
    )
}

export default BuyButton
