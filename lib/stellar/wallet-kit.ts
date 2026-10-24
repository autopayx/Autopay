import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit"
import { Networks } from "@creit.tech/stellar-wallets-kit/types"
import { FreighterModule } from "@creit.tech/stellar-wallets-kit/modules/freighter"
import { xBullModule } from "@creit.tech/stellar-wallets-kit/modules/xbull"
import { AlbedoModule } from "@creit.tech/stellar-wallets-kit/modules/albedo"
import { LobstrModule } from "@creit.tech/stellar-wallets-kit/modules/lobstr"

let initialized = false

// only the wallets this app supports: importing specific modules (not defaultModules()) keeps
// unused wallet SDKs (Ledger, Trezor, WalletConnect, MetaMask) out of the client bundle
function ensureWalletKit() {
  if (initialized) return
  StellarWalletsKit.init({
    modules: [new FreighterModule(), new xBullModule(), new AlbedoModule(), new LobstrModule()],
    network: Networks.TESTNET,
  })
  initialized = true
}

async function listSupportedWallets() {
  ensureWalletKit()
  return StellarWalletsKit.refreshSupportedWallets()
}

// selects the wallet module and fetches the address directly from it
async function connectWallet(walletId: string): Promise<string> {
  ensureWalletKit()
  StellarWalletsKit.setWallet(walletId)
  const { address } = await StellarWalletsKit.fetchAddress()
  return address
}

async function disconnectWallet() {
  ensureWalletKit()
  await StellarWalletsKit.disconnect()
}

function truncateAddress(address: string) {
  return address.length > 10 ? `${address.slice(0, 4)}...${address.slice(-4)}` : address
}

export { ensureWalletKit, listSupportedWallets, connectWallet, disconnectWallet, truncateAddress }
