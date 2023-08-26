import React, { useState } from 'react'

const QuantityButtons = ({ quantities }) => {

  const [quantity, setQuantity] = useState(quantities)

  const decrementQuantity = () => {
    if (quantity === 1) return
    return setQuantity(quantity => quantity - 1)
  }

  const incrementQuantity = () => {
    return setQuantity(quantity => quantity + 1)
  }

  return (
    <>
      <button onClick={(e) => decrementQuantity()}>-</button>
      <button>{quantity}</button>
      <button onClick={(e) => incrementQuantity()}>+</button>
    </>
  )
}

export default QuantityButtons