import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import FormSkeleton from '../components/FormSkeleton'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const q = searchParams.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(q)
        }
    }, [userInfo, q, navigate])


    const submitHandle = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials(res))
            navigate(q)
        } catch (error) {
            toast.error('Something Went Wrong')
        }

    }
    return (
        <FormSkeleton>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandle}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type='submit' variant='primary' >
                    Sign In
                </Button>

                {isLoading && <Loader />}


            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?{'  '}
                    <Link to={q ? `/register?redirect=${q}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormSkeleton>
    )

}
export default Login