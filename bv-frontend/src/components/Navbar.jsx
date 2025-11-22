import { useState, useEffect } from "react";
import { getProvider, getSigner } from "../lib/ethers";

export default function Navbar() {
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);

  async function connectWallet() {
   try {
    const signer = await getSigner();
    const addr = await signer.getAddress();
    setAddress(addr);

    const provider = getProvider();
    const network = await provider.getNetwork();
    const chain = network.chainId.toString();
    setChainId(chain);

    // ✅ Network Check (Sepolia = 11155111)
    if (chain !== "11155111") {
      alert("Please switch your MetaMask network to Sepolia Test Network!");
    }

    setError(null);
  } catch (e) {
    setError(e.message);
  }
}

  // Auto-update when user switches account or network
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", connectWallet);
      window.ethereum.on("chainChanged", connectWallet);
    }
  }, []);

  return (
    <nav
      style={{
        padding: "10px 20px",
        background: "#f8f9fa",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>🗳️ Blockchain Voting</h2>

      <div>
        {!address ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span>
              ✅ Connected:{" "}
              {address.slice(0, 6)}…{address.slice(-4)}
            </span>
            <span style={{ fontSize: "0.8em", color: "#555" }}>
              Chain ID: {chainId}
            </span>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </nav>
  );
}
