import { useQuery } from '@tanstack/react-query'
import {useState, useEffect} from 'react'

import {api} from '../services/api'

const useProducts = () => {
    const [products, setProducts] = useState([])
    const {data, isError, isLoading} = useQuery(['product-list'], api.getProducts)
    return [data];
}

export default useProducts;
