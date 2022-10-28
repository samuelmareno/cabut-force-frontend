import React from "react";

export const items = [
    {
        title: 'Home',
        links: [
            {
                name: 'Home'
            }
        ]
    },
    {
        title: 'Dashboard',
        links: [
            {
                name: 'Dashboard'
            }
        ]
    },
    {
        title: 'Sales',
        links: [
            {
                name: 'Pipeline'
            },
            {
                name: 'DSAR'
            },
            {
                name: 'Hot Prospect'
            },
            {
                name: 'Report'
            },
        ]
    },
    {
        title: 'Setelan',
        links: [
            {
                name: 'Ubah Password'
            },
        ]
    },
]

export function MenuItems(selectedMenu, handleClick) {
    return (
        items.map((item, index) =>
            <li key={index}
                onClick={() => handleClick(item.title)}
            ><a href={item.url}
                className={`flex items-center w-full justify-start p-4 px-8 ${selectedMenu === item.title ?
                    "bg-white text-primary-600" : "hover:bg-primary-700 text-white bg-primary-600"} cursor-pointer`}
            >{item.title}</a>
            </li>
        )
    );
}