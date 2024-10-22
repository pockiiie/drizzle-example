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

  const iconClass = 'w-4 h-4 mr-2'
  return (
    <div>
      <ul>
        {
          links.map((link) => {
            return (
              <li>
                <Link className="flex items-center hover:bg-gray-700 p-2 rounded"
                  href={link.link}>
                  {
                    link.icon == 'HomeIcon' && <HomeIcon className={iconClass} />
                  }
                  {
                    link.icon == 'UserIcon' && <UserIcon className={iconClass} />
                  }
                  <span className="flex"> {link.name}</span>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}