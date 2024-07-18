'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { getOneProductById } from "src/data/data";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await getOneProductById(id);
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Brand: {product.brand.name}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}