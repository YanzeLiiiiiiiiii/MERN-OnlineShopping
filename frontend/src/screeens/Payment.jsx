import { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormSkeleton from '../components/FormSkeleton'
import CheckoutProcess from '../components/CheckoutProcess'
import { addPaymentMethod } from '../slices/cartSlice'
const Payment = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { shippingAddress } = useSelector((state) => state.cart)


    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [navigate, shippingAddress])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addPaymentMethod(paymentMethod))
        navigate('/placeorder')
    };
    return (
        <FormSkeleton>
            <CheckoutProcess step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            className='my-2'
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormSkeleton>
    )
}

export default Payment