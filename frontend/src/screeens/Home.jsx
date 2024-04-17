import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
export const Home = () => {

    // const [product, setProducts] = useState([])
    // useEffect(() => {
    //     const getProducts = async () => {
    //         const { data } = await axios.get('/products')
    //         console.log(data)
    //         setProducts(data)
    //     }
    //     getProducts()

    // }, [])

    const { data: products, isLoading, isError } = useGetProductsQuery()
    return (

        <>
            {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>Something Went Wrong</Message>) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {products.map(item => {
                            return (
                                <Col key={item._id} sm={12} md={6} lg={4} xl={3}>

                                    <Product product={item} />

                                </Col>
                            )

                        })}
                    </Row>
                </>
            )}

        </>
    )
}
