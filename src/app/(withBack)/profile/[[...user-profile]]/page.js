import { UserProfile } from '@clerk/nextjs'
import '@/app/authStyle.css'

const UserProfilePage = () => 
<div className='flex justify-center items-center'>
    <UserProfile path="/profile" />
</div>

export default UserProfilePage