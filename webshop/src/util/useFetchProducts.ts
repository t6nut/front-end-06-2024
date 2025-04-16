import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { database } from '../firebase/firebaseInit';
import { ref, get } from 'firebase/database';

function useFetchProducts() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsDefault, setProductsDefault] = useState<Product[]>([]);
		const url = process.env.REACT_APP_PRODUCTS_DB_URL; // URL for the database

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRef = ref(database, 'products'); // Replace 'products' with your database path
                const snapshot = await get(productsRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setProducts(data || []);
                    setProductsDefault(data || []);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, productsDefault, loading, setProducts, url };
}

export default useFetchProducts;