import "./App.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Module from "./components/Module";
import ERC20 from "./ChiosERC20.json";
import NFT from "./ChiosNFT.json";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [erc20, setErc20] = useState(null);
  const [nft, setNft] = useState(null);

  useEffect(() => {
    async function tmp() {
      await init();
      setIsLoading(false);
    }
    tmp();
  }, []);

  async function init() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.eth_requestAccounts;
    } else if (window.web3) {
      window.web3 = new Web3(window.ethereum);
    } else {
      window.alert(
        "Non-Ethereum browser detected. you should consider trying Metamask!"
      );
    }
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const ethBalance = await web3.eth.getBalance(
      web3.utils.toChecksumAddress(accounts[0])
    );
    setBalance(ethBalance);

    const erc20Contract = new web3.eth.Contract(
      ERC20.abi,
      "0x66ECEB9C63cB99d0b1998AA3eACDcae24DCc7E5F"
    );
    setErc20(erc20Contract);
    const erc721Contract = new web3.eth.Contract(
      NFT.abi,
      "0x489A2255154674c1dF87Fde72e4d2489075464D4"
    );
    setNft(erc721Contract);
  }

  return (
    <Container>
      <Header account={account} balance={balance} />
      <div style={{ marginTop: "100px" }}>
        {isLoading ? (
          <div></div>
        ) : (
          <div>
            <Row>
              <Module
                name="ERC721 Token"
                contract={nft}
                account={account}
              />
            </Row>
            <Row>
              <Module
                name="ERC20 Token"
                contract={erc20}
                account={account}
              />
            </Row>
          </div>
        )}
      </div>
    </Container>
  );
}

