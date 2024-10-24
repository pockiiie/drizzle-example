import { SideNavMenu } from "../lib/definitions"
import { UserIcon, HomeIcon } from "@heroicons/react/16/solid"
import Link from "next/link"

export default function SideNav() {
  const links: SideNavMenu[] = [
    {
      name: 'Home',
      link: '/',
      icon: 'HomeIcon'
    },
    {
      name: 'Users',
      link: '/users',
      icon: 'UserIcon'
    },

  ]

  const iconClass = 'w-4 h-4 m-0 lg:mr-2'
  return (
    <div>
      <ul>
        {
          links.map((link, index) => {
            return (
              <li key={index}>
                <Link className="flex justify-center lg:justify-normal hover:bg-gray-700 p-2 rounded"
                  href={link.link}>
                  {
                    link.icon == 'HomeIcon' && <HomeIcon className={iconClass} />
                  }
                  {
                    link.icon == 'UserIcon' && <UserIcon className={iconClass} />
                  }
                  <span className="hidden lg:flex"> {link.name}</span>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}