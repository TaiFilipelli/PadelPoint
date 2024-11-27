import React from 'react'
import ProductsCard from './ProductsCard'

export default function MainProducts({products}) {
  return (
    <div className="flex flex-row max-[940px]:flex-wrap justify-center gap-2 w-full mt-8 max-[555px]:mt-4 mb-10 animate-appear">
        {products.length === 0 ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ProductsCard key={index} isLoading={true} />
          ))
        ) : (
          products.map(product => (
            <ProductsCard 
              key={product.id} 
              name={product.name} 
              image={product.image} 
              brand={product.brand.name} 
              price={product.price}
              idProducto={product.id}
              isLoading={false}
            />
          ))
        )}
      </div>
  )
}