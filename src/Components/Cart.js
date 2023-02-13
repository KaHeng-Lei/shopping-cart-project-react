import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating.js";

// this is for the '/cart' page
const Cart = () => {
  const { state, dispatch } = CartState();

  const [total, setTotal] = useState();

  // use reduce to calculate the total
  // call this useEffect everytime the state.cart is changed
  useEffect(() => {
    setTotal(
      state.cart.reduce(
        (accum, prod) => accum + Number(prod.price) * prod.qty,
        0
      )
    );
  }, [state.cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {state.cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid thumbnail />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>${prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={prod.qty}
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: { id: prod.id, qty: e.target.value },
                      });
                    }}
                  >
                    {[...Array(prod.inStock)].map((x, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({state.cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${total}</span>
        <Button type="button" disabled={state.cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
