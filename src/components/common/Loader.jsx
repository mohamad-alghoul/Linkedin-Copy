
import { Spin,Space } from 'antd';

export const Loader = () => {
  return (
    <div className='loader-spin'>
    <Space size="middle" >
    <p className='loader-text'>Loading....</p>
     <Spin size="large" />
    </Space>
    </div>
  )
}



