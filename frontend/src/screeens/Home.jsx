import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import PaginationComponent from '../components/Pagination'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import TopProducts from '../components/TopProducts'
import Meta from '../components/Meta'
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
    const { pageNumber } = useParams()

    const { data, isLoading, isError } = useGetProductsQuery({ pageNumber })

    return (

        <>
            <TopProducts />
            {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>Something Went Wrong</Message>) : (
                <>
                    <Meta title='Onlineshopping-ryan' />
                    <h1>Latest Products</h1>
                    <Row>
                        {data.products.map(item => {
                            return (
                                <Col key={item._id} sm={12} md={6} lg={4} xl={3}>

                                    <Product product={item} />

                                </Col>
                            )

                        })}
                    </Row>
                    <PaginationComponent pages={data.pages} page={data.page} />
                </>
            )}

        </>
    )
}
