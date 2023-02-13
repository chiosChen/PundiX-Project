import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { ethers } from "ethers";
import "./module.css"

export default function Module({
  name,
  contract,
  account
}) {

  const [totalSupply, setTotalSupply] = useState(0);
  const [numToBurn, setNumToBurn] = useState();
  const [numToMint, steNumToMint] = useState();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    getTotalSupply();
  }, []);

  const getTotalSupply = () => {
    contract.methods.totalSupply().call((err, res) => {
      if (err) {
        alert(err.message);
      }
      setTotalSupply(res);
    });
  }

  const getState = () => {
    contract.methods.paused().call((err, res) => {
      if (err) {
        alert(err.message);
      }
      setPaused(res);
    })
  }


  const handleSafeMint = () => {
    contract.methods
      .safeMint()
      .send({ from: account }, (err) => {
        if (err) {
          alert(err.message);
        }
      })
      .once("receipt", () => {
        getTotalSupply();
      });
  }

  const handleMint = () => {
    contract.methods
      .mint(numToMint)
      .send({ from: account }, (err) => {
        if (err) {
          alert(err.message);
        }
      })
      .once("receipt", () => {
        getTotalSupply();
      });
  }


  const handleBurn = () => {
    contract.methods
      .burn(ethers.BigNumber.from(numToBurn))
      .send({ from: account }, (err) => {
        if (err) {
          alert(err.message);
        }
      })
      .once("receipt", () => {
        getTotalSupply();
      });
  }

  const handlePause = () => {
    contract.methods.pause().send({ from: account }, err => {
      alert(err.message)
    }).once("receipt", () => {
      getState();
    })
  }
  const handleUnPause = () => {
    contract.methods.unpause().send({ from: account }, err => {
      alert(err.message);
    }).once("receipt", () => {
      getState()
    })
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Total supply: {totalSupply}
        </Card.Subtitle>
        <Card.Text>
          {`Chios' ${name}`}
        </Card.Text>
        <Row className="row">
          <Col className="col">
            <Button
              size="sm"
              variant="success"
              onClick={name === "ERC721 Token" ? handleSafeMint : handleMint}
            >
              Mint
            </Button>
          </Col>
          {name === "ERC721 Token" ?
            <Col></Col> :
            <Col>
              <Form>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Amount"
                  onChange={(e) => {
                    steNumToMint(e.target.value);
                  }}
                  required
                />
              </Form>
            </Col>

          }
        </Row>
        <Row className="row">
          <Col className="col">
            <Button size="sm" variant="danger" onClick={handleBurn}>
              Burn
            </Button>
          </Col>
          <Col>
            <Form>
              <Form.Control
                size="sm"
                type="number"
                placeholder={name === "ERC721 Token" ? "Index" : "Amount"}
                onChange={(e) => {
                  setNumToBurn(e.target.value);
                }}
              />
            </Form>
          </Col>
        </Row>
        {name === "ERC721 Token" ?
          <Row>
            <Col>
              <Button size="sm" onClick={paused ? handleUnPause : handlePause}>
                {paused ? "Unpause" : "Pause"}
              </Button>
            </Col>
          </Row> : <></>
        }
      </Card.Body>
    </Card>
  );
}
