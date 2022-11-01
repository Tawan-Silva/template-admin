import Link from "next/link";
import { MenuItemProps } from "../../model/menuItemProps";

export default function MenuItem(props: MenuItemProps) {
  function redenrizarLink() {
    return (
      <span
        className={`
            flex flex-col justify-center items-center
            h-20 w-20 text-gray-600 
            dark:text-gray-400
            ${props.className}
            `}
      >
        {props.icone}
        <span className={`text-xs font-light`}>{props.texto}</span>
      </span>
    );
  }

  return (
    <li
      onClick={props.onClick}
      className={`
            hover:bg-gray-100 dark:hover:bg-gray-800
            cursor-pointer
        `}
    >
      {props.url ? (
        <Link href={props.url}>{redenrizarLink()}</Link>
      ) : (
        redenrizarLink()
      )}
    </li>
  );
}
