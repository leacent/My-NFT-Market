import AccounHeader from '@/components/AccounHeader';
import MyNFT from '@/components/MyNFT';
import NFTList from '@/components/NFTList';
import SignButton from '@/components/SignButton';

export default function Home () {
  return (
    <div className='app'>
      <AccounHeader></AccounHeader>
      <MyNFT></MyNFT>
      <NFTList></NFTList>
      <SignButton></SignButton>
    </div>
  )
}
