import {FC} from "react";

interface Props {
    color: string;
    bgColor: string;
    size: string;
    text: string;
    borderRadius: string;
}

const Button: FC<Props> = (props) => {
    return (
        <button
            type="button"
            style={{
                backgroundColor: props.bgColor,
                color: props.color,
                borderRadius: props.borderRadius,
            }}
            className={`text-${props.size} p-3 hover:drop-shadow-xl`}
        >
            {props.text}
        </button>
    );
};

export default Button;
