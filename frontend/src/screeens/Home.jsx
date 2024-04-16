import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
export const Home = () => {
    const [product, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get('/products')
            console.log(data)
            setProducts(data)
        }
        getProducts()

    }, [])

    return (
        <>

            <h1>Latest Products</h1>
            <Row>
                {product.map(item => {
                    return (
                        <Col key={item._id} sm={12} md={6} lg={4} xl={3}>

                            <Product product={item} />

                        </Col>
                    )

                })}
            </Row>
        </>
    )
}
