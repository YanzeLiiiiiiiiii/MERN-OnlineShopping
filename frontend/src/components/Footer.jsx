import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
export const Footer = () => {
    const currentY = new Date().getFullYear()

    return (
        <>
            <footer>
                <Container>
                    <Row>
                        <Col className='text-center py-3'>
                            <p>Online Shopping &copy;{currentY}</p>

                        </Col>

                    </Row>
                </Container>


            </footer>
        </>
    )
}
