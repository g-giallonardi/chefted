import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatar from '@/assets/images/avatar.jpg'
import {NavLink} from "react-router-dom";

function ProfileMenu(){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='ml-8 mr-5' >
                    <AvatarImage src={avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Guillaume</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <NavLink className='flex flex-row justify-center' to={'/login'}>
                        Mon compte
                    </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <NavLink className='flex flex-row justify-center' to={'/login'}>
                        Déconnexion
                    </NavLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileMenu