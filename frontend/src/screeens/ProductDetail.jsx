import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'


const ProductDetail = () => {
    const { id } = useParams()
    // const [product, setProducts] = useState([])
    // useEffect(() => {
    //     const getProducts = async () => {
    //         const data = await axios.get(`/products/${id}`)

    //         setProducts(data.data)
    //     }
    //     getProducts()

    // }, [id])
    const dispatch = useDispatch()
    const nevigate = useNavigate()

    const { data: product, isLoading, isError } = useGetProductDetailsQuery(id)


    const [qty, setQty] = useState(1)

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        nevigate('/cart')
    }



    return (
        <>
            {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>Something Went Wrong</Message>) : (
                <>
                    <Link className='btn btn-light my-3' to='/'>
                        Back
                    </Link>

                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid></Image>

                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3> {product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3> Price: ${product.price}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>

                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price</Col>
                                            <Col> ${product.price}</Col>
                                        </Row>

                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status</Col>
                                            <Col> {product.countInStock ? 'In Stock' : 'Out Of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={e => setQty(Number(e.target.value))}
                                                    >

                                                        {[...Array(product.countInStock).keys()].map(item => {
                                                            return (
                                                                <option key={item + 1} value={item + 1}>{item + 1}</option>
                                                            )
                                                        })}
                                                    </Form.Control>

                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>

                                </ListGroup>

                            </Card>
                        </Col>

                    </Row>
                </>
            )}

        </>

    )
}

export default ProductDetail