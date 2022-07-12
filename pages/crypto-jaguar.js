import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import StorageHeader from "../components/StorageHeader"



import {
    ultrajaguaraddress, ultrajaguarCloudaddress
} from '../config'

import ULTRAJAGUAR from '../artifacts/contracts/ULTRAJAGUAR.sol/ULTRAJAGUAR.json'
import ULTRAJAGUARCloud from '../artifacts/contracts/ULTRAJAGUARCloud.sol/ULTRAJAGUARCloud.json'

export default function CreatorDashboard() {
    const [nfts, setNfts] = useState([])
    const [sold, setSold] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
      loadNFTs()
    }, [])
    async function loadNFTs() {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
      })
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
        
      const marketContract = new ethers.Contract(ultrajaguarCloudaddress, ULTRAJAGUARCloud.abi, signer)
      const tokenContract = new ethers.Contract(ultrajaguaraddress, ULTRAJAGUAR.abi, provider)
      const data = await marketContract.fetchItemsCreated()
      
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let item = {
          name: meta.data.name,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
        }
        return item
      }))
      /* create a filtered array of items that have been sold */
      const soldItems = items.filter(i => i.sold)
      setSold(soldItems)
      setNfts(items.concat().reverse())
      setLoadingState('loaded') 
    }
    if (loadingState === 'loaded' && !nfts.length) return (<StorageHeader/>)
    return (
      <div>
        <div className="p-4">
          <StorageHeader/>
          </div>
          <div>
          <div className="px-4 flex justify-center" style={{ maxWidth: '4000px', maxHeight: '4000px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 pt-5 flex items-end">
           {
              nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">               
                <img src={nft.image} onclick="(()=>window.open(this.getAttribute('href'),'_blank'))()" onerror="if (this.src != 'error.jpg') this.src = 'error.jpg';" alt="NO IMAGE" width="350" height="250"/>
                <div className="p-4">
                <p style={{ height: '32px' }} className="text-2xl font-semibold">{nft.name}</p>
                </div>
              </div>
              ))
            }
          </div>
          </div>
      </div>
      </div>
    )
  }

  // export async function getServerSideProps({ req }) {
  //   const { user } = await supabase.auth.api.getUserByCookie(req)
  
  //   if (!user) {
  //     return { props: {}, redirect: { destination: '/sign-in' } }
  //   }
  
  //   return { props: { user } }
  // }
// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req)

//   if (!user) {
//     return { props: {}, redirect: { destination: '/sign-in' } }
//   }

//   return { props: { user } }
// }