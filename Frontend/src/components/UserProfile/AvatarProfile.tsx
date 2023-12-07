import { Avatar } from '@chakra-ui/react'
// import { API } from '../../libs/Api'
// import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/type/RootState';


interface AvatarProfile {
    full_name: string,
    photo_profile: string
}

export default function AvatarProfile() {
    // const [data, setData] = useState<AvatarProfile>();
    const auth = useSelector((state: RootState) => state.auth);
    const authFullName = auth.full_name;
    const authProfile = auth.photo_profile;

    // async function getPhotoProfile() {
    //     try {
    //         const response = await API.get('/auth/check');
    //         setData(response.data.user);
    //         console.log(localStorage)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    // useEffect(() => {
    //     getPhotoProfile();
    // }, []);



    return (
        <Avatar
            boxSize='50px'
            name={authFullName || "Unknown User"}
            background={'purple'}
            src={authProfile || "null"}
        />
    )
}