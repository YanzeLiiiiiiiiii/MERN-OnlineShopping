import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'


const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            const data = await axios.get(`/products/${id}`)

            setProducts(data.data)
        }
        getProducts()

    }, [id])


    return (
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
                            <ListGroup.Item>
                                <Button
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
    )
}

export default ProductDetail